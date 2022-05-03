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
