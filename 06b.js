const fs = require("fs");
const input = fs
  .readFileSync("./06.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "")
  .map((item, index) => ({
    coords: item.split(", ").map(num => parseInt(num, 10)),
    edgeNode: false,
    id: index,
    size: 0
  }));

// const input = ["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"].map((item, index) => ({
//   coords: item.split(", ").map(num => parseInt(num, 10)),
//   edgeNode: false,
//   id: index,
//   size: 0
// }));

let maxTop,
  maxBot,
  maxLeft,
  maxRight = null;

const getDistance = (x0, x1, y0, y1) => {
  return Math.abs(x0 - x1) + Math.abs(y0 - y1);
};

input.forEach((item, index) => {
  const itemX = item.coords[0];
  const itemY = item.coords[1];
  if (index === 0) {
    maxTop = itemY;
    maxBot = itemY;
    maxLeft = itemX;
    maxRight = itemX;
    return;
  }

  if (itemX < maxLeft) {
    maxLeft = itemX;
  }
  if (itemX > maxRight) {
    maxRight = itemX;
  }
  if (itemY < maxTop) {
    maxTop = itemY;
  }
  if (itemY > maxBot) {
    maxBot = itemY;
  }
});

let count = 0;
for (let x = maxLeft; x < maxRight; x++) {
  for (let y = maxTop; y < maxBot; y++) {
    const area = input.reduce((accumulator, item) => accumulator + getDistance(x, item.coords[0], y, item.coords[1]), 0);
    if (area < 10000) {
      count++;
    }
  }
}
console.log(count);
