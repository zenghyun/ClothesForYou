const pickColor = document.querySelectorAll('.clothes-color');
const detailClothesBox = document.querySelectorAll('.detail-clothes-box');

pickColor.forEach(pick => {
  pick.addEventListener('input', (event) => {
    let changeColor = event.target.value;
    let changeClothesColor = event.currentTarget.previousElementSibling;
    changeClothesColor.style.color = changeColor;
  })
})