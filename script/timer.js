// const startTime = new Date().getTime();

// big function with gameOver
export function getElpassedTime(timeElementStr, startTime) {
  const timeElement = document.querySelector(timeElementStr);
  timeElement.style.display = "inline";
  const now = new Date().getTime();
  const dis = now - startTime;

  const sec = Math.floor((dis / 1000) % 60);
  const min = Math.floor(dis / (1000 * 60));

  timeElement.textContent = `${min > 0 ? min : ""} ${min > 0 ? " : " : ""}${sec}`;
  timeElement.style.width = "fit-content";
}
// big function with gameOver
function getElpassedTime2(timeElementStr, maxTime) {
  const timeElement = document.querySelector(timeElementStr);
  const now = new Date().getTime();
  const dis = now - x;

  const sec = Math.floor((dis / 1000) % 60);
  const min = Math.floor(dis / (1000 * 60));

  timeElement.textContent = `Time Passed :  ${min > 0 ? min : ""} ${min > 0 ? " : " : ""}${sec}`;
  timeElement.style.width = "fit-content";
  let isGameOver = false;
  //alert user before gameover
  if (maxTime - min === 1) {
    if (sec % 2 === 0) timeElement.style.backgroundColor = "red";
    else timeElement.style.backgroundColor = "";
  } else if (min >= maxTime) {
    isGameOver = true;
    timeElement.textContent = "Time passed!";
  }
  return isGameOver;
}

// ===============================================
// countdown timer svg
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 7;
const ALERT_THRESHOLD = 3;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 1;

0;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("stoper").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
</div>
`;

// startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

export function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
    document.getElementById("base-timer-path-remaining").classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document.getElementById("base-timer-path-remaining").classList.remove(info.color);
    document.getElementById("base-timer-path-remaining").classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
  document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
}
