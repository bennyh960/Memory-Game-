import { animatorObj } from "./animation.js";
import { CheckHighScore } from "./popMassage.js";
import { updatePlayer } from "./multyplayer.js";
import { changeBG } from "./changeBg.js";

// updating html variable
const movesInGame = document.getElementById("moves");
const wrongMoves = document.getElementById("wrongMoves");
const gameScore = document.getElementById("score");
const totalTime = document.getElementById("timer");
const clickSound = document.getElementById("clickSound");
const pairedSound = document.getElementById("pairedSound");
const finishGame = document.getElementById("finishSound");
// const audio = document.getElementsByClassName("audio");

// store game data and functions
export const data = {
  moves: 0,
  wrongMoves: 0,
  score: 0,
  time: "",
  delayClicking: false,
  firstCard: undefined,
  secondCard: undefined,
  isTrueGuess: false,
  bg_num: 0,
};

// =========================================================================================================================
// Run on container event listner
// =========================================================================================================================

export function update(e) {
  //prevent from data window to flip due to the father is not define in this function so it can be the grandfather container also
  if (
    e.target.parentElement.getAttribute("class") === "container-card" &&
    (data.firstCard === undefined || data.secondCard === undefined)
  ) {
    flipCard(e);
    data.testData(e);
    data.updateDataWindow(movesInGame, wrongMoves, gameScore);
    isGameComplete() && CheckHighScore();
    //todo del next line
    // console.log("Its true guess:", data.isTrueGuess);
  }
}
// =========================================================================================================================

// =========================================================================================================================

// update html data variable and moves
data.updateDataWindow = function (movesInGame, wrongMoves, gameScore) {
  this.moves += 1;
  // this.moves2 += 1;
  movesInGame.textContent = parseInt(this.moves / 2);
  wrongMoves.textContent = this.wrongMoves;
  gameScore.textContent = Math.max(0, this.score);
};

//Call 2 function and analyse data and update score
data.testData = function (e) {
  this.setChosenCards(e);
  if (this.isPair(e)) {
    this.score += 15 - (this.wrongMoves % 9);
  } else if (e.target.parentElement.lastChild.getAttribute("idCard") !== "paired") {
    this.moves % 2 === 1 ? (this.wrongMoves += 1) && (this.isTrueGuess = false) : "";
  } else {
    this.moves -= 1;
  }
};

// Choose clicked card (CSS : back-card class)
data.setChosenCards = function (event) {
  if (event.target.parentElement.lastChild.getAttribute("idCard") === "paired") return;
  if (this.moves % 2 === 0) {
    this.firstCard = event.target.parentElement.lastChild;
  }
  if (this.moves % 2 === 1) {
    this.secondCard = event.target.parentElement.lastChild;
  }
};

//flip card
function flipCard(e) {
  const card = e.target.parentElement.lastChild;
  clickSound.play();
  if (card.getAttribute("idCard") !== "paired") e.target.parentElement.style.transform = "rotateY(180deg)";
}

//Reset card element to null - Activate with delay of 1 sec
data.resetChosenCards = function () {
  if (this.firstCard && this.secondCard) {
    this.firstCard = undefined;
    this.secondCard = undefined;
  }
};

// Flip again if isPair false  - Activate with delay of 1 sec
data.flipAgain = function (e) {
  try {
    if (e.target.parentElement.lastChild.getAttribute("idCard") !== "paired") {
      this.firstCard.parentElement.style.transform = "rotateY(360deg)";
      this.secondCard.parentElement.style.transform = "rotateY(360deg)";
    }
  } catch (error) {
    console.log("Error: this error has solved already");
  } finally {
  }
};

// check pair cards
data.isPair = function (e) {
  if (this.firstCard && this.secondCard) {
    setTimeout(() => {
      this.delayClicking ? (this.delayClicking = false) : this.flipAgain(e);
      this.resetChosenCards();
      updatePlayer(data.moves, data.isTrueGuess); //for 2 players
    }, 1000);

    if (
      this.firstCard.getAttribute("idCard") === this.secondCard.getAttribute("idCard") &&
      this.firstCard.getAttribute("id") !== this.secondCard.getAttribute("id")
    ) {
      setAttrAndAnimate(this.firstCard, this.secondCard);
      this.score += 15 - this.wrongMoves;
      this.delayClicking = true;
      this.isTrueGuess = true;
      pairedSound.play();
      return true;
    }
  }

  return false;
};
// setAttrAndAnimate for paired cards
function setAttrAndAnimate(cardA, cardB) {
  const animation = [animatorObj.anim1, animatorObj.anim2, animatorObj.anim3, animatorObj.anim4];
  const randomIdx = Math.floor(Math.random() * animation.length);
  [cardA, cardB].forEach((card) => {
    card.setAttribute("idCard", "paired");

    card.animate(animation[randomIdx], animatorObj.time);
    card.classList.remove("front-card");
  });
}

data.reset = function (timeEl) {
  this.moves = 0;
  this.wrongMoves = 0;
  this.time = timeEl.textContent;
  // console.log(this.time, this.score);
  this.score = 0;
};

//==========================================================================================
export function isGameComplete() {
  const popWindow = document.querySelector(".popUp");
  popWindow.style.display = "none";
  const isEndGame = [...document.querySelectorAll(".back-card")].every((card) => {
    return card.getAttribute("idCard") === "paired";
  });

  if (isEndGame) {
    finishGame.play();
    popWindow.style.display = "flex";
    document.querySelector("#timer").style.display = "none";
    document.getElementById("startNewGame").textContent = "Play Again";
    data.reset(totalTime);
    console.log("game finished");
    return true;
  }
  console.log("game is not finished");
  return false;
}
