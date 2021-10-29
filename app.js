const scoreDisplay = document.getElementById("score");
const winDisplay = document.getElementById("win");
const lostDisplay = document.getElementById("lost");
const gridDisplay = document.querySelector(".grid");
const bestScoreDisplay = document.getElementById("hightest-score");
const containerDisplay = document.getElementById("main-container");
bestScoreDisplay.innerHTML = localStorage.getItem("bestScore");

// create a play border
let squares = [];
let switchRight = true;
let switchLeft = true;
let switchUp = true;
let switchDown = true;
let score = 0;

function rotateSquare() {
  let firstIndex = 0;

  firstIndex = 3;

  let values = [];
  for (let i = 0; i < 16; i++) {
    values[i] = squares[i].innerHTML;
  }

  for (let i = 0; i < 4; i++, firstIndex += 4) {
    squares[i].innerHTML = values[firstIndex];
    squares[i + 4].innerHTML = values[firstIndex - 1];
    squares[i + 8].innerHTML = values[firstIndex - 2];
    squares[i + 12].innerHTML = values[firstIndex - 3];
  }
}

function resetSquare() {
  let firstIndex = 0;

  firstIndex = 3;
  let values = [];
  for (let i = 0; i < 16; i++) {
    values[i] = squares[i].innerHTML;
  }
  for (let i = 0; i < 4; i++, firstIndex += 4) {
    squares[firstIndex].innerHTML = values[i];
    squares[firstIndex - 1].innerHTML = values[i + 4];
    squares[firstIndex - 2].innerHTML = values[i + 8];
    squares[firstIndex - 3].innerHTML = values[i + 12];
  }
}
function rotateSquare2(arrayNeedToBeRotate) {
  let temperaryArray = [...arrayNeedToBeRotate];
  for (let i = 0, firstIndex = 3; i < 4; i++, firstIndex += 4) {
    arrayNeedToBeRotate[firstIndex] = temperaryArray[i];
    arrayNeedToBeRotate[firstIndex - 1] = temperaryArray[i + 4];
    arrayNeedToBeRotate[firstIndex - 2] = temperaryArray[i + 8];
    arrayNeedToBeRotate[firstIndex - 3] = temperaryArray[i + 12];
  }
  return arrayNeedToBeRotate;
}

function createBorder() {
  for (let i = 0; i < 16; i++) {
    let square;
    let squareParent;
    squareParent = document.createElement("div");
    squareParent.setAttribute("id", "grid-item");
    square = document.createElement("div");
    // square.innerHTML = 0;
    square.setAttribute("id", "num");
    squareParent.appendChild(square);
    gridDisplay.appendChild(squareParent);
    squares.push(square);
    squareParents.push(squareParent);
  }

  generateNum();
  generateNum();
  generateColor();
}
createBorder();

// generate color
function generateColor() {
  for (let i = 0; i < 16; i++) {
    if (squares[i].innerHTML == 2048) {
      squares[i].style.backgroundColor = "#063970";
    } else if (squares[i].innerHTML == 1024) {
      squares[i].style.backgroundColor = "#1e81b0";
    } else if (squares[i].innerHTML == 512) {
      squares[i].style.backgroundColor = "#e28743";
    } else if (squares[i].innerHTML == 256) {
      squares[i].style.backgroundColor = "#825f7a";
    } else if (squares[i].innerHTML == 128) {
      squares[i].style.backgroundColor = "#ab8724";
    } else if (squares[i].innerHTML == 64) {
      squares[i].style.backgroundColor = "#154c79";
    } else if (squares[i].innerHTML == 32) {
      squares[i].style.backgroundColor = "#873e23";
    } else if (squares[i].innerHTML == 16) {
      squares[i].style.backgroundColor = "#76b5c5";
    } else if (squares[i].innerHTML == 8) {
      squares[i].style.backgroundColor = "#1979a9";
    } else if (squares[i].innerHTML == 4) {
      squares[i].style.backgroundColor = "#717f5d";
    } else if (squares[i].innerHTML == 2) {
      squares[i].style.backgroundColor = "#cce7e8";
    } else {
      squares[i].style.backgroundColor = "#D2d7e2";
      //   squares[i].style.color = "transparent";
    }
  }
}
// generate a random num
function generateNum() {
  let randomNum = Math.floor(Math.random() * 16);
  if (squares[randomNum].innerHTML === "") {
    squares[randomNum].innerHTML = 2;
  } else generateNum();
}
//   restart the game

document.getElementById("reset").addEventListener("click", function reStart() {
  for (let i = 0; i < 16; i++) {
    squares[i].innerHTML = "";
  }
  score = 0;
  scoreDisplay.innerHTML = score;
  containerDisplay.style.marginLeft = "auto";
  lostDisplay.style.display = "none";
  winDisplay.style.display = "none";
  switchRight = true;
  switchLeft = true;
  switchUp = true;
  switchDown = true;

  document.addEventListener("keyup", control);

  generateNum();
  generateNum();
  generateColor();
});
// document.querySelectorAll(".play").addEventListener("click", reStart);

// remove  annimation
function removeAnnimation() {
  setInterval(() => {
    for (let i = 0; i < 16; i++) {
      squares[i].style.animation = "";
    }
  }, 2000);
}
removeAnnimation();
// check the result
function chectResult() {
  let zeroNum = 0;
  for (let i = 0; i < 16; i++) {
    if (
      i < 15 &&
      squares[i].innerHTML === squares[i + 1].innerHTML &&
      (i + 1) % 4 != 0
    ) {
      return;
    }
    if (i < 11 && squares[i].innerHTML === squares[i + 4].innerHTML) {
      return;
    }
    if (squares[i].innerHTML == 2048) {
      containerDisplay.style.marginLeft = "9.5rem";
      winDisplay.style.display = "block";
      document.removeEventListener("keyup", control);
      let bestScore = localStorage.getItem("bestScore");
      if (!bestScore) {
        localStorage.setItem("bestScore", score);
      } else {
        if (score < bestScore) {
          localStorage.setItem("bestScore", score);
        }
      }
    }
    if (squares[i].innerHTML === "") {
      zeroNum++;
    }
  }
  if (zeroNum === 0) {
    containerDisplay.style.marginLeft = "9.5rem";
    lostDisplay.style.display = "block";
    document.removeEventListener("keyup", control);
  }
}

function swipe() {
  let isNeedToSwipe = false;
  let slideCount = [];
  for (let i = 0; i < 4; i++) {
    let columnOne = squares[i].innerHTML;
    let columnTwo = squares[i + 4].innerHTML;
    let columnThree = squares[i + 8].innerHTML;
    let columnFour = squares[i + 12].innerHTML;
    let column = [columnOne, columnTwo, columnThree, columnFour];

    for (let j = 1; j < 4; j++) {
      if (column[j] !== "" && column[j - 1] === "") {
        let columnWithSpace = column.slice(0, j);
        let countSpace = columnWithSpace.filter((item) => !item);
        slideCount.push(countSpace.length);
        // squares[
        //   j * 4 + i
        // ].style.animation = `move${direction}-${countSpace.length} 0.2s`;

        isNeedToSwipe = true;
        let numInColumn = column.filter((num) => num);
        let missing = 4 - numInColumn.length;
        let addZero = new Array(missing).fill("");
        let newColumn = numInColumn.concat(addZero);
        squares[i].innerHTML = newColumn[0];
        squares[i + 4].innerHTML = newColumn[1];
        squares[i + 8].innerHTML = newColumn[2];
        squares[i + 12].innerHTML = newColumn[3];
      } else {
        slideCount.push(0);
      }
    }
  }

  return { ifSwiped: isNeedToSwipe, slideCount };
}

function add() {
  let isNeedToSwitch = true;
  let animationChange = {};

  for (let i = 0; i < 12; i++) {
    if (
      squares[i].innerHTML === squares[i + 4].innerHTML &&
      squares[i].innerHTML !== ""
    ) {
      isNeedToSwitch = false;
      //   squares[i].style.animation = "changesize 0.5s";
      //   squares[i + 4].style.animation = `move${direction}-1 0.2s`;
      let total = parseInt(squares[i].innerHTML) * 2;
      squares[i].innerHTML = total;
      squares[i + 4].innerHTML = "";
      //   1 represent size change, 2 represent position change
      animationChange[i] = 1;
      animationChange[i + 4] = 2;
    }
  }

  if (isNeedToSwitch) {
    chectResult();
    return { ifAdded: false, animationChange };
  } else {
    swipe();
    return { ifAdded: true, animationChange };
  }
}
// control the swipe animation
function swipeAnimation(direction, slideCount) {
  let newSquare = [0, 0, 0, 0];
  let animationArray = [];
  for (let i = 4, j = 0; i < 8; i++, j += 3) {
    newSquare[i] = slideCount[j];
    newSquare[i + 4] = slideCount[j + 1];
    newSquare[i + 8] = slideCount[j + 2];
  }

  if (direction === "right") {
    animationArray = rotateSquare2(newSquare);
  }
  if (direction === "left") {
    animationArray = rotateSquare2(rotateSquare2(rotateSquare2(newSquare)));
  }
  if (direction === "down") {
    animationArray = rotateSquare2(rotateSquare2(newSquare));
  }
  if (direction === "up") {
    animationArray = newSquare;
  }
  for (let i = 0; i < 16; i++) {
    if (animationArray[i] !== 0) {
      squares[i].style.animation = `move${direction}-${animationArray[i]} 0.2s`;
    }
  }
}
// control the add animation
function addAnimation(direction, animationChange) {
  let newSquare2 = [];
  let animationArray = [];
  for (const item in animationChange) {
    for (let i = 0; i < 16; i++) {
      if (item == i) {
        newSquare2[i] = animationChange[item];
      }
      if (!newSquare2[i]) {
        newSquare2[i] = 0;
      }
    }
  }

  if (direction === "right") {
    animationArray = rotateSquare2(newSquare2);
  }
  if (direction === "left") {
    animationArray = rotateSquare2(rotateSquare2(rotateSquare2(newSquare2)));
  }
  if (direction === "down") {
    animationArray = rotateSquare2(rotateSquare2(newSquare2));
  }
  if (direction === "up") {
    animationArray = newSquare2;
  }
  for (let i = 0; i < 16; i++) {
    if (animationArray[i] === 1) {
      squares[i].style.animation = "changesize 0.5s";
    }
    if (animationArray[i] === 2) {
      squares[i].style.animation = `move${direction}-1 0.2s`;
    }
  }
}

//   assign keycodes
function control(e) {
  if (e.keyCode === 39) {
    keyRight();
  } else if (e.keyCode === 37) {
    keyLeft();
  } else if (e.keyCode === 38) {
    keyUp();
  } else if (e.keyCode === 40) {
    keyDown();
  }
}
// to the right
document.addEventListener("keyup", control);

function keyRight() {
  switchLeft = true;
  switchDown = true;
  switchUp = true;

  if (switchRight) {
    rotateSquare();
    let { ifSwiped, slideCount } = swipe();
    let { ifAdded, animationChange } = add();
    console.log(ifAdded, ifSwiped);
    resetSquare();

    // control the swipe animation
    swipeAnimation("right", slideCount);
    // contro the animation after added
    addAnimation("right", animationChange);

    if (ifSwiped || ifAdded) {
      generateNum();
      score++;
      scoreDisplay.innerHTML = score;
    }

    if (!ifAdded && !ifSwiped) {
      switchRight = false;
    }
    generateColor();
  }
}

function keyLeft() {
  switchRight = true;
  switchDown = true;
  switchUp = true;
  if (switchLeft) {
    rotateSquare();
    rotateSquare();
    rotateSquare();
    let { ifSwiped, slideCount } = swipe();
    let { ifAdded, animationChange } = add();
    resetSquare();
    resetSquare();
    resetSquare();
    // control the swipe animation
    swipeAnimation("left", slideCount);
    // contro the animation after added
    addAnimation("left", animationChange);

    if (ifAdded || ifSwiped) {
      score++;
      scoreDisplay.innerHTML = score;
      generateNum();
    }
    if (!ifAdded && !ifSwiped) {
      switchLeft = false;
    }
  }

  generateColor();
}
function keyUp() {
  switchRight = true;
  switchLeft = true;
  switchDown = true;
  if (switchUp) {
    let { ifSwiped, slideCount } = swipe();
    let { ifAdded, animationChange } = add();
    // control the swipe animation
    swipeAnimation("up", slideCount);
    // contro the animation after added
    addAnimation("up", animationChange);
    if (ifAdded || ifSwiped) {
      score++;
      scoreDisplay.innerHTML = score;
      generateNum();
    }
    if (!ifAdded && !ifSwiped) {
      switchUp = false;
    }
  }

  generateColor();
}
function keyDown() {
  switchRight = true;
  switchLeft = true;
  switchUp = true;
  if (switchDown) {
    rotateSquare();
    rotateSquare();

    let { ifSwiped, slideCount } = swipe();
    let { ifAdded, animationChange } = add();
    resetSquare();
    resetSquare();
    // control the swipe animation
    swipeAnimation("down", slideCount);
    // contro the animation after added
    addAnimation("down", animationChange);

    if (ifAdded || ifSwiped) {
      score++;
      scoreDisplay.innerHTML = score;
      generateNum();
    }
    if (!ifAdded && !ifSwiped) {
      switchDown = false;
    }
  }

  generateColor();
}
