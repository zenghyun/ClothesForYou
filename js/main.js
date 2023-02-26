const header = document.querySelector('header');
const subWeather = document.querySelector('.sub-weather');
const SUB_WEATHER_HEIGHT = 260;
const BODY_HEIGHT = 100;
const ASIDE_HEIGHT = 190;
const DIV_HEIGHT = ASIDE_HEIGHT / BODY_HEIGHT;

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
    subWeather.style.transition = "0.5s";
    subWeather.style.top = "70px";
  }
  else {
    subWeather.style.top = `${(scrollPosition + SUB_WEATHER_HEIGHT) / DIV_HEIGHT}px`;
  }
}

const ul = document.querySelectorAll('.by-temperature-clothes-list');
console.log("ul:", ul);

ul.forEach(li => {
  li.addEventListener('click', (event)=> {
    console.log(event.target.style.backgroundImage);
  })

})

window.addEventListener('scroll', onScroll);