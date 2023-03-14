# 🌈 Clothes For You
<br>

 <p align="center"><img src="https://user-images.githubusercontent.com/114131063/224213723-a74ee0a5-0ce3-4233-808d-5592fb6b3cc1.png" width="500px" height="400px"></p> 
<br>
<br>

## 배포 주소 
- <a
            href="https://clothesforyouu.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            >ClothesForYou</a>
<br>
<br>

## 💻 프로젝트 소개

**Clothes for You**는 OpenWeatherMap API를 이용하여 기온에 따른 옷차림을 추천해 주는 사이트입니다. 이 프로젝트는 출근할 때, 친구를 만날 때, 혹은 잠깐 외출할 때 어떻게 옷을 입고 나가야 할지에 대한 고민을 덜어주고 싶은 생각에서 시작되었습니다. 
<br>
<br>

## 😀 개발 인원

<br>

| <p style="font-size:20px">이정현</p> |
| :------------: |
|   <p align="center"><img src="https://user-images.githubusercontent.com/114131063/224213911-72bc1119-ba49-4d3f-8249-d7031c8fd0d9.jpg" width="250px" height="250px"></p>   |   
|  <p style="font-size:18px"> [@zenghyun](https://github.com/zenghyun)  </p>   |  

<br>
<br>

## 🕰 개발 기간

### - 23.02.13 ~ 23.03.08
 
  <br>
  <br>


## ⚙ 개발 환경

- `HTML`

- `CSS`

- `SASS`

- `JAVASCRIPT`

- **IDE** : Visual Studio Code
- **library** : Chart.js

<br>
<br>

## 📃 페이지 소개
<br>

### 메인 페이지
메인 페이지에서는 위치에 따른 기온과 옷차림, 주간 날씨, [오늘 비와?](https://www.youtube.com/@user-vb8eg8qv1p)  YouTube 채널의 최근 일기 예보와 기온에 따른 옷차림 선정 Tip을 알려줍니다. 

<br>

### 서브 페이지
서브 페이지에서는 과거에 내가 입었던 옷차림을 업로드할 수 있는 다이어리와 **굳이 입어보지 않아도 옷에 대한 color match를 할 수 있는 기능이 있으면 좋겠다.** 라는 생각에 간단한 color match를 통해 나만의 코디를 완성해 볼 수 있게 만들었습니다. 

다이어리와 color match를 나란히 배치함으로써 다이어리에 올린 사진에서 입은 옷의 색을 `input` 태그의 `type="color"`를 통해 가져올 수 있게 하여 사용자가 실제로 갖고 있는 옷의 색을 반영하여 코디할 수 있는 장점이 있습니다. 

<br>
<br>

## 📷 페이지 사진
<br>

|메인 페이지 - 날짜별 예보|메인 페이지 - 오늘의 코디|메인 페이지 - 상세 날짜 |
|------|---|---|
|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224220312-968e2ac2-b45b-4b04-b04a-e7c71c6a548a.png" width="600px" height="300px"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224213723-a74ee0a5-0ce3-4233-808d-5592fb6b3cc1.png" width="500px" height="300px"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224220336-0810835a-44bb-4087-ae34-afa5cfeafe13.png" width="350px" height="300px"></p>|
<br>

메인 페이지 - 주간 날씨|메인 페이지 - 날씨 예보|메인 페이지 - Choice Tip|
|---|---|---|
|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224220354-2fd281ac-c989-4850-ae0c-43603b654a57.png" width="300px" height="300px"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224220369-b86b7f9c-190e-4913-9354-5db9b556a188.png" width="300px" height="300px"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224220384-1c56a14a-42eb-41e5-9eac-86efebd4b732.png" width="300px" height="300px"></p>|
<br>

|서브 페이지 - Clothes Diary|서브 페이지 - Color Match|
|------|---|
|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224220394-842c5456-fa10-410c-a183-7a8703dcbfa9.png" width="250px" height="250px"></p>|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224220401-f779cbaa-9e5e-4e5e-8d33-476a9de84d16.png" width="250px" height="250px"></p>|


<br>
<br>

## 시작 가이드 
- OpenWeatherMap API를 사용하기 위한 API KEY가 필요합니다.  [OpenWeatherMap API](https://openweathermap.org/price) <br>
  ## **weather.js** <br>

  ```javascript
    const API_KEY = ""; // 발급받은 API KEY를 넣어주세요.
  ```
  <br>
- YOUTUBE API를 사용하기 위한 API KEY가 필요합니다. [YouTube API](https://developers.google.com/youtube/v3/getting-started?hl=ko)
  ## **getYoutube.js** <br>
  ```javascript
  const YOUTUBE_API = ""; // 발급받은 API KEY를 넣어주세요.
  const YOUTUBE_CHANNEL = "UCs1omgoHHPENxs4b-fwMpPQ"; // "오늘 비와?" 채널의 고유 키입니다. 
  ```
<br>


## 저작권 
- [@ann_maulina](https://www.instagram.com/ann_maulina/?igshid=NTdlMDg3MTY%3D) 

<br>
  

|오전 6시 ~ 오후 3시|오후 4시 ~ 오후 10시|오후 11시 ~ 아침 5시|
|------|---|---|
|<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224217871-af572b11-81b0-4b2a-bd57-091b975124de.gif" width="300px" height="300px"></p> |<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224217877-86bcc4f5-7fae-4f51-a103-debe73297d53.gif" width="300px" height="300px"></p> |<p align="center"><img src="https://user-images.githubusercontent.com/114131063/224217881-ebc8b420-d818-4d3e-8e41-0a4aac83ea97.gif" width="300px" height="300px"></p> |

<br>

본 이미지의 저작권은 [@ann_maulina](https://www.instagram.com/ann_maulina/?igshid=NTdlMDg3MTY%3D)님에게 있습니다.

<br>

<img src="https://user-images.githubusercontent.com/114131063/224218043-e26bda23-6860-4b15-a9c7-2a9bf2fb8056.png" width="650px" height="550px">

<br>

- [weather-icon](https://erikflowers.github.io/weather-icons/) ( 날씨 아이콘 저작권 )

<br>

- [flaticon](https://www.flaticon.com/kr/)  ( 의류 png 저작권 )

<br>
<br>

 ## 📌 주요 기능

- [OpenWeatherMap API에서 data를 불러오는 기능](#데이터-불러오기)

- [3시간 간격으로 5일간의 기온과 날씨를 알려주는 기능](#3시간-간격으로-5일간의-기온과-날씨-가져오기)

- [현재 시간을 기준으로 가까운 시간대의 기온과 상세 날씨, 체감온도, 습도, 풍향 및 풍속을 알려주는 기능](#현재-시간을-기준으로-가까운-시간대의-기온과-상세-날씨-체감온도-습도-풍향-및-풍속을-알려주기)

- [평균 온도를 기준으로 기온별 옷차림을 정해주는 기능](#)

- [주간 날씨의 습도, 최고 기온, 최저 기온 및 날씨를 알려주는 기능](#)

- [유튜브 API를 이용하여 "오늘 비와?" 채널의 최근 날씨 예보를 보여주는 기능](#)

- [기온별 옷차림 선정 Tip을 알려주는 기능](#)

- [내가 입었던 옷차림을 기록할 수 있는 기능](#)

- [옷을 입을 때 컬러 매치를 간단하게 도와줄 수 있는 기능](#)

<br>
<br>

---

<br>

## 데이터 불러오기
<br>

### 📌 목차

- [1. OpenWeatherMap API에서 Data 받아오기](#1-openweathermap-api에서-data-받아오기)

- [2. 받아온 data를 통해 날씨 정보 불러오기](#2-받아온-data를-통해-날씨-정보-불러오기)


<br>

### **1.** OpenWeatherMap API에서 Data 받아오기

<br>

우선, OpenWeatherMAP API Data를 받아오기 위해서 `fetch` 메서드를 사용했습니다.<br>

```javascript
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
```

<br>

즉시 실행 함수를 이용하여 data를 받아오는 함수를 작성했습니다.<br>

이 함수는 세션 스토리지에 **location**이라는 이름으로 저장된 아이템이 있지 않을 때, `navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);`를 이용합니다.

만약, 세션 스토리지에 **location**이라는 이름으로 저장된 아이템이 있다면, 세션 스토리지에서 **location** 이름으로 저장된 JSON 포맷의 아이템을 객체로 변환하여 `getWeather` 함수의 매개변수로서 사용됩니다.
<br>
<br>
이는, 웹 페이지에 최초로 접속했을 때가 아닌 웹 페이지에서 다른 목차로 넘어갔다가 다시 메인(홈) 페이지로 돌아왔을 때, 다시 `fetch` 메서드를 통해 data를 받아오는 것이 아닌, 세션 스토리지에 저장된 data를 가져오기 위함입니다.
<br>
<br>

```javascript
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          return response.json().then((errData) => {
            console.log(errData);
            throw new Error("Something went wrong -server side.");
          });
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Something went wrong.");
      })
      .then((data) => {
        let myData = JSON.stringify(data);
        sessionStorage.setItem("location", myData);
        getWeather(data);
      });
  } catch (error) {
    console.log("Data not found");
  }
}
```

`onGekOk`를 통해 위도와 경도를 받아온 후, url을 통해 OpenweatherMapAPI에 data를 요청합니다. <br>
이때, 요청에 의한 응답 신호가 **200과 300사이**라면 제대로 된 응답이라고 판단하여, 데이터를 받아옵니다. 그 외의 응답 신호를 받는다면, `Something went wrong -server side.`라는 에러 메시지를 출력합니다. 만약 응답 신호를 받지 못했을 때는 `Something went wrong.`라는 메시지를 출력합니다. <br>

제대로 된 응답 신호를 통해 데이터를 받아왔다면, 그 데이터(객체)를 JSON 포맷의 문자열로 변환하여 세션 스토리지에 **location**이라는 이름으로 저장한 후, `getWeather` 함수를 호출합니다. <br>

만약 url을 매개변수로 사용하는 `fetch` 메서드가 제대로 된 동작을 하지 못한다면 `Data not found`라는 오류 메시지를 출력합니다.
<br>
<br>

### **2.** 받아온 data를 통해 날씨 정보 불러오기

`getWeather` 함수에서는 날씨 정보를 사용하는 방식이 크게 3가지가 있습니다. <br>

#### 1. 3시간 간격으로 5일간의 기온과 날씨를 알려주는 기능

#### 2. 현재 시간을 기준으로 가까운 시간대의 기온과 상세 날씨, 체감온도, 습도, 풍향 및 풍속을 알려주는 기능

#### 3. 주간 날씨의 습도, 최고 기온, 최저 기온 및 날씨를 알려주는 기능입니다.


<br>

다음은 `getWeather` 함수에서 가져온 날씨 data를 HTML에서 어떤 방식으로 보여줄 것인지에 대한 설명입니다.  

<br>

처음에는 받아온 데이터를 일일이 자식 태그로 HTML에 작성해 줬습니다. 그러다가 반복되는 태그를 통해 HTML의 길이가 길어지게 되었고, 코드의 길이를 줄이고 싶어졌습니다. <span style="color:red">**반복되는 태그를 하나의 틀로 만들어놓고, 안에 내용만 바꿔줄 수 있으면 좋지 않을까?**</span>라는 고민을 하다가 `template`태그와 `importNode`에 대해 알게 되었습니다. 

<br>

아래는 제가 사용한 방식입니다. 

### HTML

```html
<!-- 3시간 간격으로 5일간의 기온과 날씨 알려주는 template -->
<template class="weather-template">
  <li class="weather-item">
    <span class="weather-main"></span>
    <span class="temp"></span>
    <span class="day"></span>
  </li>
</template>

<!-- 현재 시간을 기준으로 가까운 시간대의 날씨 정보를 알려주는 template -->
<template class="sub-weather-template">
  <li class="weather-item">
    <span class="weather-main"></span>
    <span class="temp"></span>
    <span class="day"></span>
    <span class="time"></span>
   
    <span class="weather-data">
      <span class="weather-description"></span>
      <span class="feel-temp"></span>
      <span class="humidity"></span>
      <span class="wind"></span>
    </span>
  </li>
</template>

<!-- 주간 최고기온과 최저기온을 알려주는 template -->
<template class="weekly-weather-template">
  <li class="weather-item weekly-weather-item">
    <span class="today"></span>
    <span class="humidity"></span>
    <span class="max-weather-main"></span>
    <span class="max-temp"></span>
    <span class="min-weather-main"></span>
    <span class="min-temp"></span>
  </li>
</template>
```

`template` 태그를 사용한 이유는 반복되는 태그를 줄임으로서, 코드의 길이를 줄이기 위함입니다.

<br>

### getWeather


```javascript
function getWeather(data) {
    const weatherDatas = data.list.length;

    const weatherLists = document.querySelector('#weather-lists');
    const subWeatherLists = document.querySelector('#sub-weather-lists');
    const weeklyWeatherLists = document.querySelector('#weekly-weather-lists');

    const weatherTemplate = document.querySelector('.weather-template');
    const subWeatherTemplate = document.querySelector('.sub-weather-template');
    const weeklyWeatherTemplate = document.querySelector('.weekly-weather-template');

    /* 생략 */

for (let i = 0; i < weatherDatas; i++) {
        const weatherLi = document.importNode(weatherTemplate.content, true);
        const subWeatherLi = document.importNode(subWeatherTemplate.content, true);
        const weeklyWeatherLi = document.importNode(weeklyWeatherTemplate.content, true);

    /* 생략 */
```
[weatherLists](#1-3시간-간격으로-5일간의-기온과-날씨를-알려주는-기능), [subWeatherLists](#2-현재-시간을-기준으로-가까운-시간대의-기온과-상세-날씨-체감온도-습도-풍향-및-풍속을-알려주는-기능), [weeklyWeatherLists](#3-주간-날씨의-습도-최고-기온-최저-기온-및-날씨를-알려주는-기능입니다)는 HTML 상에서 template를 자식 요소로 받을 부모입니다. 

아래의 template 변수들은 HTML상에 있는 `template` 태그입니다. 

**for문**은 내가 받아온 ` const weatherDatas = data.list.length;`의 길이만큼 반복하게 됩니다. 각각의 `template`는 `importNode`를 통해 복제되며, **true**를 지정하여 자식 노드를 포함 시키겠다고 선언하였습니다. 

이를 통해 `template`을 이용하여 내가 원하는 부모 요소의 자식 요소로 날씨 data를 넣을 준비를 마쳤습니다. 

<br>
<br>
<br>

* * *

<br>

## 3시간 간격으로 5일간의 기온과 날씨 가져오기

<br>

### 📌 목차
- [1. 변수 선언 및 날짜별 예보 멘트 생성](#1-변수-선언-및-날짜별-예보-멘트-생성)
  
- [2. getMainWeather 함수 호출](#2-getmainweather-함수-호출)
  
- [3. getChart 함수 호출](#3-getchart-함수-호출)
<br>
<br>

### **1. 변수 선언 및 날짜별 예보 멘트 생성**
<br>
3시간 간격으로 5일간의 기온과 날씨를 알려주는 것을 <span style="color:red">main-weather</span>라고 지정하였습니다.
<br>

<br>
main-weather를 구하기 위해서는 아래와 같은 변수들이 필요합니다. 

<br>

```javascript
  i = OpenWeatherMap API를 통해 가져온 data의 length만큼 for문을 반복할 때 값 

  nowDate = 실제 날짜를 가져온 값 ex: 3월 10일이면 10을 가져옴 

  weatherPeriod = 실제 날짜를 담기위한 배열 

  concreteDayData = 가져온 data가 갖고있는 날짜 ( utc 기준 )  ex: 2023-03-10 09:00:00

  calcData = 연도-월-일 양식의 실제 날짜를 가져온 값 ex: 2023-03-10

// 실제 한국 날짜 구하는 함수 
function calcDay(concreteDayData) {
    let date = concreteDayData.split(' ')[0]; ex: 2023-03-10
    let concreteTime = parseInt(concreteDayData.split(' ')[1].slice(0, 2)); ex: 9
    let koreaDate = date.substr(0, date.length - 2); ex: 2023-03
    let setDate = parseInt(date.substr(-2)); ex: 10
    if (concreteTime >= 15) { // utc 시간 + 9 = 실제 한국 시간 concreteTime이 15 이상이면 12시가 지나 하루가 바뀜 
        setDate += 1;
    }
    setDate < 10 ? setDate = `0${String(setDate)}` : setDate = String(setDate);

    return [koreaDate, (koreaDate + setDate)];
    // return의 [1] 방에는 실제 한국 날짜가 담기게 된다. 
}

temp = data에서 받아온 온도 

timeArr = Chart에 넣을 시간
```
<br>

다음은 `getWeather`함수에서 <span style="color:red">**main-weather**</span>를 구하는 방식입니다.
<br>

```javascript
// main-weather 
        if (i === 0) {
            nowDate < 10 ? nowDate = `0${String(nowDate)}` : nowDate = String(nowDate);
            weatherPeriod.push(nowDate);
        }
        //  concreTime이 15시인 순간, 한국 시간은 다음날 0시 
        else if (i !== 0 && concreteTime === 15) {
            let calcData = calcDay(concreteDayData)[1];
            weatherPeriod.push(calcData);

            document.querySelector('.weather-period').textContent = `날짜별 예보 (${calcDay(concreteDayData)[0] + weatherPeriod[0]} ~ ${weatherPeriod[weatherPeriod.length - 1]})`;
        }


        const getMainWeatherData = [weatherLi, data, i, concreteDayData, temp, koreaTime, timeArr, weatherLists];
        getMainWeather(getMainWeatherData);
```

첫 번째 날짜를 받기 위해 들어간 조건문에서 실제 날짜가 10일보다 작으면 0을 붙여주고 아니면 그대로 `weatherPeriod` 배열에 담기게 됩니다. 

i가 0이 아니고 `concreteTime`이 15시일 때는 한국 시간으로 오전 12시가 됐음을 의미하고 날짜가 바뀌게 되는 순간입니다. 

그 순간에 `calcData` 에는 calcDay함수를 통해 구해진 실제 날짜가 초기화되고 `weatherPeriod` 배열에 담기게 됩니다. 

그렇게 `weatherPeriod`에 담긴 값은 `.weather-period`라는 class를 가진 태그에 <span style="color:skyblue">날짜별 예보 ( 예보를 시작한 날짜 ~ 예보가 끝나는 날짜 )</span>를 나타내게 됩니다.

<br>


### **2. getMainWeather 함수 호출**
<br>

**getMainWeatherData**를 매개변수로 `getMainWeather`함수를 호출 했습니다. 

```javascript
/**
 * 
 * @param {object} getMainWeatherData 
 * getMainWeatherData[0] = weatherLi ( weather template )
 * getMainWeatherData[1] = data ( weather API data )
 * getMainWeatherData[2] = i ( data 개수 )
 * getMainWeatherData[3] = concreteDayData ( 데이터 별 날짜 )
 * getMainWeatherData[4] = temp ( 날짜 별 온도 )
 * getMainWeatherData[5] = koreaTime ( 한국 시간 )
 * getMainWeatherData[6] = weatherLists ( main-weather-lists )
 */
function getMainWeather(getMainWeatherData) {

    getMainWeatherData[0].querySelector('.weather-main').insertAdjacentHTML('afterbegin', iconLoader(getMainWeatherData[1], getMainWeatherData[2], getMainWeatherData[3])[0]);

    getMainWeatherData[0].querySelector('.temp').textContent = `${getMainWeatherData[4]}˚`;

    getMainWeatherData[0].querySelector('.day').textContent = getWeatherDay(getMainWeatherData[2], getMainWeatherData[3], getMainWeatherData[5]);

    getMainWeatherData[6].append(getMainWeatherData[0]);
}
```

`.weather-main`이라는 클래스를 가진 태그에 `insertAdjacentHTML` 메서드를 사용하여 자식 태그로 **iconLoader** 함수를 호출한 return값의 첫 번째 값을 넣습니다.

<br>

### **iconLoader** 
<br>

```javascript
function iconLoader(data, i, concreteDayData) {
    const loadedMainWeather = `${data.list[i].weather[0].main}`;
    const weatherLoader = `${data.list[i].weather[0].description}`;
    return extractWeatherId(concreteDayData, loadedMainWeather, weatherLoader);
}
```

`iconLoader` 함수에서는 **OpenWeatherMap API**을 통해 받은 날씨 data에서 그날의 날씨와 상세 날씨 묘사를 변수에 초기화 시켜서 `extractWeatherId` 함수의 매게변수로서 사용됩니다.

즉, `iconLoader` 함수는 그날의 날씨와 상세 날씨 묘사를 받아오기 위한 함수입니다. 

<br>

### **extractWeatherId**
<br>

```javascript
function extractWeatherId(concreteDayData, loadedMainWeather, weatherLoader) {
    for (let i = 0; i < mainWeather.length; i++) {
        if (loadedMainWeather === mainWeather[i].title) {
            const loadedId = mainWeather[i].id;
            return getWeatherList(concreteDayData, weatherLoader, loadedId);
        }
    }
}
``` 

`extractWeatherId` 에서는 **weather.js** 파일을 모듈화 시켜놓은 **weatherList.mjs** 파일에서 **import** 한 `mainWeather` 라는 이름으로 저장된 배열을 가져와서 사용합니다.

<br>


```javascript
// weather.js 파일 상단에 import
import { mainWeather, descriptionWeather } from './weatherList.mjs';
import { getClothes } from './clothes.mjs';
```
<br>

```javascript
// export 될 mainWeather
export const mainWeather = [
    {
        title: 'Thunderstorm',
        id: 100,
    },
    {
        title: "Drizzle",
        id: 101,
    },
    {
        title: "Rain",
        id: 102,
    },
    {
        title: "Snow",
        id: 103,
    },
    {
        title: "Atmosphere",
        id: 104,
    },
    {
        title: "Clear",
        id: 105,
    },
    {
        title: "Clouds",
        id: 106,
    },
];
```

`extractWeatherId` 에서 `mainWeather` 의 length 만큼 **for문**을 수행하면서, 그날의 날씨와 `mainWeather.title` 을 비교하여 같다면, `loadedId` 라는 변수에는 그에 해당되는 id 값을 초기화 시킵니다.

그리고 `getWeatherList`라는 함수의 매개변수로서 사용됩니다.

즉, `extractWeatherId` 함수는 그날의 날씨와 `mainWeather` 에 저장된 날씨가 같을 때, id를 가져오기 위한 함수입니다.  
<br>

### **getWeatherList**
<br>

```javascript
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
```
<br>

`getWeatherList` 함수에서는 **weatherList.mjs** 파일에서 **import** 한 `descriptionWeather`의 length만큼 **for문**을 수행하게 됩니다. 

<br>

```javascript
export const descriptionWeather = [
    {
        title: "Thunderstorm", // 날씨 
        id: 100, // mainWeather에서 가져온 id와 비교할 id
        list: [
            "thunderstorm with light rain", // 날씨 상세 묘사
            "wi-day-storm-showers", // 아침 ~ 낮 날씨 이모티콘
            "wi-storm-showers", // 낮 ~ 밤 날씨 이모티콘
            "wi-night-storm-showers", // 밤 ~ 아침 날씨 이모티콘
            "약한 비를 동반한 천둥", // 날씨 상세 묘사 멘트 

          // 생략
        ],
    },
    {
        title: "Drizzle",
        id: 101,
          list: [
            "light intensity drizzle",
            "wi-day-sprinkle",
            "wi-sprinkle",
            "wi-night-sleet",
            "약한 이슬비",
            
        // 생략
```
<br>

**for문**을 수행하면서 `loadedId`와 `descriptionWeather`의 id가 같다면, `descriptionWeather`의 list length만큼 **for문 (이중)** 을 수행합니다. 
<br>

그리고  **iconLoader** 함수에서 초기화 시킨 상세 날씨 묘사와 **descriptionWeather**의 list안에 상세 날씨 묘사가 같다면, **getData** 함수를 호출합니다. 
<br>

이때, **getData**의 매개변수에는 시간과 두번의 조건을 반복하면서 만족했을 때의 i와 j 값을 넘겨줍니다. i는 id가 같을 때의 위치를 담고 있고, j는 상세 날씨 묘사가 같을 때의 위치를 담고 있습니다. 

즉,  `getWeatherList` 함수는 내가 가져온 data의 상세 날씨 묘사를 저장된 날씨 묘사 배열과 비교하여 일치할 떄, 저장된 객체의 위치를 찾기 위한 함수입니다.  
<br>

### **getData**
<br>

```javascript
function getData(weatherTime, objectLength, listLength) {
    return [getIcon(weatherTime, objectLength, listLength), getDecsriptionWeather(objectLength, listLength)]
}
```
<br>

**getData** 함수에서는 가져온 매개변수를 다시 두 함수로 넘겨주게 됩니다. 

icon을 가져오기 위해 사용할 함수는 **getIcon** 이며, 후에 설명할 **subWeather**에 상세 날씨 묘사를 가져오기 위해 사용할 함수는 **getDescriptionWeather** 입니다. 

즉, **getData**은 **icon**을 가져오거나 **상세 날씨 묘사**를 가져올 때 지금까지의 route는 동일하기 때문에, 그 과정을 따로 분리하지 않았던 것을 분리해주기 위한 함수입니다. 

<br>

<p style="font-size:24px">weather icon을 가져오기 위한 과정</p>

iconLoader -> extractWeatherId -> getWeatherList -> getData -> getIcon

<br>

<p style="font-size:24px">날씨 상세 묘사를 가져오기 위한 과정</p>

iconLoader -> extractWeatherId -> getWeatherList -> getData -> getDescriptionWeather

<br>

### **getIcon**
<br>

```javascript
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
```
매개변수로 받은 weatherTime은 utc 기준이기 때문에 한국 기준으로 바꿔서 시간대에 맞는 icon을 가져오게 됩니다. 

<br>

```javascript
/**
 * 
 * @param {object} getMainWeatherData 
 * getMainWeatherData[0] = weatherLi ( weather template )
 * getMainWeatherData[1] = data ( weather API data )
 * getMainWeatherData[2] = i ( data 개수 )
 * getMainWeatherData[3] = concreteDayData ( 데이터 별 날짜 )
 * getMainWeatherData[4] = temp ( 날짜 별 온도 )
 * getMainWeatherData[5] = koreaTime ( 한국 시간 )
 * getMainWeatherData[6] = weatherLists ( main-weather-lists )
 */
function getMainWeather(getMainWeatherData) {

    getMainWeatherData[0].querySelector('.weather-main').insertAdjacentHTML('afterbegin', iconLoader(getMainWeatherData[1], getMainWeatherData[2], getMainWeatherData[3])[0]);

    getMainWeatherData[0].querySelector('.temp').textContent = `${getMainWeatherData[4]}˚`;

    getMainWeatherData[0].querySelector('.day').textContent = getWeatherDay(getMainWeatherData[2], getMainWeatherData[3], getMainWeatherData[5]);

    getMainWeatherData[6].append(getMainWeatherData[0]);
}
```

`.temp`라는 클래스를 가진 태그에 weather Data에서 가져온 온도를 `textContent`로 지정합니다.

`.day`라는 클래스를 가진 태그에는 **getWeatherDay** 함수를 호출한 값을 `textContent`로 지정합니다. 

<br>

### **getWeatherDay**
<br>

```javascript
function getWeatherDay(i, concreteDayData, concreteTime) {
    if (i === 0) {
        return `\u00A0\u00A0\u00A0\u00A0\u00A0 오늘`;
    }
    else if (concreteTime === 0) {
        return calcDay(concreteDayData)[1];
    }
}
```

첫번째로 받아온 data는 **오늘**이라고 표시하고, 그 외에는 하루가 바뀔 때마다 실제 한국 날짜를 보여줍니다. 

마지막으로 **weatherLists**에 **weatherLi**를 `append` 해줘서 3시간 간격으로 5일동안의 날씨 icon과 온도 및 날짜를 알려줄 수 있게 됐습니다. 

<br>

### **3. getChart 함수 호출**
<br>

```javascript
// getWeather 함수 일부

    let tempArr = [];
    let timeArr = [];

 for (let i = 0; i < weatherDatas; i++) {

   let temp = Math.round(`${data.list[i].main.temp}`);

   tempArr.push(temp);

 // utc 시간 한국 표준 시간으로 변환 
      let koreaTime = concreteTime + 9;

        koreaTime === 24 ? koreaTime = 0 :
            koreaTime === 27 ? koreaTime = 3 :
                koreaTime === 30 ? koreaTime = 6 : "";
       
  koreaTime >= 12 ? timeArr.push(`${koreaTime}:00 pm`) : timeArr.push(`0${koreaTime}:00 am`);

 }

  getChart(tempArr, timeArr);

```

`getChart` 함수를 호출시키기 전에 매개변수로 `tempArr`과 `timeArr`를 넘겨줍니다. `tempArr`는 전체 data의 온도를 담고있고, `timeArr`는 전체 data의 날짜를 담고 있습니다. 날짜는 **utc 시간이 기준인 data를 한국 시간으로 바꿔서 저장하였습니다.** 

<br>

### **getChart**
<br>

```javascript
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
```

이 함수는 **Chart.js** 라이브러리를 사용하여 선 그래프를 생성합니다. 함수는 두 개의 매개 변수 `tempArr`과 `timeArr`를 받습니다. 

캔버스 요소를 가져와서 2D 컨텍스트를 설정합니다.

```javascript
const tempChart = document.getElementById("temp-chart").getContext("2d");
```
gradientStroke라는 변수를 선언하고, 이는 `createLinearGradient()` 메서드를 사용하여 2D 컨텍스트에서 선형 그라데이션을 만듭니다.

```javascript
let gradientStroke = tempChart.createLinearGradient(0, 50, 0, 0);
gradientStroke.addColorStop(1, '#f11f61');
gradientStroke.addColorStop(0, '#79a5fe');
```
Chart 객체를 생성하고, options 객체와 함께 인수로 전달합니다.
```javascript
new Chart(tempChart, {
    ...
});
```
옵션 객체는 다음과 같습니다.

```javascript
options: {
    responsive: false,
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
```
그래프의 선 스타일, 축 레이블, 축 스타일 등을 정의합니다.

```javascript
scaleLineColor: "rgba(0,0,0,0)",
```
그래프 유형을 'line'으로 설정합니다.
```javascript
type: 'line',
```
데이터를 정의합니다. labels는 x축 레이블을 나타내며, datasets는 선 그래프의 데이터를 나타냅니다.

```javascript
data: {
    labels: timeArr,
    datasets: [
        {
            data: tempArr,
            label: ' ',
            backgroundColor: "transparent",
            fill: false,
            lineTension: 0,
            borderWidth: 4,
            borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 4,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            pointStyle: 'rect',
        }
    ]
}
```

그래프의 크기 조정 및 범례 설정을 해줍니다.

```javascript
responsive: false,
legend: {
    display: false,
},
```
y축과 x축의 스타일을 정의합니다.

```javascript
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
```
        
<br>

## 현재 시간을 기준으로 가까운 시간대의 기온과 상세 날씨, 체감온도, 습도, 풍향 및 풍속을 알려주기


### **getWeather**

```javascript
 let SubWeatherTrue = false;
 // 생략 

// sub-weather
const getSubWeatherData = [data, i, koreaTime, subWeatherLi, concreteDayData, humidity, subWeatherLists, nowHour]
       
        if (SubWeatherTrue === false) {
            SubWeatherTrue = true;

            getSubWeather(getSubWeatherData);
            subWeatherBackground(nowHour);
        }
```

`getSubWeather` 함수와 `subWeatherBackground` 함수를 호출하기 위해서는 `SubWeatherTrue`라는 변수가 **false**일 때만 동작하는 조건문을 성립해야 합니다. 

이 조건문은 처음에만 **false**를 만족시켜 조건문 내의 코드를 동작시키고 그 이후로는 더이상 조건을 만족시키지 못해 실행되지 않습니다.

<br>

### **getSubWeatherData**
<br>

```javascript
/**
 * 
 * @param {object} getSubWeatherData 
 *  getSubWeatherData[0] = data ( weather API data )
 *  getSubWeatherData[1] = i ( data 개수 )
 *  getSubWeatherData[2] = koreaTime ( 한국 시간 )
 *  getSubWeatherData[3] = subWeatherLi ( sub weather template )
 *  getSubWeatherData[4] = concreteDayData ( 데이터 별 날짜 )
 *  getSubWeatherData[5] = humidity ( 습도 )
 *  getSubWeatherData[6] = subWeatherLists ( sub-weather-lists )
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
```
체감온도, 풍향, 풍속, subTemp를 구해줍니다.<br>

시간의 경우 한국 시간, 그리고 12시를 기준으로 오전 오후를 나눠서 설정해줍니다. 

`.time`이라는 클래스명을 가진 태그에 시간을 넣어줍니다. 

`.weather-main`이라는 클래스명을 가진 태그에 날씨 icon을 넣어줍니다. 

`.temp`라는 클래스명을 가진 태그에 subTemp를 넣어줍니다. 

`weather-description`이라는 클래스명을 가진 태그에 날씨 상세 묘사를 넣어줍니다.

`.feel-temp`라는 클래스명을 가진 태그에 체감 온도를 넣어줍니다.

`.humidity`라는 클래스명을 가진 태그에 습도를 넣어줍니다. 

풍향은 0 ~ 360을 기준으로 90도씩 나눠서 풍향을 정해줍니다. 

`.wind`라는 클래스명을 가진 태그에 풍향과 풍속을 넣어줍니다. 

`subWeatherData`의 경우 메인 페이지를 벗어나 서브 페이지로 이동했을 때, 같은 정보를 `fetch` 메서드로 호출하지 않고 세션 스토리지에 data를 저장하고 그 data를 이용하기 위해 사용할 변수입니다.

<br>

### **subWeatherBackground**
<br>

```javascript
function subWeatherBackground(nowHour) {
    const subWeatherArea = document.querySelector('.sub-weather');

    if (nowHour > 6 && nowHour < 17) {
        subWeatherArea.style.backgroundImage = "url('저장된 파일 경로')";
        subWeatherArea.style.color = "#333032";
    }
    else if (nowHour >= 17 && nowHour <= 20) {
        subWeatherArea.style.backgroundImage = "url('저장된 파일 경로')";
        subWeatherArea.style.color = "#aeeaff";
    } else {
        subWeatherArea.style.backgroundImage = "url('저장된 파일 경로')";
        subWeatherArea.style.color = "#eeeb99";
    }
}
```

`subWeatherBackground` 함수는 **nowHour**에 맞춰서 backgroundImage를 설정해주기 위한 함수입니다. 

시간에 따라 아침, 오후, 밤으로 나눠서 3가지의 배경으로 표현합니다. 

