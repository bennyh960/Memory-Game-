import { getElpassedTime } from "./timer.js";
import { createGameBoard } from "./decks.js";
import { update } from "./gameLogic.js";
import { updateBoard, verifyUserName } from "./popMassage.js";
import { changeBG } from "./changeBg.js";
import { chooseNumOfPlayers } from "./multyplayer.js";

const startGame = document.querySelectorAll(".startGame");
const deckContainerElement = document.getElementById("deck-container");
const topUser = document.getElementById("topUser"); //.textContent;
const topScore = document.getElementById("topScore");
const time = document.getElementById("timer");
const numOfPlayers = document.querySelector("#players");
// let num = 0;

updateBoard(topScore, topUser);
let timer;

document.addEventListener("mouseover", () => {
  verifyUserName();
});

document.querySelector(".change-bg").addEventListener("click", changeBG);

//mute btn //!not working yet
const muteBtn = document.querySelector(".audioMute");
const audio = document.querySelector(".audio");
muteBtn.addEventListener("click", () => {
  if (audio.mute == false) {
    document.querySelector(".audioMute").style.backgroundPosition = "0";
    audio.mute = true;
    // document.querySelector("#clickSound").mute = true;
  } else {
    document.querySelector(".audioMute").style.backgroundPosition = "-2.4rem";
    audio.mute = false;
  }
});

startGame.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Check if game completeed and reset time each new-game
    (endGame2() || endGame3(e)) && clearInterval(timer);
    time.style.color = "black";
    document.querySelector(".popUp").style.display = "none";

    // console.log(document.getElementById("name").value);

    const startTime = new Date().getTime();
    timer = setInterval(() => {
      getElpassedTime("#timer", startTime);
    }, 1000);

    //remove all cards element
    document.querySelector("#deck-container").innerHTML = "";
    //draw game
    createGameBoard(deckContainerElement);
    //game logic
    deckContainerElement.addEventListener("click", update);
    // deckArray.addEventListener("click", update);
  });
});

function endGame2() {
  return [...document.querySelectorAll(".back-card")].every((card) => {
    return card.getAttribute("idCard") === "paired";
  });
}

function endGame3(e) {
  if (e.target.getAttribute("id") === "restart") {
    document.getElementById("moves").textContent = 0;
    document.getElementById("wrongMoves").textContent = 0;
    document.getElementById("score").textContent = 0;
    document.getElementById("timer").textContent = 0;
    return true;
  }
  return false;
}

//================================
//

numOfPlayers.addEventListener("click", (e) => {
  chooseNumOfPlayers();
});
