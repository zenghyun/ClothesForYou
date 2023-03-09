function subWeatherBackground(nowHour) {
  const subWeatherArea = document.querySelector('.sub-weather');

  if (nowHour > 6 && nowHour < 17) {
    subWeatherArea.style.backgroundImage = "url('../images/weather/06시~16시.gif')";
    subWeatherArea.style.color = "#333032";
  }
  else if (nowHour >= 17 && nowHour <= 20) {
    subWeatherArea.style.backgroundImage = "url('../images/weather/16시~20시.gif')";
    subWeatherArea.style.color = "#aeeaff";
  } else {
    subWeatherArea.style.backgroundImage = "url('../images/weather/20시~06시.gif')";
    subWeatherArea.style.color = "#eeeb99";
  }
}
/**
 * 
 * @param {object} parsedData 
 *  parsedData[0].time = concreteTime
 *  parsedData[0].weatherIcon = weatherIcon ( i tag icon )
 *  parsedData[0].subTemp = icon 옆에 표시할 온도
 *  parsedData[0].weatherDescription = 날씨 상세 묘사  
 *  parsedData[0].feelTemp = 체감온도
 *  parsedData[0].humidity = 습도
 *  parsedData[0].deg = 바람이 부는 방향
 *  parsedData[0].wind = 풍속
 */
function getSubWeather(parsedData) {
  const subWeatherLists = document.querySelector('#sub-weather-lists');
  const subWeatherTemplate = document.querySelector('.sub-weather-template');
  const subWeatherLi = document.importNode(subWeatherTemplate.content, true);

  subWeatherLi.querySelector('.time').textContent = parsedData[0].time;

  subWeatherLi.querySelector('.weather-main').insertAdjacentHTML('afterbegin', parsedData[0].weatherIcon);

  subWeatherLi.querySelector('.temp').textContent = `${parsedData[0].subTemp}˚`;

  subWeatherLi.querySelector('.weather-description').textContent = parsedData[0].weatherDescription;

  subWeatherLi.querySelector('.feel-temp').textContent = `체감 온도 ${parsedData[0].feelTemp}˚`;

  subWeatherLi.querySelector('.humidity').textContent = `습도 ${parsedData[0].humidity}%`;

  subWeatherLi.querySelector('.wind').textContent = `${parsedData[0].deg} ${parsedData[0].wind}m/s`;

  subWeatherLists.append(subWeatherLi);
}



(function loadData() {

  const loadData = sessionStorage.getItem("subWeather");
  try {
    if (sessionStorage.hasOwnProperty("subWeather")) {
      const parsedData = JSON.parse(loadData);
      getSubWeather(parsedData);
      subWeatherBackground(parsedData[0].nowHour);
    }
  } catch (error) {
    console.log("Data not found in session storage");
  }

})();
