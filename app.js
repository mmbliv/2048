document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  // create a play border
  let squares = [];
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
    let randomNum = Math.floor(Math.random() * 16);
    if (squares[randomNum].innerHTML == 0) {
      squares[randomNum].innerHTML = 2;
    } else generateNum();
  }

  // swipe to the right
  function swipeRight() {
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

  //   swipe to left
  function swipeLeft() {
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

  function addNum() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let total = parseInt(squares[i].innerHTML) * 2;
        squares[i].innerHTML = total;
        squares[i + 1].innerHTML = 0;
      }
    }
  }
  //   assign keycodes
  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    }
  }
  // to the right
  document.addEventListener("keyup", control);
  function keyRight() {
    swipeRight();
    addNum();
    swipeRight();
    generateNum();
  }
  // to the left
  function keyLeft() {
    swipeLeft();
    addNum();
    swipeLeft();
    generateNum();
  }

  // swipeUp
});
