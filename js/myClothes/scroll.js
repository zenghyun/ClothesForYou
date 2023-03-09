const header = document.querySelector('header');
const subWeather = document.querySelector('.sub-weather');
const SUB_WEATHER_HEIGHT = 260;
const FOOTER_TOP = document.querySelector('footer').getBoundingClientRect();

const onScroll = event => {
  const scrollPosition = parseInt(event.target.scrollingElement.scrollTop);
  if (scrollPosition > 10) {
    if (!header.classList.contains('scrolledDown')) {
      header.classList.add('scrolledDown');
    }
  } else {
    if (header.classList.contains('scrolledDown')) {
      !header.classList.remove('scrolledDown');
    }
  }

  if (scrollPosition < 60) {
    subWeather.style.top = "70px";
  }

}

window.addEventListener('scroll', onScroll);


