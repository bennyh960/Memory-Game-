const bg = {
  bgNum: 0,
};

export function changeBG() {
  //   const arr = ["black", "white"];
  const arr = ["bg1.jpg", "bg5.jpg", "bg2.jpg"];
  if (arr[bg.bgNum]) {
    document.querySelector(".container").style.background = `url(../images/bg/${arr[bg.bgNum]}) center center /cover`;
  }
  bg.bgNum++;
  if (bg.bgNum > arr.length) {
    bg.bgNum = 0;
  }
}

// document.querySelector(".change-bg").addEventListener("click", changeBG(data.bg_num));
