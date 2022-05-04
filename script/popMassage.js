export function CheckHighScore() {
  const userName = document.getElementById("name"); //.value;
  const score = document.getElementById("score"); //.textContent;
  const topUser = document.getElementById("topUser"); //.textContent;
  const topScore = document.getElementById("topScore"); //.textContent;
  const time = document.getElementById("timer");
  const testTop = parseInt(localStorage.getItem("TopScore"));

  //update current score on display pop up window
  const lastScore = document.getElementById("lastScore");
  // const NameToShow = userName.value ? userName.value !== "" : "Your";
  lastScore.textContent = `${NamuserName.valueeToShow} Last Score: ${score.textContent} points in ${calcTime(
    time
  )} seconds.`;

  //   console.log(testTop);
  if (parseInt(score.textContent) > testTop) {
    const topScoreToBrowswer = score.textContent;
    const topUserToBrowswer = userName.value;
    localStorage.clear();
    storeTopVariable(topScoreToBrowswer, topUserToBrowswer);
    updateBoard(topScore, topUser);

    console.log(
      "should store ",
      topScoreToBrowswer,
      "as top score due to ",
      score.textContent,
      "is higher then",
      localStorage.getItem("TopScore")
    );
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
