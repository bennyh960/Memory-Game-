// get deck container element "#deck-container"
//? SpriteSheet : create deck obj {1:[coordX,coordY],2:[coordX,coordY], ....25:[coordX,coordY]} to the each img !! shaul and ravit
//? Img for each card : create deck obj {1:,2:, ....25:[coordX,coordY]} to the each img !! shaul and ravit
// get from user "level" easy , noemal , hard (4X3,4X4,4X5) >>> 12,16,20
// append even num of elements to it with data attribute and coressponding classes

const levelObj = {
  easy: 12,
  normal: 16,
  hard: 20,
  ninja: 30,
};

export const deckObj = {
  1: "../images/1.png",
  2: "../images/2.png",
  3: "../images/3.png",
  4: "../images/4.png",
  5: "../images/5.png",
  6: "../images/6.png",
  7: "../images/7.png",
  8: "../images/8.png",
  9: "../images/9.png",
  10: "../images/10.png",
  11: "../images/11.png",
  12: "../images/12.png",
  13: "../images/13.png",
  14: "../images/14.png",
  15: "../images/15.png",
  16: "../images/16.png",
  17: "../images/17.png",
  18: "../images/18.png",
  19: "../images/19.png",
  20: "../images/20.png",
  21: "../images/21.png",
  22: "../images/22.png",
  23: "../images/23.png",
  24: "../images/24.png",
};

function sliceArrayToLevelAndDoube(level, arr) {
  const deckLengh = levelObj[level] / 2;
  return [...arr.slice(0, deckLengh), ...arr.slice(0, deckLengh)];
}

function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    // console.log(j, array);
  }
}
// const deckContainerElement = document.getElementById("deck-container");

function creatElementOnGameBoard(deckArr, deckContainerElement) {
  // const x = document.querySelector("#deck-container");
  for (let img of deckArr) {
    const card = document.createElement("div");
    card.style.backgroundImage = `url(${deckObj[img]})`;
    // console.log(deckContainerElement);
    deckContainerElement.appendChild(card);
  }
}

// new game start
export function createGameBoard(deckContainerElement, level) {
  const arrOfdeck = Object.keys(deckObj);

  shuffleArray(arrOfdeck);
  const newArrOfDeck = sliceArrayToLevelAndDoube(level, arrOfdeck);
  shuffleArray(newArrOfDeck);
  creatElementOnGameBoard(newArrOfDeck, deckContainerElement);
}
