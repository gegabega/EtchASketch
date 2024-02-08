"use strict";
const body = document.querySelector(`body`);
const container = document.querySelector(`.container`);
const containerItems = document.querySelector(`.container div`);
let gridItems = [];

//buttons
const btns = document.querySelectorAll(`.btn`);
const btnGridToggle = document.querySelector(`.btn--grid-toggle`);
// const btnDrawMode = document.querySelector(`.btn--draw-mode`);
const btnDownload = document.querySelector(`.btn--download`);

// number input
const inputGenerate = document.getElementById(`input--generate`);

// color inputs
const inputColorHover = document.getElementById(`input--hover`);
const inputColorClick = document.getElementById(`input--click`);
const inputColorGrid = document.getElementById(`input--gridcolor`);

console.log(gridItems);

// MOUSE HOLD
let MDOWN = false;

["mousedown", "mouseup"].forEach((eName) =>
  container.addEventListener(eName, () => (MDOWN = !MDOWN))
);

function clickHoldColor() {
  if (MDOWN) {
    this.style.backgroundColor = `${inputColorClick.value}`;
  }
}

const createGrid = function (n) {
  for (let i = 0; i < n * n; i++) {
    const createdDiv = document.createElement(`div`);
    createdDiv.classList.add(`grid`);
    createdDiv.classList.add(`grid-item-${i + 1}`);
    container.append(createdDiv);
  }

  gridItems = document.querySelectorAll(`.grid`);

  //
  gridItems.forEach((item) => {
    item.style.height = `${720 / n}px`;
    item.style.width = `${720 / n}px`;
    item.style.backgroundColor = `${inputColorGrid.value}`;

    if (
      inputColorGrid.value === `#000000` ||
      inputColorGrid.value === `#D9D1C6`
    ) {
      item.style.border = `0.03rem solid #dddddd`;
    } else {
      item.style.border = `0.03rem solid #000000`;
    }

    item.addEventListener(`mouseover`, () => {
      item.style.backgroundColor = `${inputColorHover.value}`;
    });

    item.addEventListener("mouseenter", clickHoldColor);

    // item.addEventListener(`mousedown`, () => {
    //   item.style.backgroundColor = `${inputColorClick.value}`;
    // });
  });

  //adjust container grid
  const root = document.documentElement;

  root.style.setProperty(`--rows`, `repeat(${n}, auto)`);
  root.style.setProperty(`--columns`, `repeat(${n}, auto)`);
};

// initial canvas size
createGrid(`${inputGenerate.value}`);

const emptyGrid = () => {
  console.log(gridItems);
  gridItems.forEach((item) => (item.style.backgroundColor = `whitesmoke`));
};

//on start
// createGrid(inputGenerate.value);

// const changeGridColor = function () {
//   gridItems.style.setProperty(`background-color`, `white`);
// };

const clearGrid = function () {
  container.innerHTML = ``;
};

const generateGrid = function () {
  //clear grid
  clearGrid();

  const input = inputGenerate.value;

  console.log(input);

  if (input < 100) createGrid(input);
};

// event listeners
let clicked = false;

// GRID TOGGLE BUTTON
btnGridToggle.addEventListener(`click`, () => {
  if (!clicked) {
    clicked = false;
    btnGridToggle.textContent = `Grid on`;
    btnGridToggle.classList.remove(`active`);
    gridItems.forEach((item) => {
      item.style.border = `none`;
    });
  } else {
    clicked = true;
    btnGridToggle.textContent = `Grid off`;
    btnGridToggle.classList.add(`active`);
    gridItems.forEach((item) => {
      if (
        inputColorGrid.value === `#000000` ||
        inputColorGrid.value === `#D9D1C6`
      ) {
        item.style.border = `0.03rem solid #dddddd`;
      } else {
        item.style.border = `0.03rem solid #000000`;
      }
    });
  }
  clicked = !clicked;
});

inputColorGrid.addEventListener(`input`, (e) => {
  gridItems.forEach((item) => {
    if (
      inputColorGrid.value === `#000000` ||
      inputColorGrid.value === `#D9D1C6`
    ) {
      item.style.border = `0.03rem solid #dddddd`;
    } else {
      item.style.border = `0.03rem solid #000000`;
    }

    item.style.backgroundColor = `${inputColorGrid.value}`;
  });
});

inputGenerate.addEventListener(`input`, function (e) {
  clearGrid();

  if (this.value <= 100 && this.value >= 0) createGrid(this.value);
  else {
    this.value = "";
  }
});

// DOWNLOAD AS PNG

const storage = document.querySelector(`.canvas-storage`);

btnDownload.addEventListener(`click`, () => {
  // console.log(html2canvas(container));

  html2canvas(container).then(function (canvas) {
    storage.appendChild(canvas);
    console.log(storage);
    const cvs = document.querySelector(`canvas`);
    btnDownload.href = `${canvas.toDataURL()}`;
    btnDownload.download = `my-masterpiece.png`;
  });
});
// capture canvas

// TODO:

// add button and make it work

// function LightenDarkenColor(col, amt) {
//     col = parseInt(col, 16);
//     return (
//       ((col & 0x0000ff) + amt) |
//       ((((col >> 8) & 0x00ff) + amt) << 8) |
//       (((col >> 16) + amt) << 16)
//     ).toString(16);
//   }
