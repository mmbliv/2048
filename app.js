document.addEventListener("DOMContentLoaded", () => {
  const scoreDisplay = document.getElementById("score");
  const winDisplay = document.getElementById("win");
  const lostDisplay = document.getElementById("lost");
  const gridDisplay = document.querySelector(".grid");
  // create a play border
  let squares = [];
  let switchRight = true;
  let switchLeft = true;
  let switchUp = true;
  let switchDown = true;
  let score = 0;

  function createBorder() {
    for (let i = 0; i < 16; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateNum();
    generateNum();
  }
  createBorder();
  // generate a random num
  function generateNum() {
    console.log("gen");
    let randomNum = Math.floor(Math.random() * 16);
    if (squares[randomNum].innerHTML == 0) {
      squares[randomNum].innerHTML = 2;
    } else generateNum();
  }
  //   restart the game
  document.getElementById("reset").addEventListener("click", function () {
    for (let i = 0; i < 16; i++) {
      squares[i].innerHTML = 0;
    }
    score = 0;
    scoreDisplay.innerHTML = score;
    generateNum();
    generateNum();
  });
  // check the result
  function chectResult() {
    let zeroNum = 0;
    for (let i = 0; i < 16; i++) {
      if (squares[i].innerHTML == 2048) {
        winDisplay.style.display = "block";
        document.removeEventListener("keyup", control);
      }
      if (squares[i].innerHTML == 0) {
        zeroNum++;
      }
    }
    if (zeroNum === 0) {
      lostDisplay.style.display = "block";
      document.removeEventListener("keyup", control);
    }
  }
  // swipe to the right
  function swipeRight() {
    let isNeedToSwipe = false;
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let rowOne = squares[i].innerHTML;
        let rowTwo = squares[i + 1].innerHTML;
        let rowThree = squares[i + 2].innerHTML;
        let rowFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(rowOne),
          parseInt(rowTwo),
          parseInt(rowThree),
          parseInt(rowFour),
        ];
        for (let j = 0; j < 3; j++) {
          if (row[j] !== 0 && row[j + 1] === 0) {
            isNeedToSwipe = true;
            let numInRow = row.filter((num) => num);
            let missing = 4 - numInRow.length;
            let addZeros = new Array(missing).fill(0);
            let newRow = addZeros.concat(numInRow);
            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
          }
        }
      }
    }
    if (isNeedToSwipe) {
      score++;
      scoreDisplay.innerHTML = score;
    }
    return isNeedToSwipe;
  }

  //   swipe to the left
  function swipeLeft() {
    let isNeedToSwipe = false;
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let rowOne = squares[i].innerHTML;
        let rowTwo = squares[i + 1].innerHTML;
        let rowThree = squares[i + 2].innerHTML;
        let rowFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(rowOne),
          parseInt(rowTwo),
          parseInt(rowThree),
          parseInt(rowFour),
        ];
        for (let j = 1; j < 4; j++) {
          if (row[j] !== 0 && row[j - 1] === 0) {
            isNeedToSwipe = true;
            let numInRow = row.filter((num) => num);
            let missing = 4 - numInRow.length;
            let addZeros = new Array(missing).fill(0);
            let newRow = numInRow.concat(addZeros);
            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
          }
        }
      }
    }
    if (isNeedToSwipe) {
      score++;
      scoreDisplay.innerHTML = score;
    }
    return isNeedToSwipe;
  }

  // swipe to the up
  function swipeUp() {
    let isNeedToSwipe = false;
    for (let i = 0; i < 4; i++) {
      let columnOne = squares[i].innerHTML;
      let columnTwo = squares[i + 4].innerHTML;
      let columnThree = squares[i + 8].innerHTML;
      let columnFour = squares[i + 12].innerHTML;
      let column = [
        parseInt(columnOne),
        parseInt(columnTwo),
        parseInt(columnThree),
        parseInt(columnFour),
      ];
      for (let j = 1; j < 4; j++) {
        if (column[j] !== 0 && column[j - 1] === 0) {
          isNeedToSwipe = true;
          let numInColumn = column.filter((num) => num);
          let missing = 4 - numInColumn.length;
          let addZero = new Array(missing).fill(0);
          let newColumn = numInColumn.concat(addZero);
          squares[i].innerHTML = newColumn[0];
          squares[i + 4].innerHTML = newColumn[1];
          squares[i + 8].innerHTML = newColumn[2];
          squares[i + 12].innerHTML = newColumn[3];
        }
      }
    }
    if (isNeedToSwipe) {
      score++;
      scoreDisplay.innerHTML = score;
    }
    return isNeedToSwipe;
  }
  //   swipe to the down
  function swipeDown() {
    let isNeedToSwipe = false;
    for (let i = 0; i < 4; i++) {
      let columnOne = squares[i].innerHTML;
      let columnTwo = squares[i + 4].innerHTML;
      let columnThree = squares[i + 8].innerHTML;
      let columnFour = squares[i + 12].innerHTML;
      let column = [
        parseInt(columnOne),
        parseInt(columnTwo),
        parseInt(columnThree),
        parseInt(columnFour),
      ];
      for (let j = 0; j < 3; j++) {
        if (column[j] !== 0 && column[j + 1] === 0) {
          isNeedToSwipe = true;
          let numInColumn = column.filter((num) => num);
          let missing = 4 - numInColumn.length;
          let addZero = new Array(missing).fill(0);
          let newColumn = addZero.concat(numInColumn);
          squares[i].innerHTML = newColumn[0];
          squares[i + 4].innerHTML = newColumn[1];
          squares[i + 8].innerHTML = newColumn[2];
          squares[i + 12].innerHTML = newColumn[3];
        }
      }
    }
    if (isNeedToSwipe) {
      score++;
      scoreDisplay.innerHTML = score;
    }
    return isNeedToSwipe;
  }
  // add the num
  function addRightRowNum() {
    let isNeedToSwitch = true;
    for (let i = 15; i > 0; i--) {
      if (
        squares[i].innerHTML != 0 &&
        squares[i].innerHTML === squares[i - 1].innerHTML &&
        i % 4 !== 0
      ) {
        isNeedToSwitch = false;
        let total = parseInt(squares[i].innerHTML) * 2;
        console.log(squares[i].innerHTML);
        squares[i].innerHTML = total;
        squares[i - 1].innerHTML = 0;
      }
    }
    if (isNeedToSwitch) {
      chectResult();
      return false;
    } else {
      swipeRight();
      return true;
    }
  }
  function addLeftRowNum() {
    let isNeedToSwitch = true;
    for (let i = 0; i < 15; i++) {
      if (
        squares[i].innerHTML != 0 &&
        squares[i].innerHTML === squares[i + 1].innerHTML &&
        (i + 1) % 4 !== 0
      ) {
        isNeedToSwitch = false;
        let total = parseInt(squares[i].innerHTML) * 2;
        squares[i].innerHTML = total;
        squares[i + 1].innerHTML = 0;
      }
    }
    if (isNeedToSwitch) {
      chectResult();
      return false;
    } else {
      swipeLeft();
      return true;
    }
  }
  function addColumnNumUp() {
    let isNeedToSwitch = true;
    for (let i = 0; i < 12; i++) {
      if (
        squares[i].innerHTML === squares[i + 4].innerHTML &&
        squares[i].innerHTML != 0
      ) {
        isNeedToSwitch = false;
        let total = parseInt(squares[i].innerHTML) * 2;
        squares[i].innerHTML = total;
        squares[i + 4].innerHTML = 0;
      }
    }
    if (isNeedToSwitch) {
      chectResult();
      return false;
    } else {
      swipeUp();
      return true;
    }
  }
  function addColumnNumDown() {
    let isNeedToSwitch = true;
    for (let i = 15; i > 3; i--) {
      if (
        squares[i].innerHTML === squares[i - 4].innerHTML &&
        squares[i].innerHTML != 0
      ) {
        isNeedToSwitch = false;
        let total = parseInt(squares[i].innerHTML) * 2;
        squares[i].innerHTML = total;
        squares[i - 4].innerHTML = 0;
      }
    }
    if (isNeedToSwitch) {
      chectResult();
      return false;
    } else {
      swipeDown();
      return true;
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
      let ifSwiped = swipeRight();
      let ifAdded = addRightRowNum();
      if (ifSwiped || ifAdded) {
        generateNum();
      }
      if (!ifAdded && !ifSwiped) {
        switchRight = false;
      }
    }
  }

  function keyLeft() {
    switchRight = true;
    switchDown = true;
    switchUp = true;
    if (switchLeft) {
      let ifSwiped = swipeLeft();
      let ifAdded = addLeftRowNum();
      if (ifAdded || ifSwiped) {
        generateNum();
      }
      if (!ifAdded && !ifSwiped) {
        switchLeft = false;
      }
    }
  }
  function keyUp() {
    switchRight = true;
    switchLeft = true;
    switchDown = true;
    if (switchUp) {
      let ifSwiped = swipeUp();
      let ifAdded = addColumnNumUp();
      if (ifAdded || ifSwiped) {
        generateNum();
      }
      if (!ifAdded && !ifSwiped) {
        switchUp = false;
      }
    }
  }
  function keyDown() {
    switchRight = true;
    switchLeft = true;
    switchUp = true;
    if (switchDown) {
      let ifSwiped = swipeDown();
      let ifAdded = addColumnNumDown();
      if (ifAdded || ifSwiped) {
        generateNum();
      }
      if (!ifAdded && !ifSwiped) {
        switchDown = false;
      }
    }
  }
});
