import { mainWeather, descriptionWeather } from './weatherList.mjs';
import { getClothes } from './clothes.mjs';

const API_KEY = "";

function getDecsriptionWeather(arrayLength, listLength) {
    return `${descriptionWeather[arrayLength].list[listLength + 4]}`;
}

function getIcon(weatherTime, arrayLength, listLength) {
    if (weatherTime <= 5) {
        return `<i class="wi ${descriptionWeather[arrayLength].list[listLength + 3]}"></i>`;
    } else if (weatherTime <= 16) {
        return `<i class="wi ${descriptionWeather[arrayLength].list[listLength + 1]}"></i>`;
    } else {
        return `<i class="wi ${descriptionWeather[arrayLength].list[listLength + 2]}"></i>`;
    }
}

function getData(weatherTime, arrayLength, listLength) {
    return [getIcon(weatherTime, arrayLength, listLength), getDecsriptionWeather(arrayLength, listLength)]
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

/**
 * 
 * @param {*} getClothesAry
 * getClothesAry[0]: dailyMaxTempAry ( 요일별 최고 기온을 담는 배열 )
 * getClothesAry[1]: dailyMinTempAry ( 요일별 최저 기온을 담는 배열 )
 * getClothesAry[2]: ONE_WEEK 일주일 
 * getClothesAry[3]: Math.round (dailyMaxTemp[0]*10)/10 (요일별 최고 기온) 
 * getClothesAry[4]: Math.round (dailyMinTemp[0]*10)/10 (요일별 최저 기온) 
 * getClothesAry[5]: eliminateDuplicateAry (요일) 
 */
function clothesLoader(getClothesAry) {
    let clone = [];
    clone = [...getClothesAry[5]];
    getClothesAry[0].push(getClothesAry[3]);
    getClothesAry[1].push(getClothesAry[4]);

    for (let i = 1; i < getClothesAry[2]; i++) {
        clone[i - 1] === 0 ? clone[i - 1] = "일요일" :
            clone[i - 1] === 1 ? clone[i - 1] = "월요일" :
                clone[i - 1] === 2 ? clone[i - 1] = "화요일" :
                    clone[i - 1] === 3 ? clone[i - 1] = "수요일" :
                        clone[i - 1] === 4 ? clone[i - 1] = "목요일" :
                            clone[i - 1] === 5 ? clone[i - 1] = "금요일" :
                                clone[i - 1] = "토요일";

        document.querySelector(`.clothes-temp-area${i}`).textContent = `${clone[i - 1]} 최고 기온은 ${getClothesAry[0][i - 1]}˚, 최저 기온은 ${getClothesAry[1][i - 1]}˚ 입니다.`;
        document.querySelector(`.clothes-by-temperature${i}`).textContent = "오늘의 코디";
        document.querySelector(`.show-text${i}`).textContent = `※ 오늘의 코디는 최고 기온과 최저 기온의 평균을 기준으로 산출합니다. ( 평균 온도 ${Math.round((getClothesAry[0][i - 1] + getClothesAry[1][i - 1]) / 2)}˚ ) `;

        getClothes(i, getClothesAry[0], getClothesAry[1]);
    }
}

/**
 * 
 * @param {object} getWeeklyWeatherData 
 * getWeeklyWeatherData[0] = getWeekOfDay ( 요일 구하기 위한 숫자 )
 * getWeeklyWeatherData[1] = $weeklyWeatherLi ( weekly weather template )
 * getWeeklyWeatherData[2] = humidity ( 습도 )
 * getWeeklyWeatherData[3] = maxTemp ( 최고 기온 )
 * getWeeklyWeatherData[4] = minTemp ( 최저 기온 )
 * getWeeklyWeatherData[5] = data ( weather API data )
 * getWeeklyWeatherData[6] = i ( data 개수 )
 * getWeeklyWeatherData[7] = concreteDayData  ( 데이터 별 날짜 )
 * getWeeklyWeatherData[8] = weeklyMaxTemp ( 주간별 최고 기온 )
 * getWeeklyWeatherData[9] = weeklyMinTemp ( 주간별 최저 기온 )
 * getWeeklyWeatherData[10] = weekend ( 월, 화, 수, 목, 금, 토, 일 )
 * getWeeklyWeatherData[11] = $weeklyWeatherLists ( #weekly-weather-lists )
 * getWeeklyWeatherData[12] = concreteTime ( utc 기준 12시 = 한국 시간 21시 마지막 출력 )
 * getWeeklyWeatherData[13] = weeklyMaxIcon ( 시간대별 최고 기온 icon ary )
 * getWeeklyWeatherData[14] = weeklyMinIcon ( 시간대별 최저 기온 icon ary)
 * getWeeklyWeatherData[15] = dailyMaxTempAry ( 요일별 최고 기온을 담는 배열 )
 * getWeeklyWeatherData[16] = dailyMinxTempAry ( 요일별 최저 기온을 담는 배열 )
 * getWeeklyWeatherData[17] = getToday ( 요일을 저장하기 위한 배열 )
 */
function getWeeklyWeather(getWeeklyWeatherData) {

    const ONE_WEEK = 7;
    const LAST_CLOCK = 12; // utc 기준 12시는 한국 기준 21시 
    let dailyMaxTemp = [];
    let dailyMinTemp = [];
    let getMaxTempAry = [];
    let getMinTempAry = [];
    let getMaxTempIcon;
    let getMinTempIcon;
    getWeeklyWeatherData[17].push(getWeeklyWeatherData[0]);


    for (let i = 0; i < ONE_WEEK; i++) {
        if (getWeeklyWeatherData[0] === i) {

            getWeeklyWeatherData[8][i][getWeeklyWeatherData[10][i]] = getWeeklyWeatherData[3];

            getWeeklyWeatherData[9][i][getWeeklyWeatherData[10][i]] = getWeeklyWeatherData[4];

            getWeeklyWeatherData[13][i][getWeeklyWeatherData[10][i]] = [getWeeklyWeatherData[3], iconLoader(getWeeklyWeatherData[5], getWeeklyWeatherData[6], getWeeklyWeatherData[7])[0]];

            getMaxTempAry = getWeeklyWeatherData[13][i].reduce((pre, cur) => {
                return [...pre, ...cur];
            })

            getWeeklyWeatherData[14][i][getWeeklyWeatherData[10][i]] = [getWeeklyWeatherData[4], iconLoader(getWeeklyWeatherData[5], getWeeklyWeatherData[6], getWeeklyWeatherData[7])[0]];

            getMinTempAry = getWeeklyWeatherData[14][i].reduce((pre, cur) => {
                return [...pre, ...cur];
            })
            
            getWeeklyWeatherData[10][i]++;

            dailyMaxTemp[0] = Math.max(...getWeeklyWeatherData[8][i]);
            dailyMinTemp[0] = Math.min(...getWeeklyWeatherData[9][i]);
            getMaxTempIcon = getMaxTempAry.indexOf(String(dailyMaxTemp[0])) + 1;
            getMinTempIcon = getMinTempAry.indexOf(String(dailyMinTemp[0])) + 1;

        }
    }


    getWeeklyWeatherData[0] === 0 ? getWeeklyWeatherData[0] = "일요일" :
        getWeeklyWeatherData[0] === 1 ? getWeeklyWeatherData[0] = "월요일" :
            getWeeklyWeatherData[0] === 2 ? getWeeklyWeatherData[0] = "화요일" :
                getWeeklyWeatherData[0] === 3 ? getWeeklyWeatherData[0] = "수요일" :
                    getWeeklyWeatherData[0] === 4 ? getWeeklyWeatherData[0] = "목요일" :
                        getWeeklyWeatherData[0] === 5 ? getWeeklyWeatherData[0] = "금요일" :
                            getWeeklyWeatherData[0] = "토요일";

    if (getWeeklyWeatherData[12] === LAST_CLOCK  || getWeeklyWeatherData[6] === getWeeklyWeatherData[5].list.length-1) {
     
        getWeeklyWeatherData[1].querySelector('.max-weather-main').insertAdjacentHTML('afterbegin', getMaxTempAry[getMaxTempIcon]);

        getWeeklyWeatherData[1].querySelector('.min-weather-main').insertAdjacentHTML('afterbegin', getMinTempAry[getMinTempIcon]);

        getWeeklyWeatherData[1].querySelector('.max-temp').textContent = `${Math.round(dailyMaxTemp[0] * 10) / 10}˚`;
        getWeeklyWeatherData[1].querySelector('.min-temp').textContent = `${Math.round(dailyMinTemp[0] * 10) / 10}˚`;

        getWeeklyWeatherData[1].querySelector('.today').textContent = getWeeklyWeatherData[0];
        getWeeklyWeatherData[1].querySelector('.humidity').insertAdjacentHTML('afterend', `<i class="wi wi-raindrop humidity"> <span class= "pnt">${getWeeklyWeatherData[2]}%</span></i>`);

        getWeeklyWeatherData[11].append(getWeeklyWeatherData[1]);

        let eliminateDuplicateAry = [...new Set(getWeeklyWeatherData[17])];

        const getClothesAry = [getWeeklyWeatherData[15], getWeeklyWeatherData[16], ONE_WEEK, (Math.round(dailyMaxTemp[0] * 10) / 10), (Math.round(dailyMinTemp[0] * 10) / 10), eliminateDuplicateAry];
        clothesLoader(getClothesAry);
    }
}

function subWeatherBackground(nowHour) {
    const $subWeatherArea = document.querySelector('.sub-weather');

    if (nowHour > 6 && nowHour < 17) {
        $subWeatherArea.style.backgroundImage = "url('./images/weather/06시~16시.gif')";
        $subWeatherArea.style.color = "#333032";
    }
    else if (nowHour >= 17 && nowHour <= 20) {
        $subWeatherArea.style.backgroundImage = "url('./images/weather/16시~20시.gif')";
        $subWeatherArea.style.color = "#aeeaff";
    } else {
        $subWeatherArea.style.backgroundImage = "url('./images/weather/20시~06시.gif')";
        $subWeatherArea.style.color = "#eeeb99";
    }
}
/**
 * 
 * @param {object} getSubWeatherData 
 *  getSubWeatherData[0] = data ( weather API data )
 *  getSubWeatherData[1] = i ( data 개수 )
 *  getSubWeatherData[2] = koreaTime ( 한국 시간 )
 *  getSubWeatherData[3] = $subWeatherLi ( sub weather template )
 *  getSubWeatherData[4] = concreteDayData ( 데이터 별 날짜 )
 *  getSubWeatherData[5] = humidity ( 습도 )
 *  getSubWeatherData[6] = $subWeatherLists ( sub-weather-lists )
 *  getSubWeatherData[7] = nowHour ( 현재 시간 )
 */
function getSubWeather(getSubWeatherData) {
    let feelsLikeTemp = Math.round(`${getSubWeatherData[0].list[getSubWeatherData[1]].main.feels_like}` * 10) / 10;
    let deg = `${getSubWeatherData[0].list[getSubWeatherData[1]].wind.deg}`;
    let wind = `${getSubWeatherData[0].list[getSubWeatherData[1]].wind.speed}`;
    let subTemp = Math.round(`${getSubWeatherData[0].list[getSubWeatherData[1]].main.temp}` * 10) / 10;

    getSubWeatherData[2] >= 12 ? getSubWeatherData[2] = `오후 ${getSubWeatherData[2]}시 기준` : getSubWeatherData[2] = `오전 ${getSubWeatherData[2]}시 기준`;

    getSubWeatherData[3].querySelector('.time').textContent = getSubWeatherData[2];

    getSubWeatherData[3].querySelector('.weather-main').insertAdjacentHTML('afterbegin', iconLoader(getSubWeatherData[0], getSubWeatherData[1], getSubWeatherData[4])[0]);

    getSubWeatherData[3].querySelector('.temp').textContent = `${subTemp}˚`;

    getSubWeatherData[3].querySelector('.weather-description').textContent = iconLoader(getSubWeatherData[0], getSubWeatherData[1], getSubWeatherData[4])[1];

    getSubWeatherData[3].querySelector('.feel-temp').textContent = `체감 온도 ${feelsLikeTemp}˚`;

    getSubWeatherData[3].querySelector('.humidity').textContent = `습도 ${getSubWeatherData[5]}%`;

    deg >= 0 && deg < 89 ? deg = "북동풍" :
        deg >= 90 && deg < 179 ? deg = "남동풍" :
            deg >= 180 && deg < 269 ? deg = "남서풍" : deg = "북서풍";

    getSubWeatherData[3].querySelector('.wind').textContent = `${deg} ${wind}m/s`;

    const subWeatherData = [{
        time: getSubWeatherData[2],
        weatherIcon: iconLoader(getSubWeatherData[0], getSubWeatherData[1], getSubWeatherData[4])[0],
        subTemp: subTemp,
        weatherDescription: iconLoader(getSubWeatherData[0], getSubWeatherData[1], getSubWeatherData[4])[1],
        feelTemp: feelsLikeTemp,
        humidity: getSubWeatherData[5],
        deg: deg,
        wind: wind,
        nowHour: getSubWeatherData[7],
    }];
    let mySubWeatherData = JSON.stringify(subWeatherData);
    sessionStorage.setItem('subWeather', mySubWeatherData);
    getSubWeatherData[6].append(getSubWeatherData[3]);
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
 * getMainWeatherData[0] = $weatherLi ( weather template )
 * getMainWeatherData[1] = data ( weather API data )
 * getMainWeatherData[2] = i ( data 개수 )
 * getMainWeatherData[3] = concreteDayData ( 데이터 별 날짜 )
 * getMainWeatherData[4] = temp ( 온도 별 날짜 )
 * getMainWeatherData[5] = koreaTime ( 한국 시간 )
 * getMainWeatherData[6] = timeArr ( 시간을 담을 배열 )
 * getMainWeatherData[7] = $weatherLists ( main-weather-lists )
 */
function getMainWeather(getMainWeatherData) {

    getMainWeatherData[0].querySelector('.weather-main').insertAdjacentHTML('afterbegin', iconLoader(getMainWeatherData[1], getMainWeatherData[2], getMainWeatherData[3])[0]);

    getMainWeatherData[0].querySelector('.temp').textContent = `${getMainWeatherData[4]}˚`;

    getMainWeatherData[0].querySelector('.day').textContent = getWeatherDay(getMainWeatherData[2], getMainWeatherData[3], getMainWeatherData[5]);

    getMainWeatherData[5] >= 12 ? getMainWeatherData[6].push(`${getMainWeatherData[5]}:00 pm`) : getMainWeatherData[6].push(`0${getMainWeatherData[5]}:00 am`);

    getMainWeatherData[7].append(getMainWeatherData[0]);
}

function calcDay(concreteDayData) {
        let date = concreteDayData.split(' ')[0];
        let koreaDate = date.substr(0, date.length - 2);
        let setDate = parseInt(date.substr(-2)) + 1;
        setDate < 10 ? setDate = `0${String(setDate)}` : setDate = String(setDate);

        return [koreaDate, (koreaDate + setDate)];
}

function getWeather(data) {
    const weatherDatas = data.list.length;

    const $weatherLists = document.querySelector('#weather-lists');
    const $subWeatherLists = document.querySelector('#sub-weather-lists');
    const $weeklyWeatherLists = document.querySelector('#weekly-weather-lists');

    const $weatherTemplate = document.querySelector('.weather-template');
    const $subWeatherTemplate = document.querySelector('.sub-weather-template');
    const $weeklyWeatherTemplate = document.querySelector('.weekly-weather-template');

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
     let SubWeatherTrue = true;
    let dailyMaxTempAry = [];
    let dailyMinTempAry = [];
    let getToday = [];

    for (let i = 0; i < weatherDatas; i++) {
        const $weatherLi = document.importNode($weatherTemplate.content, true);
        const $subWeatherLi = document.importNode($subWeatherTemplate.content, true);
        const $weeklyWeatherLi = document.importNode($weeklyWeatherTemplate.content, true);

        let temp = Math.round(`${data.list[i].main.temp}`);
        tempArr.push(temp);
        let concreteDayData = `${data.list[i].dt_txt}`;
        let concreteTime = parseInt(concreteDayData.split(' ')[1].slice(0, 2));

        // utc 시간 한국 표준 시간으로 변환 
        let koreaTime = concreteTime + 9;
        koreaTime === 24 ? koreaTime = 0 :
        koreaTime === 27 ? koreaTime = 3 :
        koreaTime === 30 ? koreaTime = 6 : "";
        
        let changeDate = new Date(concreteDayData);
        let getWeekOfDay = changeDate.getDay();
        let concreteDate = parseInt(concreteDayData.split(' ')[0].slice(8));
        let maxTemp = `${data.list[i].main.temp_max}`;
        let minTemp = `${data.list[i].main.temp_min}`;
        let humidity = `${data.list[i].main.humidity}`;
        
        // main-weather 
        //  concreTime이 15시인 순간, 한국 시간은 다음날 0시 
        if ( i === 0) {
            nowDate < 10 ? nowDate = `0${String(nowDate)}` : nowDate = String(nowDate);
            weatherPeriod.push(nowDate);
        } else if ( i !== 0 && concreteTime === 15 ) {
           let calcData = calcDay(concreteDayData)[1];
            
            weatherPeriod.push(calcData);

             document.querySelector('.weather-period').textContent = `날짜별 예보 (${calcDay(concreteDayData)[0] + weatherPeriod[0]} ~ ${weatherPeriod[weatherPeriod.length-1]})`;
        }

        const getMainWeatherData = [$weatherLi, data, i, concreteDayData, temp, koreaTime, timeArr, $weatherLists];
        getMainWeather(getMainWeatherData);

        // sub-weather 

        const getSubWeatherData = [data, i, koreaTime, $subWeatherLi, concreteDayData, humidity, $subWeatherLists, nowHour]
        // utc 시간 기준 15시 이상이면 가져온 날짜 + 1 = 실제 한국 날짜  
        concreteTime >= 15 ? concreteDate = concreteDate + 1 : concreteDate = concreteDate; 
        if (parseInt(nowDate)  === concreteDate  && koreaTime <= nowHour + 3) {
            if (SubWeatherTrue) {
                $subWeatherLists.replaceChildren();
            }

            getSubWeather(getSubWeatherData);
            subWeatherBackground(nowHour);
        }

        // weekly weather

        const getWeeklyWeatherData = [getWeekOfDay, $weeklyWeatherLi, humidity, maxTemp, minTemp, data, i, concreteDayData, weeklyMaxTemp, weeklyMinTemp, weekend, $weeklyWeatherLists, concreteTime, weeklyMaxIcon, weeklyMinIcon, dailyMaxTempAry, dailyMinTempAry, getToday];
        getWeeklyWeather(getWeeklyWeatherData);


    }
    getChart(tempArr, timeArr);
}

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
        fetch(url)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return response.json().then(errData => {
                        console.log(errData);
                        throw new Error('Something went wrong -server side.');
                    });
                }
            })
            .catch(error => {
                console.log(error);
                throw new Error('Something went wrong.');
            })
            .then((data) => {
                let myData = JSON.stringify(data);
                sessionStorage.setItem('location', myData);
                getWeather(data);
            })

    } catch (error) {
        console.log("Data not found in local storage");
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
            console.log("parsedData:", parsedData);
            getWeather(parsedData);
        }
    } catch (error) {
        alert("위치를 가져올 수 없습니다.");
    }
})();
