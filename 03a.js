const fs = require("fs");
const input = fs
  .readFileSync("./03.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "");

const generateGrid = (width, height) => {
  const result = [];

  for (let w = 0; w < width; w++) {
    const widthArray = [];
    for (let h = 0; h < height; h++) {
      widthArray.push(0);
    }
    result.push(widthArray);
  }
  return result;
};

const grid = generateGrid(1000, 1000);

input.forEach(item => {
  const coords = item
    .split("@ ")[1]
    .split(": ")[0]
    .split(",")
    .map(coord => parseInt(coord, 10));
  const dimensions = item
    .split(": ")[1]
    .split("x")
    .map(dimension => parseInt(dimension, 10));

  for (let height = 0; height < dimensions[1]; height++) {
    for (let width = 0; width < dimensions[0]; width++) {
      grid[coords[1] + height][coords[0] + width]++;
    }
  }
});

let count = 0;
grid.forEach(gridRow => {
  gridRow.forEach(gridColumn => {
    if (gridColumn > 1) {
      count++;
    }
  });
});

console.log(count);
