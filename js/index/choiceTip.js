// Choice Tip 

const $container = document.querySelector(".container");
const $prev = document.querySelector(".prev");
const $next = document.querySelector(".next"); 

(function addEvent(){
  $prev.addEventListener('click', translateContainer.bind(this, 1));
  $next.addEventListener('click', translateContainer.bind(this, -1));
})();

function translateContainer(direction){
  const selectedBtn = (direction === 1) ? 'prev' : 'next';
  $container.style.transitionDuration = '500ms';
  $container.style.transform = `translateX(${direction * (100 / 5)}%)`;
  $container.ontransitionend = () => reorganizeEl(selectedBtn);
}

function reorganizeEl(selectedBtn) {
  $container.removeAttribute('style');
  (selectedBtn === 'prev') ? $container.insertBefore($container.lastElementChild, $container.firstElementChild): $container.appendChild($container.firstElementChild);
}