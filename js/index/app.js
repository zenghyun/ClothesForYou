import { mainWeather, descriptionWeather } from "./weatherList.mjs";
import { getClothes } from "./clothes.mjs";
import { createModal } from "./modal.mjs";

const API_KEY = "";

const modal = createModal(
  "loading-modal-content",
  "Loading location = please wait"
);

(function getAPIData() {
  try {
    if (!sessionStorage.hasOwnProperty("location")) {
      modal.show();
      navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    } else {
      const loadData = sessionStorage.getItem("location");
      const parsedData = JSON.parse(loadData);
      getWeather(parsedData);
    }
  } catch (error) {
    alert("위치를 가져올 수 없습니다.");
  }
})();

async function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (response.status >= 200 && response.status < 300) {
      modal.hide();
      const data = await response.json();
      let myData = JSON.stringify(data);
      sessionStorage.setItem("location", myData);
      getWeather(data);
    } else {
      modal.hide();
      const errData = await response.json();
      throw new Error(`Something went wrong - server side. errData: ${errData}`);
    }
  } catch (error) {
    modal.hide();
    throw new Error("Something went wrong.");
  }
}

function onGeoError() {
  modal.hide();
  const NOTICE = `
위치를 가져오지 못했습니다. 
    
위치를 가져오는데 동의하였을 때, 가져오지 못할 경우 위치 서비스 활성화를 해야합니다.
    
Android: 설정 -> 위치 -> 사용 중 활성화 및 앱 내 위치정보 설정 권한 활성화

iOS: 설정 -> Safari -> 위치 -> 위치 활성화 
    
mac OS: Safari -> 기본 설정 -> 웹 사이트 -> 목록 -> 위치 -> 허용
    `;
  alert(NOTICE);
}

function getWeather(data) {
  const weatherDatas = data.list.length;

  const weatherLists = document.getElementById("weather-lists");
  const subWeatherLists = document.getElementById("sub-weather-lists");
  const weeklyWeatherLists = document.getElementById("weekly-weather-lists");

  const weatherTemplate = document.getElementById("weather-template");
  const subWeatherTemplate = document.getElementById("sub-weather-template");
  const weeklyWeatherTemplate = document.getElementById(
    "weekly-weather-template"
  );

  let tempArr = [];
  let timeArr = [];

  let weeklyMaxTemp = [[], [], [], [], [], [], []];
  let weeklyMinTemp = [[], [], [], [], [], [], []];
  let weekend = [0, 0, 0, 0, 0, 0, 0];
  let weeklyMaxIcon = [[], [], [], [], [], [], []];
  let weeklyMinIcon = [[], [], [], [], [], [], []];
  let weatherPeriod = [];

  let SubWeatherTrue = false;
  let dailyMaxTempAry = [];
  let dailyMinTempAry = [];
  let getToday = [];

  for (let i = 0; i < weatherDatas; i++) {
    const weatherLi = document.importNode(weatherTemplate.content, true);
    const subWeatherLi = document.importNode(subWeatherTemplate.content, true);
    const weeklyWeatherLi = document.importNode(
      weeklyWeatherTemplate.content,
      true
    );

    let temp = Math.round(`${data.list[i].main.temp}`);
    tempArr.push(temp);
    let concreteDayData = `${data.list[i].dt_txt}`;

    // utc 시간 한국 표준 시간으로 변환
    const kr_ms = new Date(concreteDayData).getTime();
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(kr_ms + KR_TIME_DIFF);

    const kr_year = kr_curr.getFullYear();
    const kr_month = setTwoDigit(kr_curr.getMonth() + 1);
    const kr_day = setTwoDigit(kr_curr.getDate());

    const kr_hours = setTwoDigit(kr_curr.getHours());
    const kr_minutes = setTwoDigit(kr_curr.getMinutes());
    const kr_seconds = setTwoDigit(kr_curr.getSeconds());
    
    const kr_formattedDateTime = kr_year + '-' + kr_month + '-' + kr_day + ' ' + kr_hours + ':' + kr_minutes + ':' + kr_seconds;

    let concreteTime = calcDay(kr_formattedDateTime)[2];

    kr_hours >= 12
      ? timeArr.push(`${kr_hours}:00 pm`)
      : timeArr.push(`${kr_hours}:00 am`);

    let getWeekOfDay = kr_curr.getDay();
    let maxTemp = `${data.list[i].main.temp_max}`;
    let minTemp = `${data.list[i].main.temp_min}`;
    let humidity = `${data.list[i].main.humidity}`;

     if (i === 0 || kr_hours === "00") {
      let calcData = calcDay(kr_formattedDateTime)[0];
      weatherPeriod.push(calcData);

      document.querySelector(".weather-period").textContent = `날짜별 예보 (${
       weatherPeriod[0]
      } ~ ${weatherPeriod[weatherPeriod.length - 1]})`;
    }
    const getMainWeatherData = {
      weatherLi,
      data,
      i,
      kr_formattedDateTime,
      kr_hours,
      temp,
      weatherLists,
    };
    getMainWeather(getMainWeatherData);

    // sub-weather
    const getSubWeatherData = {
      data,
      i,
      subWeatherLi,
      humidity,
      subWeatherLists,
      kr_formattedDateTime,
      kr_hours,
    };

    if (SubWeatherTrue === false) {
      SubWeatherTrue = true;

      getSubWeather(getSubWeatherData);
      subWeatherBackground(kr_hours);
    }

    // weekly weather
    const getWeeklyWeatherData = {
      getWeekOfDay,
      weeklyWeatherLi,
      humidity,
      maxTemp,
      minTemp,
      data,
      i,
      kr_formattedDateTime,
      weeklyMaxTemp,
      weeklyMinTemp,
      weekend,
      weeklyWeatherLists,
      concreteTime,
      weeklyMaxIcon,
      weeklyMinIcon,
      dailyMaxTempAry,
      dailyMinTempAry,
      getToday,
    };

    getWeeklyWeather(getWeeklyWeatherData);
  }
  getChart(tempArr, timeArr);
}

function setTwoDigit(date) {
  let returnDate;
  date < 10 ? (returnDate = `0${String(date)}`) : (returnDate = String(date));
  return returnDate;
}

/**
 * 
 * @param {*} kr_formattedDateTime 
 * kr_formattedDate : 실제 한국 날짜 ex) 2023-01-01
 * kr_formattedTime : 실제 한국 시간 ex) 06:00:00
 * kr_numberTypeHours : 시간 ex) 6
 */
function calcDay(kr_formattedDateTime) {
  const kr_formattedDate = kr_formattedDateTime.split(' ')[0];
  const kr_formattedTime = kr_formattedDateTime.split(' ')[1];
  const kr_numberTypeHours = Number(kr_formattedTime.split(":")[0]);

  return [kr_formattedDate, kr_formattedTime, kr_numberTypeHours];
}

/**
 *
 * @param {object} getMainWeatherData
 * weatherLi: weather template
 * data: weather API data
 * i: data 개수
 * kr_formattedDateTime: 한국 날짜
 * kr_hours : 한국 날짜 시간
 * temp: 날짜 별 온도
 * weatherLists: main-weather-lists
 */
function getMainWeather(getMainWeatherData) {
  const { weatherLi, data, i, kr_formattedDateTime, kr_hours, temp, weatherLists } =
    getMainWeatherData;

  weatherLi
    .querySelector(".weather-main")
    .insertAdjacentHTML("afterbegin", iconLoader(data, i, kr_formattedDateTime)[0]);

  weatherLi.querySelector(".temp").textContent = `${temp}˚`;

  weatherLi.querySelector(".day").textContent = getWeatherDay(
    i,
    kr_formattedDateTime,
    kr_hours
  );

  weatherLists.append(weatherLi);
}

function getWeatherDay(i, kr_formattedDateTime, kr_hours) {
  if (i === 0) {
    return `\u00A0\u00A0\u00A0\u00A0\u00A0 오늘`;
  }

  if (kr_hours === "00") {
    return calcDay(kr_formattedDateTime)[0];
  }
}

function subWeatherBackground(kr_hours) {
  const kr_numberTypeHours = Number(kr_hours);
  const subWeatherArea = document.querySelector(".sub-weather");

  if (kr_numberTypeHours >= 6 && kr_numberTypeHours <= 15) {
    subWeatherArea.style.backgroundImage =
      "url('./images/weather/06시~15시.gif')";
    subWeatherArea.style.color = "#333032";
  } else if (kr_numberTypeHours >= 16 && kr_numberTypeHours <= 19) {
    subWeatherArea.style.backgroundImage =
      "url('./images/weather/16시~19시.gif')";
    subWeatherArea.style.color = "#aeeaff";
  } else {
    subWeatherArea.style.backgroundImage =
      "url('./images/weather/20시~05시.gif')";
    subWeatherArea.style.color = "#eeeb99";
  }
}

/**
 *
 * @param {object} getSubWeatherData
 *  data: weather API data
 *  i: data 개수
 *  subWeatherLi: sub weather template
 *  humidity: 습도
 *  subWeatherLists: sub-weather-lists
 *  kr_formattedDateTime : 한국 날짜
 *  kr_hours: 한국 날짜 시간
 */
function getSubWeather(getSubWeatherData) {
  const {
    data,
    i,
    subWeatherLi,
    humidity,
    subWeatherLists,
    kr_formattedDateTime,
    kr_hours,
  } = getSubWeatherData;

  let feelsLikeTemp = Math.round(`${data.list[i].main.feels_like}` * 10) / 10;
  let deg = `${data.list[i].wind.deg}`;
  let wind = `${data.list[i].wind.speed}`;
  let subTemp = Math.round(`${data.list[i].main.temp}` * 10) / 10;
  let getKoreaTime = kr_hours;
  
  getKoreaTime >= 12
    ? (getKoreaTime = `오후 ${getKoreaTime}시 기준`)
    : (getKoreaTime = `오전 ${getKoreaTime}시 기준`);

  subWeatherLi.querySelector(".time").textContent = getKoreaTime;

  subWeatherLi
    .querySelector(".weather-main")
    .insertAdjacentHTML("afterbegin", iconLoader(data, i, kr_formattedDateTime)[0]);

  subWeatherLi.querySelector(".temp").textContent = `${subTemp}˚`;

  subWeatherLi.querySelector(".weather-description").textContent = iconLoader(
    data,
    i,
    kr_formattedDateTime
  )[1];

  subWeatherLi.querySelector(
    ".feel-temp"
  ).textContent = `체감 온도 ${feelsLikeTemp}˚`;

  subWeatherLi.querySelector(".humidity").textContent = `습도 ${humidity}%`;

  let direction;

  switch (true) {
    case deg >= 0 && deg < 89:
      direction = "북동풍";
      break;
    case deg >= 90 && deg < 179:
      direction = "남동풍";
      break;
    case deg >= 180 && deg < 269:
      direction = "남서풍";
      break;
    default:
      direction = "북서풍";
  }

  subWeatherLi.querySelector(".wind").textContent = `${direction} ${wind}m/s`;

  const subWeatherData = {
    time: getKoreaTime,
    weatherIcon: iconLoader(data, i, kr_formattedDateTime)[0],
    subTemp,
    weatherDescription: iconLoader(data, i, kr_formattedDateTime)[1],
    feelTemp: feelsLikeTemp,
    humidity,
    direction,
    wind,
    kr_hours,
  };
  let mySubWeatherData = JSON.stringify(subWeatherData);
  sessionStorage.setItem("subWeather", mySubWeatherData);
  subWeatherLists.append(subWeatherLi);
}

function iconLoader(data, i, kr_formattedDateTime) {
  const loadedMainWeather = `${data.list[i].weather[0].main}`;
  const weatherLoader = `${data.list[i].weather[0].description}`;
  return extractWeatherId(kr_formattedDateTime, loadedMainWeather, weatherLoader);
}
function extractWeatherId(kr_formattedDateTime, loadedMainWeather, weatherLoader) {

  for (let i = 0; i < mainWeather.length; i++) {
    if (loadedMainWeather === mainWeather[i].title) {
      const loadedId = mainWeather[i].id;
      return getWeatherList(kr_formattedDateTime, weatherLoader, loadedId);
    }
  }
}

function getWeatherList(kr_formattedDateTime, weatherLoader, loadedId) {
  for (let i = 0; i < descriptionWeather.length; i++) {
    if (loadedId === descriptionWeather[i].id) {
      const list = descriptionWeather[i].list;
      const j = list.indexOf(weatherLoader);
      if (j !== -1) {
        return getData(kr_formattedDateTime, i, j);
      }
    }
  }
}

function getData(kr_formattedDateTime, objectLength, listLength) {
  return [
    getIcon(kr_formattedDateTime, objectLength, listLength),
    getDecsriptionWeather(objectLength, listLength),
  ];
}

function getIcon(kr_formattedDateTime, objectLength, listLength) {
  const kr_numberTypeHours = calcDay(kr_formattedDateTime)[2];
  
  switch (true) {
    // 한국 기준 아침 6시 ~ 오후 3시
    case kr_numberTypeHours >= 6 && kr_numberTypeHours <= 15:
      return `<i class="wi ${
        descriptionWeather[objectLength].list[listLength + 1]
      }"></i>`;
    // 한국 기준 오후 4시 ~ 밤 10시
    case kr_numberTypeHours >= 16 && kr_numberTypeHours <= 22:
      return `<i class="wi ${
        descriptionWeather[objectLength].list[listLength + 2]
      }"></i>`;
    // 한국 기준 밤 11시 ~ 오전 5시
    case kr_numberTypeHours >= 23 || kr_numberTypeHours <= 5:
      return `<i class="wi ${
        descriptionWeather[objectLength].list[listLength + 3]
      }"></i>`;
    default:
      return;
  }
}

function getDecsriptionWeather(objectLength, listLength) {
  return `${descriptionWeather[objectLength].list[listLength + 4]}`;
}

/**
 *
 * @param {object} getWeeklyWeatherData
 * getWeekOfDay: 요일 구하기 위한 숫자
 * weeklyWeatherLi: weekly weather template
 * humidity: 습도
 * maxTemp: 최고 기온
 * minTemp: 최저 기온
 * data: weather API data
 * i: data 개수
 * kr_formattedDateTime: 데이터 별 날짜
 * weeklyMaxTemp: 주간별 최고 기온
 * weeklyMinTemp: 주간별 최저 기온
 * weekend: 월, 화, 수, 목, 금, 토, 일
 * weeklyWeatherLists: weekly-weather-lists
 * concreteTime: utc 기준 12시 = 한국 시간 21시 마지막 출력
 * weeklyMaxIcon: 시간대별 최고 기온 icon ary
 * weeklyMinIcon: 시간대별 최저 기온 icon ary
 * dailyMaxTempAry: 요일별 최고 기온을 담는 배열
 * dailyMinTempAry: 요일별 최저 기온을 담는 배열
 * getToday: 요일을 저장하기 위한 배열
 */
function getWeeklyWeather(getWeeklyWeatherData) {
  const {
    getWeekOfDay,
    weeklyWeatherLi,
    humidity,
    maxTemp,
    minTemp,
    data,
    i,
    kr_formattedDateTime,
    weeklyMaxTemp,
    weeklyMinTemp,
    weekend,
    weeklyWeatherLists,
    concreteTime,
    weeklyMaxIcon,
    weeklyMinIcon,
    dailyMaxTempAry,
    dailyMinTempAry,
    getToday,
  } = getWeeklyWeatherData;
  const ONE_WEEK = 7;
  const LAST_CLOCK = 21; // utc 기준 12시는 한국 기준 21시
  let dailyMaxTemp = [];
  let dailyMinTemp = [];
  let getMaxTempAry = [];
  let getMinTempAry = [];
  let getMaxTempIcon;
  let getMinTempIcon;

  getToday.push(getWeekOfDay);

  for (let j = 0; j < ONE_WEEK; j++) {
    if (getWeekOfDay === j) {
      weeklyMaxTemp[j][weekend[j]] = maxTemp;
      weeklyMinTemp[j][weekend[j]] = minTemp;
      weeklyMaxIcon[j][weekend[j]] = [
        maxTemp,
        iconLoader(data, i, kr_formattedDateTime)[0],
      ];

      getMaxTempAry = weeklyMaxIcon[j].reduce((pre, cur) => [...pre, ...cur]);

      weeklyMinIcon[j][weekend[j]] = [
        minTemp,
        iconLoader(data, i, kr_formattedDateTime)[0],
      ];

      getMinTempAry = weeklyMinIcon[j].reduce((pre, cur) => [...pre, ...cur]);

      weekend[j]++;
      dailyMaxTemp = Math.max(...weeklyMaxTemp[j]);
      dailyMinTemp = Math.min(...weeklyMinTemp[j]);
      getMaxTempIcon = getMaxTempAry.indexOf(String(dailyMaxTemp)) + 1;
      getMinTempIcon = getMinTempAry.indexOf(String(dailyMinTemp)) + 1;
    }
  }

  if (concreteTime === LAST_CLOCK || i === data.list.length - 1) {
    weeklyWeatherLi
      .querySelector(".max-weather-main")
      .insertAdjacentHTML("afterbegin", getMaxTempAry[getMaxTempIcon]);

    weeklyWeatherLi
      .querySelector(".min-weather-main")
      .insertAdjacentHTML("afterbegin", getMinTempAry[getMinTempIcon]);

    weeklyWeatherLi.querySelector(".max-temp").textContent = `${
      Math.round(dailyMaxTemp * 10) / 10
    }˚`;
    weeklyWeatherLi.querySelector(".min-temp").textContent = `${
      Math.round(dailyMinTemp * 10) / 10
    }˚`;

    weeklyWeatherLi.querySelector(".today").textContent = getDay(getWeekOfDay);
    weeklyWeatherLi
      .querySelector(".humidity")
      .insertAdjacentHTML(
        "afterend",
        `<i class="wi wi-raindrop humidity"> <span class= "pnt">${humidity}%</span></i>`
      );

    weeklyWeatherLists.append(weeklyWeatherLi);

    let eliminateDuplicateAry = [...new Set(getToday)];

    const getClothesAry = {
      dailyMaxTempAry,
      dailyMinTempAry,
      ONE_WEEK,
      dailyMaxTemp: Math.round(dailyMaxTemp * 10) / 10,
      dailyMinTemp: Math.round(dailyMinTemp * 10) / 10,
      eliminateDuplicateAry,
    };
    clothesLoader(getClothesAry);
  }
}

/**
 *
 * @param {*} getClothesAry
 * dailyMaxTempAry: 요일별 최고 기온을 담는 배열
 * dailyMinTempAry: 요일별 최저 기온을 담는 배열
 * ONE_WEEK: 일주일
 * dailyMaxTemp: 요일별 최고 기온
 * dailyMinTemp: 요일별 최저 기온
 * eliminateDuplicateAry: 요일이 담긴 배열
 */
function clothesLoader(getClothesAry) {
  const {
    dailyMaxTempAry,
    dailyMinTempAry,
    ONE_WEEK,
    dailyMaxTemp,
    dailyMinTemp,
    eliminateDuplicateAry,
  } = getClothesAry;

  let clone = [];
  let waitTempDay; // 산출되지 않은 요일
  clone = [...eliminateDuplicateAry];
  dailyMaxTempAry.push(dailyMaxTemp);
  dailyMinTempAry.push(dailyMinTemp);

  for (let i = 1; i < ONE_WEEK; i++) {
    if (dailyMaxTempAry[i - 1] !== undefined) {
      document.querySelector(`.clothes-temp-area${i}`).textContent = `${getDay(
        clone[i - 1]
      )} 최고 기온은 ${dailyMaxTempAry[i - 1]}˚, 최저 기온은 ${
        dailyMinTempAry[i - 1]
      }˚ 입니다.`;
      document.querySelector(`.clothes-by-temperature${i}`).textContent =
        "오늘의 코디";
      document.querySelector(
        `.show-text${i}`
      ).textContent = `※ 오늘의 코디는 최고 기온과 최저 기온의 평균을 기준으로 산출합니다. ( 평균 온도 ${Math.round(
        (dailyMaxTempAry[i - 1] + dailyMinTempAry[i - 1]) / 2
      )}˚ ) `;

      waitTempDay = clone[i - 1];

      getClothes(i, dailyMaxTempAry, dailyMinTempAry);
    } else if (dailyMaxTempAry[i - 1] === undefined) {
      document.querySelector(
        `.clothes-by-temperature${i}`
      ).textContent = `${getDay(waitTempDay + 1)} 기온을 산출중 입니다.`;
    }
  }
}

// 요일 구해주는 함수
function getDay(day) {
  const NumOfWeekend = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  return NumOfWeekend[day];
}

function getChart(tempArr, timeArr) {
  const tempChart = document.getElementById("temp-chart").getContext("2d");
  let gradientStroke = tempChart.createLinearGradient(0, 50, 0, 0);
  gradientStroke.addColorStop(1, "#f11f61");
  gradientStroke.addColorStop(0, "#79a5fe");

  new Chart(tempChart, {
    scaleLineColor: "rgba(0,0,0,0)",
    type: "line",
    data: {
      labels: timeArr,
      datasets: [
        {
          data: tempArr,
          label: " ",
          backgroundColor: "transparent",
          fill: false,
          lineTension: 0,
          borderWidth: 4, // [막대 테두리 굵기 설정],
          borderColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          pointBorderWidth: 4,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          pointStyle: "rect", //포인터 스타일 변경
        },
      ],
    },
    options: {
      responsive: false, // 내 맘대로 크기 조정
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "transparent",
            },
            gridLines: {
              color: "transparent",
              lineWidth: 0,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "black",
              fontSize: 18,
              fontFamily: "Jua",
            },
            gridLines: {
              color: "transparent",
              lineWidth: 0,
            },
          },
        ],
      },
    },
  });
}









