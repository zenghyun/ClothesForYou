const $header = document.querySelector('header');
const $subWeather = document.querySelector('.sub-weather');
const SUB_WEATHER_HEIGHT = 260;
const FOOTER_TOP = document.querySelector('footer').getBoundingClientRect();

const onScroll = event => {
  const scrollPosition = parseInt(event.target.scrollingElement.scrollTop);
  if (scrollPosition > 10) {
    if (!$header.classList.contains('scrolledDown')) {
      $header.classList.add('scrolledDown');
    }
  } else {
    if ($header.classList.contains('scrolledDown')) {
      !$header.classList.remove('scrolledDown');
    }
  }
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const divideHeight = scrollHeight / clientHeight;

  if( window.innerWidth > 1300){
    if (FOOTER_TOP.top < scrollPosition - SUB_WEATHER_HEIGHT) {
    }
    else  {
      $subWeather.style.transition = "top 0.5s";
      $subWeather.style.top = `${(scrollPosition - SUB_WEATHER_HEIGHT)/divideHeight}px`;
    }
  } 

  if (scrollPosition < 60) {
    $subWeather.style.top = "70px";
  } 


}

window.addEventListener('scroll', onScroll);


