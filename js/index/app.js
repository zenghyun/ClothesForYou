import { mainWeather, descriptionWeather } from './weatherList.mjs';
import { getClothes } from './clothes.mjs';
const API_KEY = "";

function getDecsriptionWeather(objectLength, listLength) {
    return `${descriptionWeather[objectLength].list[listLength + 4]}`;
}

function getIcon(weatherTime, objectLength, listLength) {
    // utc 시간 기준 9시간 더한게 현재 한국 시간 
    if (weatherTime >= 21 || weatherTime <= 6) {
        //  utc 기준 21시 ~ 6시 => 한국 기준 아침 6시 ~ 오후 3시 
        return `<i class="wi ${descriptionWeather[objectLength].list[listLength + 1]}"></i>`;
    } else if (weatherTime >= 7 && weatherTime <= 13) {
        //  utc 기준 7시 ~ 13시 => 한국 기준 오후 4시 ~ 밤 10시 
        return `<i class="wi ${descriptionWeather[objectLength].list[listLength + 2]}"></i>`;
    } else if (weatherTime >= 14 && weatherTime <= 20) {
        //  utc 기준 14시 ~ 20시 => 한국 기준 밤 11시 ~ 오전 5시 
        return `<i class="wi ${descriptionWeather[objectLength].list[listLength + 3]}"></i>`;
    }
}

function getData(weatherTime, objectLength, listLength) {
    return [getIcon(weatherTime, objectLength, listLength), getDecsriptionWeather(objectLength, listLength)]
}

function getWeatherList(concreteDayData, weatherLoader, loadedId) {
    const weatherTime = parseInt(concreteDayData.split(' ')[1].slice(0, 2));
    for (let i = 0; i < descriptionWeather.length; i++) {
        if (loadedId === descriptionWeather[i].id) {
            for (let j = 0; j < descriptionWeather[i].list.length; j++) {
                if (weatherLoader === descriptionWeather[i].list[j]) {
                    return getData(weatherTime, i, j);
                }
            }
        }
    }
}

function extractWeatherId(concreteDayData, loadedMainWeather, weatherLoader) {
    for (let i = 0; i < mainWeather.length; i++) {
        if (loadedMainWeather === mainWeather[i].title) {
            const loadedId = mainWeather[i].id;
            return getWeatherList(concreteDayData, weatherLoader, loadedId);
        }
    }
}

function iconLoader(data, i, concreteDayData) {
    const loadedMainWeather = `${data.list[i].weather[0].main}`;
    const weatherLoader = `${data.list[i].weather[0].description}`;
    return extractWeatherId(concreteDayData, loadedMainWeather, weatherLoader);
}

function getChart(tempArr, timeArr) {

    const tempChart = document.getElementById("temp-chart").getContext("2d");
    let gradientStroke = tempChart.createLinearGradient(0, 50, 0, 0);
    gradientStroke.addColorStop(1, '#f11f61');
    gradientStroke.addColorStop(0, '#79a5fe');

    new Chart(tempChart, {
        scaleLineColor: "rgba(0,0,0,0)",
        type: 'line',
        data: {
            labels: timeArr,
            datasets: [
                {
                    data: tempArr,
                    label: ' ',
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
                    pointStyle: 'rect', //포인터 스타일 변경
                }
            ]
        },
        options: {
            responsive: false, // 내 맘대로 크기 조정
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "transparent",
                    },
                    gridLines: {
                        color: 'transparent',
                        lineWidth: 0
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'black',
                        fontSize: 18,
                        fontFamily: 'Jua',
                    },
                    gridLines: {
                        color: "transparent",
                        lineWidth: 0
                    }
                }]
            }
        }
    });
}

// 요일 구해주는 함수
function getDay(day) {
    const NumOfWeekend = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일",];
    return NumOfWeekend[day];
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
    const { dailyMaxTempAry, dailyMinTempAry, ONE_WEEK, dailyMaxTemp, dailyMinTemp, eliminateDuplicateAry } = getClothesAry;

    let clone = [];
    let waitTempDay; // 산출되지 않은 요일
    clone = [...eliminateDuplicateAry];
    dailyMaxTempAry.push(dailyMaxTemp);
    dailyMinTempAry.push(dailyMinTemp);



    for (let i = 1; i < ONE_WEEK; i++) {

        if (dailyMaxTempAry[i - 1] !== undefined) {
            document.querySelector(`.clothes-temp-area${i}`).textContent = `${getDay(clone[i - 1])} 최고 기온은 ${dailyMaxTempAry[i - 1]}˚, 최저 기온은 ${dailyMinTempAry[i - 1]}˚ 입니다.`;
            document.querySelector(`.clothes-by-temperature${i}`).textContent = "오늘의 코디";
            document.querySelector(`.show-text${i}`).textContent = `※ 오늘의 코디는 최고 기온과 최저 기온의 평균을 기준으로 산출합니다. ( 평균 온도 ${Math.round((dailyMaxTempAry[i - 1] + dailyMinTempAry[i - 1]) / 2)}˚ ) `;

            waitTempDay = clone[i - 1];

            getClothes(i, dailyMaxTempAry, dailyMinTempAry);
        } else if (dailyMaxTempAry[i - 1] === undefined) {
            document.querySelector(`.clothes-by-temperature${i}`).textContent = `${getDay(waitTempDay + 1)} 기온을 산출중 입니다.`;
        }
    }
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
 * concreteDayData: 데이터 별 날짜 
 * weeklyMaxTemp: 주간별 최고 기온 
 * weeklyMinTemp: 주간별 최저 기온 
 * weekend: 월, 화, 수, 목, 금, 토, 일 
 * weeklyWeatherLists: weekly-weather-lists 
 * concreteTime: utc 기준 12시 = 한국 시간 21시 마지막 출력 
 *weeklyMaxIcon: 시간대별 최고 기온 icon ary 
 * weeklyMinIcon: 시간대별 최저 기온 icon ary
 * dailyMaxTempAry: 요일별 최고 기온을 담는 배열 
 * dailyMinTempAry: 요일별 최저 기온을 담는 배열 
 * getToday: 요일을 저장하기 위한 배열 
 */
function getWeeklyWeather(getWeeklyWeatherData) {
    const { getWeekOfDay, weeklyWeatherLi, humidity, maxTemp, minTemp, data, i, concreteDayData, weeklyMaxTemp, weeklyMinTemp, weekend, weeklyWeatherLists, concreteTime, weeklyMaxIcon, weeklyMinIcon, dailyMaxTempAry, dailyMinTempAry, getToday } = getWeeklyWeatherData;
    const ONE_WEEK = 7;
    const LAST_CLOCK = 12; // utc 기준 12시는 한국 기준 21시 
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
            weeklyMaxIcon[j][weekend[j]] = [maxTemp, iconLoader(data, i, concreteDayData)[0]];
            
            getMaxTempAry = weeklyMaxIcon[j].reduce((pre, cur) => [...pre, ...cur]);
            
            weeklyMinIcon[j][weekend[j]] = [minTemp, iconLoader(data, i, concreteDayData)[0]];
            
            getMinTempAry = weeklyMinIcon[j].reduce((pre, cur) => [...pre, ...cur]);
            
            weekend[j]++;
            dailyMaxTemp = Math.max(...weeklyMaxTemp[j]);
            dailyMinTemp = Math.min(...weeklyMinTemp[j]);
            getMaxTempIcon = getMaxTempAry.indexOf(String(dailyMaxTemp)) + 1;
            getMinTempIcon = getMinTempAry.indexOf(String(dailyMinTemp)) + 1;
        }
    }
    
    if (concreteTime === LAST_CLOCK || i === data.list.length - 1) {
        weeklyWeatherLi.querySelector('.max-weather-main').insertAdjacentHTML('afterbegin', getMaxTempAry[getMaxTempIcon]);

        weeklyWeatherLi.querySelector('.min-weather-main').insertAdjacentHTML('afterbegin', getMinTempAry[getMinTempIcon]);

        weeklyWeatherLi.querySelector('.max-temp').textContent = `${Math.round(dailyMaxTemp * 10) / 10}˚`;
        weeklyWeatherLi.querySelector('.min-temp').textContent = `${Math.round(dailyMinTemp * 10) / 10}˚`;

        weeklyWeatherLi.querySelector('.today').textContent = getDay(getWeekOfDay);
        weeklyWeatherLi.querySelector('.humidity').insertAdjacentHTML('afterend', `<i class="wi wi-raindrop humidity"> <span class= "pnt">${humidity}%</span></i>`);

        weeklyWeatherLists.append(weeklyWeatherLi);

        let eliminateDuplicateAry = [...new Set(getToday)];

        const getClothesAry = { dailyMaxTempAry, dailyMinTempAry, ONE_WEEK, dailyMaxTemp: (Math.round(dailyMaxTemp * 10) / 10), dailyMinTemp: (Math.round(dailyMinTemp * 10) / 10), eliminateDuplicateAry };
        clothesLoader(getClothesAry);
    }
}

function subWeatherBackground(nowHour) {
    const subWeatherArea = document.querySelector('.sub-weather');

    if (nowHour >= 6 && nowHour <= 15) {
        subWeatherArea.style.backgroundImage = "url('./images/weather/06시~15시.gif')";
        subWeatherArea.style.color = "#333032";
    }
    else if (nowHour >= 16 && nowHour <= 19) {
        subWeatherArea.style.backgroundImage = "url('./images/weather/16시~19시.gif')";
        subWeatherArea.style.color = "#aeeaff";
    } else {
        subWeatherArea.style.backgroundImage = "url('./images/weather/20시~05시.gif')";
        subWeatherArea.style.color = "#eeeb99";
    }

}
/**
 * 
 * @param {object} getSubWeatherData 
 *  data: weather API data 
 *  i: data 개수 
 *  koreaTime: 한국 시간 
 *  subWeatherLi: sub weather template 
 *  concreteDayData: 데이터 별 날짜 
 *  humidity: 습도 
 *  subWeatherLists: sub-weather-lists 
 *  nowHour: 현재 시간 
 */
function getSubWeather(getSubWeatherData) {
    const { data, i, koreaTime, subWeatherLi, concreteDayData, humidity, subWeatherLists, nowHour } = getSubWeatherData;
    let feelsLikeTemp = Math.round(`${data.list[i].main.feels_like}` * 10) / 10;
    let deg = `${data.list[i].wind.deg}`;
    let wind = `${data.list[i].wind.speed}`;
    let subTemp = Math.round(`${data.list[i].main.temp}` * 10) / 10;
    let getKoreaTime = koreaTime;
    getKoreaTime >= 12 ? getKoreaTime = `오후 ${getKoreaTime}시 기준` : getKoreaTime = `오전 ${getKoreaTime}시 기준`;

    subWeatherLi.querySelector('.time').textContent = getKoreaTime;

    subWeatherLi.querySelector('.weather-main').insertAdjacentHTML('afterbegin', iconLoader(data, i, concreteDayData)[0]);

    subWeatherLi.querySelector('.temp').textContent = `${subTemp}˚`;

    subWeatherLi.querySelector('.weather-description').textContent = iconLoader(data, i, concreteDayData)[1];

    subWeatherLi.querySelector('.feel-temp').textContent = `체감 온도 ${feelsLikeTemp}˚`;

    subWeatherLi.querySelector('.humidity').textContent = `습도 ${humidity}%`;

    deg >= 0 && deg < 89 ? deg = "북동풍" :
        deg >= 90 && deg < 179 ? deg = "남동풍" :
            deg >= 180 && deg < 269 ? deg = "남서풍" : deg = "북서풍";

    subWeatherLi.querySelector('.wind').textContent = `${deg} ${wind}m/s`;

    const subWeatherData = {
        time: getKoreaTime,
        weatherIcon: iconLoader(data, i, concreteDayData)[0],
        subTemp,
        weatherDescription: iconLoader(data, i, concreteDayData)[1],
        feelTemp: feelsLikeTemp,
        humidity,
        deg,
        wind,
        nowHour,
    };
    let mySubWeatherData = JSON.stringify(subWeatherData);
    sessionStorage.setItem('subWeather', mySubWeatherData);
    subWeatherLists.append(subWeatherLi);
}

function getWeatherDay(i, concreteDayData, concreteTime) {
    if (i === 0) {
        return `\u00A0\u00A0\u00A0\u00A0\u00A0 오늘`;
    }
    else if (concreteTime === 0) {
        return calcDay(concreteDayData)[1];
    }
}

/**
 * 
 * @param {object} getMainWeatherData 
 * weatherLi: weather template 
 * data: weather API data 
 * i: data 개수 
 * concreteDayData: 데이터 별 날짜 
 * temp: 날짜 별 온도 
 * koreaTime: 한국 시간 
 * weatherLists: main-weather-lists 
 */
function getMainWeather(getMainWeatherData) {
    const { weatherLi, data, i, concreteDayData, temp, koreaTime, weatherLists } = getMainWeatherData;

    weatherLi.querySelector('.weather-main').insertAdjacentHTML('afterbegin', iconLoader(data, i, concreteDayData)[0]);

    weatherLi.querySelector('.temp').textContent = `${temp}˚`;

    weatherLi.querySelector('.day').textContent = getWeatherDay(i, concreteDayData, koreaTime);

    weatherLists.append(weatherLi);
}

// 실제 한국 날짜 구하는 함수 
function calcDay(concreteDayData, includeMonth = null) {
    let date = concreteDayData.split(' ')[0];
    let concreteTime = parseInt(concreteDayData.split(' ')[1].slice(0, 2));
    let koreaDate = date.substr(0, date.length - 4);
    let setMonth = parseInt(date.substr(6, 1));
    let setDate = parseInt(date.substr(-2));
   
    if (concreteTime >= 15) {
        setDate += 1;
    }
    switch (setMonth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          if(setDate > 31) {
            setDate = 1;
            
            setMonth += 1;
          }
          break;
        case 4:
        case 6:
        case 9:
        case 11:
            if(setDate > 30) {
                setDate = 1;
                setMonth += 1;
              }
          break;
        case 2:
            if(setDate > 28) {
                setDate = 1;
                setMonth += 1;
              }
          break;
      }

    setDate < 10 ? setDate = `0${String(setDate)}` : setDate = String(setDate);
   
    if(includeMonth) {
        includeMonth.push(setMonth);
        return [`${koreaDate}${includeMonth[0]}-`, `${koreaDate}${setMonth}-${setDate}`];
    } else {
        return [`${koreaDate}${setMonth}-`, `${koreaDate}${setMonth}-${setDate}`];
    }

}

function getKoreaTime(koreaTime) {
const KOREA_TIME_TYPE = {
    24 : 0,
    27 : 3,
    30 : 6,
    UNDEFINED: koreaTime,
};
return KOREA_TIME_TYPE[koreaTime] ?? KOREA_TIME_TYPE.UNDEFINED;
}

function getWeather(data) {
    const weatherDatas = data.list.length;

    const weatherLists = document.getElementById('weather-lists');
    const subWeatherLists = document.getElementById('sub-weather-lists');
    const weeklyWeatherLists = document.getElementById('weekly-weather-lists');

    const weatherTemplate = document.getElementById('weather-template');
    const subWeatherTemplate = document.getElementById('sub-weather-template');
    const weeklyWeatherTemplate = document.getElementById('weekly-weather-template');

    let tempArr = [];
    let timeArr = [];

    //  weeklyMaxTemp, weeklyMinTemp, weekend, weeklyMaxIcon, weeklyMinIcon 차례대로 월,화,수,목,금,토,일
    let weeklyMaxTemp = [[], [], [], [], [], [], []];
    let weeklyMinTemp = [[], [], [], [], [], [], []];
    let weekend = [0, 0, 0, 0, 0, 0, 0];
    let weeklyMaxIcon = [[], [], [], [], [], [], []];
    let weeklyMinIcon = [[], [], [], [], [], [], []];
    let weatherPeriod = [];

    let date = new Date();
    let nowDate = date.getDate();
    let nowHour = date.getHours();
    let SubWeatherTrue = false;
    let dailyMaxTempAry = [];
    let dailyMinTempAry = [];
    let getToday = [];
    let includeMonth = []; 

    for (let i = 0; i < weatherDatas; i++) {
        const weatherLi = document.importNode(weatherTemplate.content, true);
        const subWeatherLi = document.importNode(subWeatherTemplate.content, true);
        const weeklyWeatherLi = document.importNode(weeklyWeatherTemplate.content, true);

        let temp = Math.round(`${data.list[i].main.temp}`);
        tempArr.push(temp);
        let concreteDayData = `${data.list[i].dt_txt}`;
        let concreteTime = parseInt(concreteDayData.split(' ')[1].slice(0, 2));

        // utc 시간 한국 표준 시간으로 변환
        const koreaTime = getKoreaTime(concreteTime+9);
        koreaTime >= 12 ? timeArr.push(`${koreaTime}:00 pm`) : timeArr.push(`0${koreaTime}:00 am`);

        let changeDate = new Date(calcDay(concreteDayData)[1]);
        let getWeekOfDay = changeDate.getDay();
        let maxTemp = `${data.list[i].main.temp_max}`;
        let minTemp = `${data.list[i].main.temp_min}`;
        let humidity = `${data.list[i].main.humidity}`;

        // main-weather 
        if (i === 0) {
            nowDate < 10 ? nowDate = `0${String(nowDate)}` : nowDate = String(nowDate);
            weatherPeriod.push(nowDate);
        }
        //  concreTime이 15시인 순간, 한국 시간은 다음날 0시 
        else if (i !== 0 && concreteTime === 15) {
            let calcData = calcDay(concreteDayData)[1];
            weatherPeriod.push(calcData);

            document.querySelector('.weather-period').textContent = `날짜별 예보 (${calcDay(concreteDayData, includeMonth)[0] + weatherPeriod[0]} ~ ${weatherPeriod[weatherPeriod.length - 1]})`;
        }

        const getMainWeatherData = { weatherLi, data, i, concreteDayData, temp, koreaTime, weatherLists };
        getMainWeather(getMainWeatherData);

        // sub-weather 
        const getSubWeatherData = { data, i, koreaTime, subWeatherLi, concreteDayData, humidity, subWeatherLists, nowHour };

        if (SubWeatherTrue === false) {
            SubWeatherTrue = true;

            getSubWeather(getSubWeatherData);
            subWeatherBackground(nowHour);
        }

        // weekly weather
        const getWeeklyWeatherData = { getWeekOfDay, weeklyWeatherLi, humidity, maxTemp, minTemp, data, i, concreteDayData, weeklyMaxTemp, weeklyMinTemp, weekend, weeklyWeatherLists, concreteTime, weeklyMaxIcon, weeklyMinIcon, dailyMaxTempAry, dailyMinTempAry, getToday };

        getWeeklyWeather(getWeeklyWeatherData);

    }
    getChart(tempArr, timeArr);
}

async function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            let myData = JSON.stringify(data);
            sessionStorage.setItem('location', myData);
            getWeather(data);
        } else {
            const errData = await response.json();
            console.log(errData);
            throw new Error('Something went wrong - server side.');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Something went wrong.');
    }
}


function onGeoError() {
    const NOTICE = `
위치를 가져오지 못했습니다. 
    
위치를 가져오는데 동의하였을 때, 가져오지 못할 경우 위치 서비스 활성화를 해야합니다.
    
Android: 설정 -> 위치 -> 사용 중 활성화 및 앱 내 위치정보 설정 권한 활성화

iOS: 설정 -> Safari -> 위치 -> 위치 활성화 
    
mac OS: Safari -> 기본 설정 -> 웹 사이트 -> 목록 -> 위치 -> 허용
    `
    alert(NOTICE);
}

(function getAPIData() {
    try {
        if (!sessionStorage.hasOwnProperty("location")) {
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
