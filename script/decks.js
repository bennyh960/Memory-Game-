import { animatorObj } from "./animation.js";
const levelObj = {
  kids: 6,
  easy: 12,
  normal: 16,
  hard: 20,
  master: 24,
};

export const deckObj = {
  1: { url: "../images/24.png", attribute: 24 },
  2: { url: "../images/2.png", attribute: 2 },
  3: { url: "../images/3.png", attribute: 3 },
  4: { url: "../images/4.png", attribute: 4 },
  5: { url: "../images/5.png", attribute: 5 },
  6: { url: "../images/6.png", attribute: 6 },
  7: { url: "../images/7.png", attribute: 7 },
  8: { url: "../images/8.png", attribute: 8 },
  9: { url: "../images/9.png", attribute: 9 },
  10: { url: "../images/10.png", attribute: 10 },
  11: { url: "../images/11.png", attribute: 11 },
  12: { url: "../images/12.png", attribute: 12 },
  13: { url: "../images/13.png", attribute: 13 },
  14: { url: "../images/14.png", attribute: 14 },
  15: { url: "../images/15.png", attribute: 15 },
  16: { url: "../images/16.png", attribute: 16 },
  17: { url: "../images/17.png", attribute: 17 },
  18: { url: "../images/18.png", attribute: 18 },
  19: { url: "../images/19.png", attribute: 19 },
  20: { url: "../images/20.png", attribute: 20 },
  21: { url: "../images/21.png", attribute: 21 },
  22: { url: "../images/22.png", attribute: 22 },
  23: { url: "../images/23.png", attribute: 23 },
  //   24: "../images/24.png",
};

function sliceArrayToLevelAndDoube(level, arr) {
  const deckLengh = levelObj[level] / 2;
  return [...arr.slice(0, deckLengh), ...arr.slice(0, deckLengh)];
}

function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// DOM : create card divs into card contianer
function creatElementOnGameBoard(deckArr, deckContainerElement) {
  for (let idx of deckArr) {
    const flipcardConainer = document.createElement("div");
    const cardConainer = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");
    flipcardConainer.classList.add("flip-card-container-one-card");
    deckContainerElement.appendChild(flipcardConainer);
    cardConainer.classList.add("container-card");
    flipcardConainer.appendChild(cardConainer);
    cardFront.classList.add("front-card");
    cardBack.classList.add("back-card");
    cardConainer.appendChild(cardFront);
    cardBack.style.backgroundImage = `url(${deckObj[idx].url})`;
    cardBack.setAttribute("idCard", deckObj[idx].attribute);
    cardConainer.appendChild(cardBack);
    const animation = [
      animatorObj.anim1,
      animatorObj.anim2,
      animatorObj.anim3,
      animatorObj.anim4,
      animatorObj.anim5,
      animatorObj.anim6,
    ];
    const randomIdx = Math.floor(Math.random() * animation.length);
    cardFront.animate(animation[randomIdx], animatorObj.time);
    // cardBack.animate(animatorObj.anim6, animatorObj.time);
  }
}

// create different id for each card
function uniqeID() {
  const backCardsArray = [...document.querySelectorAll(".back-card")];
  backCardsArray.forEach((card, idx) => {
    card.setAttribute("id", idx);
  });
}

// Change container class in order to store different amount of cards by game - level
function addContainerToClassByLevel(deckContainerElement, level) {
  if (levelObj[level] === 12) {
    deckContainerElement.classList.add("easy-lvl");
  } else if (levelObj[level] === 16) {
    deckContainerElement.classList.add("normal-lvl");
  } else if (levelObj[level] === 20) {
    deckContainerElement.classList.add("hard-lvl");
  } else if (levelObj[level] === 24) {
    deckContainerElement.classList.add("master-lvl");
  } else deckContainerElement.classList.add("proggramer-lvl"); //kids level
}

// Draw random cards when game start
export function createGameBoard(deckContainerElement) {
  const levelButton = document.querySelector("#level");
  const level = levelButton.options[levelButton.selectedIndex].value;
  // const level = "proggramer";
  console.log(level);
  // ! need to update this level to gamer levels

  const arrOfdeck = Object.keys(deckObj);
  addContainerToClassByLevel(deckContainerElement, level);
  shuffleArray(arrOfdeck);
  const newArrOfDeck = sliceArrayToLevelAndDoube(level, arrOfdeck);

  shuffleArray(newArrOfDeck);
  creatElementOnGameBoard(newArrOfDeck, deckContainerElement);
  uniqeID();
}
