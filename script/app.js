import { getElpassedTime } from "./timer.js";
import { deckObj, createGameBoard } from "./decks.js";

const deckContainerElement = document.getElementById("deck-container");
const movesInGame = document.getElementById("moves");
const wrongMoves = document.getElementById("wrongMoves");
const gameScore = document.getElementById("score");

//////////
const animation1 = [{ transform: "rotateX(0)" }, { transform: "rotateX(360deg)" }];
const animation2 = [{ background: "blue" }, { background: "" }];

const animationtime = {
  duration: 2000,
  iterations: 1,
};

// start timer when window load //todo edit it while stat game pressed
const timer = setInterval(() => {
  getElpassedTime("#timer");
}, 1000);

// store game data and functions
const data = {
  moves: 0,
  wrongMoves: 0,
  correctMoves: 0,
  score: 0,
  time: "time",
  visibleCardsTemp: [],
  delayClicking: false,
  firstCard: "",
  secondCard: "",
  remmberForError: "",
};

// reload every new game
createGameBoard(deckContainerElement, "easy");

// game logic
deckContainerElement.addEventListener("click", update);

// Run on event listner
function update(e) {
  //prevent from data window to flip due to the father is not define in this function so it can be the grandfather container also
  if (e.target.parentElement.getAttribute("class") === "container-card") {
    // data.updateData(e);
    // console.log(e.target .parentElement);
    flipCard(e);
    data.testData(e);
    // console.log(data.firstCard, data.secondCard);
    data.updateDataWindow(movesInGame, wrongMoves, gameScore);
    // data.resetChosenCards();
  }
}

// todo delete
data.addWrongMoves = function () {
  this.wrongMoves += 1;
};
// todo delete
data.updateDataWindow = function (movesInGame, wrongMoves, gameScore) {
  this.moves += 1;
  movesInGame.textContent = this.moves;
  wrongMoves.textContent = this.wrongMoves;
  gameScore.textContent = Math.max(0, this.score);
};

//todo delete
data.updateScore = function () {
  if (
    this.visibleCardsTemp[0] &&
    this.visibleCardsTemp[1] &&
    this.visibleCardsTemp[0].getAttribute("idCard") === this.visibleCardsTemp[1].getAttribute("idCard") &&
    this.visibleCardsTemp[0].getAttribute("id") !== this.visibleCardsTemp[1].getAttribute("id")
  ) {
    this.score += 15 - this.wrongMoves; // todo makeCardTransperent(); //with animation ,card cant be clickable
    this.visibleCardsTemp.forEach((element) => {
      // console.log(element);
      element.classList.remove("front-card");
      // console.log(element);

      // console.log(this.visibleCardsTemp[0].getAttribute("idCard"));
    });
  } else {
    this.addWrongMoves();
    // todo flipCardOver();
    this.visibleCardsTemp[0].parentElement.style.transform = "rotateY(360deg)";
  }
};
//todo delete
data.updateData = function (event) {
  if (this.visibleCardsTemp.length < 2) {
    this.visibleCardsTemp.push(event.target.parentElement.lastChild);
  } else {
    this.delayClicking = true;
    while (this.visibleCardsTemp.length !== 0) {
      this.updateScore();
      this.visibleCardsTemp.shift();
    }
  }
  flipCard(event);
  // if (this.delayClicking) {
  //   delayFlip(event);
  // } else {
  //   flipCard(event);
  // }
  //}
};

data.testData = function (e) {
  this.setChosenCards(e);
  if (this.isPair(e)) {
    this.score += 15 - this.wrongMoves;
  } else if (e.target.parentElement.lastChild.getAttribute("idCard") !== "paired") {
    this.wrongMoves += 1;
  } else {
    this.moves -= 1;
  }
};

// Choose clicked card
data.setChosenCards = function (event) {
  if (event.target.parentElement.lastChild.getAttribute("idCard") === "paired") return;
  if (this.moves % 2 === 0) {
    this.firstCard = event.target.parentElement.lastChild;
  }
  if (this.moves % 2 === 1) {
    this.secondCard = event.target.parentElement.lastChild;
  }
};

data.resetChosenCards = function () {
  if (this.firstCard && this.secondCard) {
    this.firstCard = null;
    this.secondCard = null;
  }
};

function flipCard(e) {
  if (e.target.parentElement.lastChild.getAttribute("idCard") !== "paired")
    e.target.parentElement.style.transform = "rotateY(180deg)";
}

data.flipAgain = function (e) {
  try {
    if (e.target.parentElement.lastChild.getAttribute("idCard") !== "paired") {
      this.firstCard.parentElement.style.transform = "rotateY(360deg)";
      this.secondCard.parentElement.style.transform = "rotateY(360deg)";
      // this.remmberForError.push(this.firstCard.parentElement);
      // this.remmberForError.push(this.secondCard.parentElement);
    }
  } catch (error) {
    this.remmberForError = e.target.parentElement;
    console.log("Error: Its realy hard to cancle event listner on child when it activated from father container");
  } finally {
    console.log(this.remmberForError);
    // this.remmberForError.style.transform = "rotateY(720deg)";
    // this.remmberForError[this.remmberForError.length - 2].style.transform = "rotateY(720deg)";
    // console.log(this.firstCard.parentElement);
    // this.remmberForError.pop().style.transform = "rotateY(0deg)";
  }
};

// pair test function return true/false
data.isPair = function (e) {
  // e.stopPropagation();
  // console.log(e.target.parentElement.lastChild.getAttribute("idCard"));
  if (this.firstCard && this.secondCard) {
    const tempThis = this;
    setTimeout(() => {
      this.delayClicking ? (this.delayClicking = false) : this.flipAgain(e);
      this.resetChosenCards();
    }, 1000);

    if (
      this.firstCard.getAttribute("idCard") === this.secondCard.getAttribute("idCard") &&
      this.firstCard.getAttribute("id") !== this.secondCard.getAttribute("id")
    ) {
      this.firstCard.setAttribute("idCard", "paired");
      this.secondCard.setAttribute("idCard", "paired");
      this.firstCard.animate(animation1, animationtime);
      this.secondCard.animate(animation1, animationtime);
      this.firstCard.classList.remove("front-card");
      this.secondCard.classList.remove("front-card");
      this.score += 15 - this.wrongMoves;
      this.delayClicking = true;
      return true;
    }
  }

  return false;
};
