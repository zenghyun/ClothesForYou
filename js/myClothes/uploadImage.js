const getFileBtn = document.querySelector('#image');
const fileName = document.querySelector('#fileName-preview');
const IMG_KEY = "IMG";
let routeLength = 0;
let images = [];

getFileBtn.addEventListener('change', (event) => {
  let route = event.target.files
  const routeAry = (Array.from(route));
  routeLength += route.length;

  if (routeLength === 1) {
    fileName.value = (`${route[0].name}`).trim();
  } else {
    fileName.value = (`${route[0].name}외 ${routeLength - 1}개`).trim();
  }
  handleImg(routeAry);
})

// 전체 제거 
const deleteAllBtn = document.querySelector('.delete-all');
deleteAllBtn.addEventListener('click', () => {
  localStorage.removeItem(IMG_KEY);
  const imgPreview = document.querySelector('.img-preview');
  imgPreview.replaceChildren();
  fileName.value = "";
});

// delete image
function deleteImage(event) {

  // 내가 선택한 이미지 제거 
  const img = event.target.parentElement;
  img.remove();
  images = images.filter(image => image.id !== parseInt(img.id));
  saveImage();
}

// save Image 
function saveImage() {
  localStorage.setItem(IMG_KEY, JSON.stringify(images));
}


// paint Image 
function paintImage(newImageObj) {
  const imgPreview = document.querySelector('.img-preview');

  const uploadContainer = document.createElement('div');
  uploadContainer.classList.add("upload-container");
  uploadContainer.id = newImageObj.id;

  const log = document.createElement('div');
  log.classList.add('log');
  log.textContent = newImageObj.log;

  const img = document.createElement('img');
  img.setAttribute('src', newImageObj.src);

  const btn = document.createElement('span');
  btn.textContent = "X";
  btn.addEventListener('click', deleteImage)

  uploadContainer.appendChild($btn);
  uploadContainer.appendChild($log);
  uploadContainer.appendChild($img);
  imgPreview.appendChild($uploadContainer);
}

// upload한 image 
function handleImg(routeAry) {
  routeAry.forEach((data) => {
    if (data.type.includes('image')) {
      // 파일 제한을 둬서 이미지만 골라서 출력 
      const fileReader = new FileReader();
      fileReader.readAsDataURL(data);

      fileReader.addEventListener('load', (event) => {

        let date = new Date();
        let today = date.toLocaleDateString();
        const newImageObj = {
          id: Date.now(),
          log: today,
          src: event.target.result
        }
        images.push(newImageObj);
        paintImage(newImageObj);
        saveImage();
      })
    }
  })

}

// load Image 
(function loadImage() {

  const loadImage = localStorage.getItem(IMG_KEY);
  try {
    if (localStorage.hasOwnProperty(IMG_KEY)) {
      const parseImage = JSON.parse(loadImage);
      images = parseImage;
      parseImage.forEach(paintImage);
    }
  } catch (error) {
    console.log("Item not found in local storage");
  }

})();