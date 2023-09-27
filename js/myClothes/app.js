(function loadData() {

  const loadData = sessionStorage.getItem("subWeather");
  try {
    if (sessionStorage.hasOwnProperty("subWeather")) {
      const parsedData = JSON.parse(loadData);
      getSubWeather(parsedData);
      subWeatherBackground(parsedData.kr_hours);
    }
  } catch (error) {
    console.log("Data not found in session storage");
  }

})();

/**
 * 
 * @param {object} parsedData 
 *  time = concreteTime
 *  weatherIcon = weatherIcon ( i tag icon )
 *  subTemp = icon 옆에 표시할 온도
 *  weatherDescription = 날씨 상세 묘사  
 *  feelTemp = 체감온도
 *  humidity = 습도
 *  direction = 바람이 부는 방향
 *  wind = 풍속
 */
function getSubWeather(parsedData) {
  const { time, weatherIcon, subTemp, weatherDescription, feelTemp, humidity, direction, wind } = parsedData;
  const subWeatherLists = document.querySelector('#sub-weather-lists');
  const subWeatherTemplate = document.querySelector('.sub-weather-template');
  const subWeatherLi = document.importNode(subWeatherTemplate.content, true);

  subWeatherLi.querySelector('.time').textContent = time;

  subWeatherLi.querySelector('.weather-main').insertAdjacentHTML('afterbegin', weatherIcon);

  subWeatherLi.querySelector('.temp').textContent = `${subTemp}˚`;

  subWeatherLi.querySelector('.weather-description').textContent = weatherDescription;

  subWeatherLi.querySelector('.feel-temp').textContent = `체감 온도 ${feelTemp}˚`;

  subWeatherLi.querySelector('.humidity').textContent = `습도 ${humidity}%`;

  subWeatherLi.querySelector('.wind').textContent = `${direction} ${wind}m/s`;

  subWeatherLists.append(subWeatherLi);
}

function subWeatherBackground(kr_hours) {
  const kr_numberTypeHours = Number(kr_hours);
  const subWeatherArea = document.querySelector('.sub-weather');

if (kr_numberTypeHours >= 6 && kr_numberTypeHours <= 15) {
    subWeatherArea.style.backgroundImage =
      "url('../images/weather/06시~15시.gif')";
    subWeatherArea.style.color = "#333032";
  } else if (kr_numberTypeHours >= 16 && kr_numberTypeHours <= 19) {
    subWeatherArea.style.backgroundImage =
      "url('../images/weather/16시~19시.gif')";
    subWeatherArea.style.color = "#aeeaff";
  } else {
    subWeatherArea.style.backgroundImage =
      "url('../images/weather/20시~05시.gif')";
    subWeatherArea.style.color = "#eeeb99";
  }
}
