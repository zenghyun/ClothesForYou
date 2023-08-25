import { clothesTemperature, clothesRoute } from "./clothesLists.mjs";

function getClothesByTemperature(num, i) {
  let closet = [
    {
      clothes: {
        outerRandom: Math.floor(
          Math.random() * clothesRoute[num].clothes.outer.length
        ),
        topRandom: Math.floor(
          Math.random() * clothesRoute[num].clothes.top.length
        ),
        pantsRandom: Math.floor(
          Math.random() * clothesRoute[num].clothes.pants.length
        ),
        socksRandom: Math.floor(
          Math.random() * clothesRoute[num].clothes.socks.length
        ),
        accRandom: Math.floor(
          Math.random() * clothesRoute[num].clothes.acc.length
        ),
      },
    },
  ];

  // get clothes
  document.querySelector(
    `.by-temperature-outer${i}`
  ).style.backgroundImage = `${
    clothesRoute[num].clothes.outer[closet[0].clothes.outerRandom]
  }`;
  document.querySelector(`.by-temperature-top${i}`).style.backgroundImage = `${
    clothesRoute[num].clothes.top[closet[0].clothes.topRandom]
  }`;
  document.querySelector(
    `.by-temperature-pants${i}`
  ).style.backgroundImage = `${
    clothesRoute[num].clothes.pants[closet[0].clothes.pantsRandom]
  }`;
  document.querySelector(
    `.by-temperature-socks${i}`
  ).style.backgroundImage = `${
    clothesRoute[num].clothes.socks[closet[0].clothes.socksRandom]
  }`;
  document.querySelector(`.by-temperature-acc${i}`).style.backgroundImage = `${
    clothesRoute[num].clothes.acc[closet[0].clothes.accRandom]
  }`;

  // get clothes tags
  document.querySelector(`.by-temperature-outer-tag${i}`).textContent = `${
    clothesRoute[num].clothesName.outer[closet[0].clothes.outerRandom]
  }`;
  document.querySelector(`.by-temperature-top-tag${i}`).textContent = `${
    clothesRoute[num].clothesName.top[closet[0].clothes.topRandom]
  }`;
  document.querySelector(`.by-temperature-pants-tag${i}`).textContent = `${
    clothesRoute[num].clothesName.pants[closet[0].clothes.pantsRandom]
  }`;
  document.querySelector(`.by-temperature-socks-tag${i}`).textContent = `${
    clothesRoute[num].clothesName.socks[closet[0].clothes.socksRandom]
  }`;
  document.querySelector(`.by-temperature-acc-tag${i}`).textContent = `${
    clothesRoute[num].clothesName.acc[closet[0].clothes.accRandom]
  }`;
}

function removeOuter(i) {
  if (window.innerWidth < 420) {
    document.querySelector(
      `.by-temperature-clothes-list${i}`
    ).style.marginLeft = "-40px";
  }
  document.querySelector(`.by-temperature-outer${i}`).style.width = "0px";
}

export const getClothes = (i, maxTemp, minTemp) => {
  const TEMP_LENGTH = clothesTemperature.length;
  let avgTemp = Math.round((maxTemp[i - 1] + minTemp[i - 1]) / 2);
  let selectedTemperatureIndex = -1;

  for (let j = TEMP_LENGTH - 1; j >= TEMP_LENGTH - 8; j--) {
    if (avgTemp < clothesTemperature[j].temperature) {
      selectedTemperatureIndex = j;
      break;
    }
  }

  if (selectedTemperatureIndex !== -1) {
    getClothesByTemperature(selectedTemperatureIndex, i);

    if (selectedTemperatureIndex <= TEMP_LENGTH - 7) {
      removeOuter(i);
    }
  }
};
