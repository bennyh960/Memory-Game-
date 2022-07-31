export function CheckHighScore() {
  const userName = document.getElementById("name"); //.value;
  const userName2 = document.getElementById("name2"); //.value;
  const score = document.getElementById("score"); //.textContent;
  const topUser = document.getElementById("topUser"); //.textContent;
  const topScore = document.getElementById("topScore"); //.textContent;
  const time = document.getElementById("timer");
  const testTop = parseInt(localStorage.getItem("TopScore"));

  //update current score on display pop up window
  const lastScore = document.getElementById("lastScore");
  // const NameToShow = userName.value ? userName.value !== "" : "Your";
  if (document.querySelector("#players").value === "one")
    lastScore.textContent = `${userName.value} Last Score: ${score.textContent} points in ${calcTime(time)} seconds.`;
  else {
    const p1Score = parseInt(document.getElementById("p1Score").textContent);
    const p2Score = parseInt(document.getElementById("p2Score").textContent);
    if (p1Score > p2Score) {
      lastScore.textContent = `${userName.value} is the winner! `;
    } else if (p1Score < p2Score) {
      lastScore.textContent = `${userName2.value} is the winner! `;
    } else {
      lastScore.textContent = `Its a draw! `;
    }
  }
  time.style.color = "transparent";

  if (parseInt(score.textContent) > testTop) {
    const topScoreToBrowswer = score.textContent;
    const topUserToBrowswer = userName.value;
    localStorage.clear();
    storeTopVariable(topScoreToBrowswer, topUserToBrowswer);
    updateBoard(topScore, topUser);
  }
}



function storeTopVariable(str1, str2) {
  localStorage.setItem("TopScore", str1);
  localStorage.setItem("TopUser", str2);
}

export function updateBoard(topScore, topUser) {
  topScore.textContent = "Top Score : " + localStorage.getItem("TopScore") + " points";
  topUser.textContent = "Top User  : " + localStorage.getItem("TopUser");
}

function calcTime(timeElement) {
  const calculatedTime = timeElement.textContent.split(":");

  if (calculatedTime.length > 1) return parseInt(calculatedTime[0]) * 60 + parseInt(calculatedTime[1]);
  return parseInt(calculatedTime[0]);
}

// disable/enable btn
export function verifyUserName() {
  if (document.querySelector("#name").value === "") {
    document.querySelector("#startNewGame").disabled = true;
    document.querySelector("#startNewGame").classList.toggle("verifyUserName");
  } else {
    document.querySelector("#startNewGame").disabled = false;
    document.querySelector("#startNewGame").classList.toggle("verifyUserName");
  }
}
