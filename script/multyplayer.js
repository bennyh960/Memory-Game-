import { startTimer } from "./timer.js";
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

export function updatePlayer(turn, isTrueGuess) {
  startTimer();

  // if (isTrueGuess) {
  //   multyObj.changeDir = 1;
  // }
  turn = parseInt(turn / 2); //turn 0 = 1 due to parseint
  // console.log(turn);

  if (turn % 2 === 1 - multyObj.changeDir) {
    multyplayer.lastChild.previousElementSibling.animate(animatorObj.anim7, animatorObj.time2);
    console.log("player 1 turn", isTrueGuess);
    if (isTrueGuess) multyObj.p1s += 15;
  } else if (turn % 2 === 0 + multyObj.changeDir) {
    console.log("player 2 turn", isTrueGuess);

    multyplayer.lastChild.previousElementSibling.previousElementSibling.previousElementSibling.animate(
      animatorObj.anim7,
      animatorObj.time2
    );
    if (isTrueGuess) multyObj.p2 += 15;
  }

  if (isTrueGuess) {
    multyObj.changeDir = 0;
  }
  // }
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
