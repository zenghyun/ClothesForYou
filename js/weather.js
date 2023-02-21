import { mainWeather, descriptionWeather } from './weatherList.mjs';
const API_KEY = "de9afcffc19013aaef1ec97ef50bc2fc";

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
                    // return getIcon(weatherTime, i, j);
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
                    borderWidth:4, // [막대 테두리 굵기 설정],
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

function getWeatherDay(i, concreteDayData, concreteTime) {
    if (i === 0) {
        return `\u00A0\u00A0\u00A0\u00A0 오늘`;
    }
    else if (concreteTime === 0) {
        return concreteDayData.split(' ')[0];
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
 * getWeeklyWeatherData[12] = concreteTime ( data별 시간 )
 * getWeeklyWeatherData[13] = weeklyMaxIcon ( 시간대별 최고 기온 icon ary )
 * getWeeklyWeatherData[14] = weeklyMinIcon ( 시간대별 최저 기온 icon ary)
 */
function getWeeklyWeather(getWeeklyWeatherData) {
    // Week 
    const ONE_WEEK = 7;

    let dailyMaxTemp = [];
    let dailyMinTemp = [];
    console.log("getWeekOfDay", getWeeklyWeatherData[0]);
    let getMaxTempAry = [];
    let getMinTempAry = [];
    let getMaxTempIcon;
    let getMinTempIcon;

       for (let i = 0; i < ONE_WEEK; i++) {
        if (getWeeklyWeatherData[0] === i) {
            
            getWeeklyWeatherData[8][i][getWeeklyWeatherData[10][i]] = getWeeklyWeatherData[3];
            
            getWeeklyWeatherData[9][i][getWeeklyWeatherData[10][i]] = getWeeklyWeatherData[4];
            
            getWeeklyWeatherData[13][i][getWeeklyWeatherData[10][i]] =  [getWeeklyWeatherData[3], iconLoader(getWeeklyWeatherData[5], getWeeklyWeatherData[6], getWeeklyWeatherData[7])[0]];
            
            getMaxTempAry = getWeeklyWeatherData[13][i].reduce( (pre, cur) => {
                return [...pre, ...cur];
            })

            getWeeklyWeatherData[14][i][getWeeklyWeatherData[10][i]] =  [getWeeklyWeatherData[4], iconLoader(getWeeklyWeatherData[5], getWeeklyWeatherData[6], getWeeklyWeatherData[7])[0]];
            
            getMinTempAry = getWeeklyWeatherData[14][i].reduce( (pre, cur) => {
                return [...pre, ...cur];
            })
            
            getWeeklyWeatherData[10][i]++;
            
            dailyMaxTemp[0] = String(Math.max(...getWeeklyWeatherData[8][i]));
            dailyMinTemp[0] = String(Math.min(...getWeeklyWeatherData[9][i]));
            getMaxTempIcon = getMaxTempAry.indexOf(dailyMaxTemp[0])+1;
            getMinTempIcon = getMinTempAry.indexOf(dailyMinTemp[0])+1;

        }
    }
    
    getWeeklyWeatherData[0] === 0 ? getWeeklyWeatherData[0] = "일요일" :
        getWeeklyWeatherData[0] === 1 ? getWeeklyWeatherData[0] = "월요일" :
            getWeeklyWeatherData[0] === 2 ? getWeeklyWeatherData[0] = "화요일" :
                getWeeklyWeatherData[0] === 3 ? getWeeklyWeatherData[0] = "수요일" :
                    getWeeklyWeatherData[0] === 4 ? getWeeklyWeatherData[0] = "목요일" :
                        getWeeklyWeatherData[0] === 5 ? getWeeklyWeatherData[0] = "금요일" :
                            getWeeklyWeatherData[0] = "토요일";

    if (getWeeklyWeatherData[12] === 21 || getWeeklyWeatherData[6] === getWeeklyWeatherData[5].list.length - 1) {
        getWeeklyWeatherData[1].querySelector('.max-weather-main').insertAdjacentHTML('afterbegin', getMaxTempAry[getMaxTempIcon]);

        getWeeklyWeatherData[1].querySelector('.min-weather-main').insertAdjacentHTML('afterbegin',  getMinTempAry[getMinTempIcon]);

        getWeeklyWeatherData[1].querySelector('.max-temp').textContent = `${Math.round (dailyMaxTemp[0]*10)/10}˚`;
        getWeeklyWeatherData[1].querySelector('.min-temp').textContent = `${Math.round(dailyMinTemp[0]*10)/10}˚`;


        getWeeklyWeatherData[1].querySelector('.today').textContent = getWeeklyWeatherData[0];

        getWeeklyWeatherData[1].querySelector('.humidity').insertAdjacentHTML('afterend', `<i class="wi wi-raindrop humidity"> <span class= "pnt">${getWeeklyWeatherData[2]}%</span></i>`);
        
        getWeeklyWeatherData[11].append(getWeeklyWeatherData[1]);
    }
}

function subWeatherBackground(nowHour) {
    const $subWeatherArea = document.querySelector('.sub-weather');

    if (nowHour > 6 && nowHour < 16) {
        $subWeatherArea.style.backgroundImage = "url('../weather/images/weather/06시~16시.gif')";
        $subWeatherArea.style.color = "#333032";
    }
    else if (nowHour >= 16 && nowHour <= 20) {
        $subWeatherArea.style.backgroundImage = "url('../weather/images/weather/16시~20시.gif')";
        $subWeatherArea.style.color = "#cdcbc1";
    } else {
        $subWeatherArea.style.backgroundImage = "url('../weather/images/weather/20시~06시.gif')";
        $subWeatherArea.style.color = "#eeeb99";
    }
}
/**
 * 
 * @param {object} getSubWeatherData 
 *  getSubWeatherData[0] = data ( weather API data )
 *  getSubWeatherData[1] = i ( data 개수 )
 *  getSubWeatherData[2] = concreteTime ( 시간 제외한 날짜 )
 *  getSubWeatherData[3] = $subWeatherLi ( sub weather template )
 *  getSubWeatherData[4] = concreteDayData ( 데이터 별 날짜 )
 *  getSubWeatherData[5] = humidity ( 습도 )
 *  getSubWeatherData[6] = $subWeatherLists ( sub-weather-lists )
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

    getSubWeatherData[6].append( getSubWeatherData[3]);
}

/**
 * 
 * @param {object} getMainWeatherData 
 * getMainWeatherData[0] = $weatherLi ( weather template )
 * getMainWeatherData[1] = data ( weather API data )
 * getMainWeatherData[2] = i ( data 개수 )
 * getMainWeatherData[3] = concreteDayData ( 데이터 별 날짜 )
 * getMainWeatherData[4] = temp ( 온도 별 날짜 )
 * getMainWeatherData[5] = concreteTime ( 시간 제외한 날짜 )
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
    
    for (let i = 0; i < weatherDatas; i++) {
        const $weatherLi = document.importNode($weatherTemplate.content, true);
        const $subWeatherLi = document.importNode($subWeatherTemplate.content, true);
        const $weeklyWeatherLi = document.importNode($weeklyWeatherTemplate.content, true);

        let temp = Math.round(`${data.list[i].main.temp}`);
        tempArr.push(temp);
        let concreteDayData = `${data.list[i].dt_txt}`;
        let concreteTime = parseInt(concreteDayData.split(' ')[1].slice(0, 2));
        let changeDate = new Date(concreteDayData);
        let getWeekOfDay = changeDate.getDay();
        let concreteDate = parseInt(concreteDayData.split(' ')[0].slice(8));
        let maxTemp = `${data.list[i].main.temp_max}`;
        let minTemp = `${data.list[i].main.temp_min}`;
        let humidity = `${data.list[i].main.humidity}`;

        // main-weather 
        if ( i === 0 || i === weatherDatas-1){
            weatherPeriod.push(concreteDayData.split(' ')[0]);
        }
        document.querySelector('.weather-period').textContent = `시간별 예보 (${weatherPeriod[0]} ~ ${weatherPeriod[1]})`;

        const getMainWeatherData = [$weatherLi, data, i, concreteDayData, temp, concreteTime, timeArr, $weatherLists];
        getMainWeather(getMainWeatherData);
        
        // sub-weather 

        const getSubWeatherData = [data, i, concreteTime, $subWeatherLi, concreteDayData, humidity,$subWeatherLists]
        if (nowDate === concreteDate && nowHour >= concreteTime) {
            if (SubWeatherTrue) {
                $subWeatherLists.replaceChildren();
            }
            getSubWeather(getSubWeatherData);
            subWeatherBackground(nowHour);
          
        }

        // weekly weather

        const getWeeklyWeatherData = [getWeekOfDay, $weeklyWeatherLi, humidity, maxTemp, minTemp, data, i, concreteDayData, weeklyMaxTemp, weeklyMinTemp, weekend, $weeklyWeatherLists, concreteTime, weeklyMaxIcon, weeklyMinIcon ];
        getWeeklyWeather(getWeeklyWeatherData);

        
    }
    getChart(tempArr, timeArr);
}



function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log('You live in', lat, lon);

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

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
            getWeather(data);
            console.log(data);
        })
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
// document.querySelector('#get-location').addEventListener('click', () => {
//     const question = confirm('위치 공유에 동의하십니까?');
//     if(question){
//         navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
//         document.querySelector('#get-location').style.display = "none";
//     } else {
//         alert('동의 거부하셨습니다.');
//     }
// })