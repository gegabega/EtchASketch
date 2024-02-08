"use strict";

const container = document.querySelector(`.container`);
const gridItems = document.querySelectorAll(`.grid`);
const btn = document.querySelector(`button`);

// function LightenDarkenColor(col, amt) {
//   var usePound = false;

//   if (col[0] == "#") {
//     col = col.slice(1);
//     usePound = true;
//   }

//   var num = parseInt(col, 16);

//   var r = (num >> 16) + amt;

//   if (r > 255) r = 255;
//   else if (r < 0) r = 0;

//   var b = ((num >> 8) & 0x00ff) + amt;

//   if (b > 255) b = 255;
//   else if (b < 0) b = 0;

//   var g = (num & 0x0000ff) + amt;

//   if (g > 255) g = 255;
//   else if (g < 0) g = 0;

//   return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
// }

const createGrid = function (n) {
  for (let i = 0; i < n * n; i++) {
    const newDiv = document.createElement(`div`);
    newDiv.classList.add(`grid`);
    newDiv.classList.add(`grid-item-${i + 1}`);
    container.append(newDiv);
  }

  const gridItems = document.querySelectorAll(`.grid`);

  gridItems.forEach((item) => {
    item.style.height = `${100 / n}dvh`;
    item.style.width = `${100 / n}dvw`;

    item.addEventListener(`mouseover`, () => {
      item.style.backgroundColor = `violet`;
    });
  });

  //adjust container grid
  const root = document.documentElement;

  root.style.setProperty(`--rows`, `repeat(${n}, auto)`);
  root.style.setProperty(`--columns`, `repeat(${n}, auto)`);
};

//on start
createGrid(16);

const clearGrid = function () {
  container.innerHTML = ``;
};

const generateGrid = function () {
  //clear grid
  clearGrid();

  const input = prompt(`how many blocks?`);

  createGrid(input);
};

generateGrid();

// btn.addEventListener(`mousedown`, generateGrid());

// container.addEventListener(`mouseover`, () => {
//   container.style.background = `black`;
// });

// grid is created 16 x 16
// so the amount of boxes is 256 (n * n)

// TODO:

// add button and make it work

// btn.addEventListener(`mousedown`, generateGrid());

// function LightenDarkenColor(col, amt) {
//     col = parseInt(col, 16);
//     return (
//       ((col & 0x0000ff) + amt) |
//       ((((col >> 8) & 0x00ff) + amt) << 8) |
//       (((col >> 16) + amt) << 16)
//     ).toString(16);
//   }
