import { timer1, timer2 } from "./timer.js";
import { animatorObj } from "./animation.js";

const timerPos = document.getElementById("stoper");
const p1score = document.getElementById("p1Score");
const p2score = document.getElementById("p2Score");
//section : choose num of player variables
const numOfPlayers = document.querySelector("#players");
const singlePlayer = document.querySelector(".singlePlayer");
const multyplayer = document.querySelector(".multyplayer");
const userName2 = document.getElementById("player2Name");

// todo : work on timer for each player
// startTimer();

const multyObj = {
  changeDir: 0,
  p1s: 0,
  p2s: 0,
};

//this function invoked when ispair interval work
export function updatePlayer(turn, isTrueGuess) {
  turn = parseInt(turn / 2); //turn 0 = 1 due to parseint
  if (turn % 2 === 1) {
    if (isTrueGuess) multyObj.p1s += 15;
    // multyplayer.lastChild.previousElementSibling.animate(animatorObj.anim7, animatorObj.time2);
    clearInterval(timer2);
    timer1;
    multyplayer.lastChild.previousElementSibling.style.border = "3px solid green";
    multyplayer.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.style.border =
      "3px solid transparent";
    // console.log("player 1 turn", isTrueGuess);
    // startTimer(true);
  } else if (turn % 2 === 0) {
    if (isTrueGuess) multyObj.p2s += 15;
    multyplayer.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.style.border =
      "3px solid green";
    // startTimer(true);
    clearInterval(timer1);
    timer2;
    //p1
    multyplayer.lastChild.previousElementSibling.style.border = "3px solid transparent";
    // multyplayer.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.animate(
    //   animatorObj.anim7,
    //   animatorObj.time2
    // );
    // console.log("player 2 turn", isTrueGuess);
  }

  const isEndGame = [...document.querySelectorAll(".back-card")].every((card) => {
    return card.getAttribute("idCard") === "paired";
  });

  if (isEndGame) {
    multyObj.p1s = 0;
    multyObj.p2s = 0;
  }

  p1score.textContent = multyObj.p1s;
  p2score.textContent = multyObj.p2s;
}

export function chooseNumOfPlayers() {
  if (numOfPlayers.value === "two") {
    // multyplayer.style.color = "black";
    singlePlayer.style.display = "none";
    multyplayer.style.display = "flex";
    userName2.style.display = "inline";
    document.querySelector("#p1Name").textContent = document.getElementById("name").value;
    document.querySelector("#p2Name").textContent = document.getElementById("name2").value;
    // multyplayer.lastChild.previousElementSibling.animate(animatorObj.anim7, animatorObj.time2);
    // multyplayer.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.animate(
    // animatorObj.anim7,
    // animatorObj.time2
    // );
  } else {
    singlePlayer.style.display = "flex";
    multyplayer.style.display = "none";
    userName2.style.display = "none";
  }
}
