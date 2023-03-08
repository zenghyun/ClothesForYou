#  🌈 Clothes For You
<br>

## 💻 프로젝트 소개
OpenWeatherMap API를 이용하여 기온에 따른 옷차림을 추천해주는 사이트입니다.
<br>
<br>

## 🕰 개발 기간
ㆍ23.02.13 ~ 23.03.08 
<br><br>

### ⚙ 개발 환경
ㆍ`HTML`

ㆍ`CSS`

ㆍ`SASS`

ㆍ`JAVASCRIPT`

ㆍ**IDE** : Visual Studio Code

<br>
<br>

## 📌 주요 기능
ㆍ [3시간 간격으로 5일간의 기온과 날씨를 알려주는 기능](#✔-3시간-간격으로-5일간의-기온과-날씨-가져오기)

ㆍ [현재 시간을 기준으로 가까운 시간대의 기온과 상세 날씨, 체감온도, 습도, 풍향 및 풍속을 알려주는 기능](#)

ㆍ [평균 온도를 기준으로 기온별 옷차림을 정해주는 기능](#) 

ㆍ [주간 날씨의 습도, 최고 기온, 최저 기온 및 날씨를 알려주는 기능](#) 

ㆍ [유튜브 API를 이용하여 "오늘 비와?" 채널의 최근 날씨 예보를 보여주는 기능](#) 

ㆍ [기온별 옷차림 선정 Tip을 알려주는 기능](#) 

ㆍ [내가 입었던 옷차림을 기록할 수 있는 기능](#) 

ㆍ [옷을 입을 때 컬러 매치를 간단하게 도와줄 수 있는 기능](#) 

<br>
<br>

***
<br>


## ✔ 3시간 간격으로 5일간의 기온과 날씨 가져오기

<br>

## **1.** OpenWeatherMap API에서 Data 받아오기 
<br>

우선, OpenWeatherMAP API Data를 받아오기 위해서 fetch 메서드를 사용했습니다.<br>

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
즉시 실행함수를 이용하여 data를 받아오는 함수를 작성했습니다.<br> 

이 함수는 세션스토리지에 **location**이라는 이름으로 저장된 아이템이 있지 않을 때, `navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);`를 이용합니다. 

만약, 세션스토리지에 **location**이라는 이름으로 저장된 아이템이 있다면, 세션스토리지에서 **location** 이름으로 저장된 JSON 포맷의 아이템을 객체로 변환하여 `getWeather` 함수의 매개변수로서 사용됩니다.
