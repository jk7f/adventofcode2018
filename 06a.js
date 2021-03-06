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

const extremes = [[maxRight, maxTop], [maxLeft, maxTop], [maxRight, maxBot], [maxLeft, maxBot]];
extremes.forEach(extreme => {
  const distances = input.map(item => {
    return {
      distance: getDistance(extreme[0], item.coords[0], extreme[1], item.coords[1]),
      inputId: item.id
    };
  });
  const closest = distances.sort((a, b) => a.distance - b.distance)[0];
  if (distances.filter(item => item.distance === closest.distance).length === 1) {
    input.find(arrItem => arrItem.id === closest.inputId).edgeNode = true;
  }
});

for (let x = maxLeft; x < maxRight; x++) {
  for (let y = maxTop; y < maxBot; y++) {
    const distances = input.map(item => {
      return {
        distance: getDistance(x, item.coords[0], y, item.coords[1]),
        inputId: item.id
      };
    });
    const closest = distances.sort((a, b) => a.distance - b.distance)[0];
    if (distances.filter(item => item.distance === closest.distance).length === 1) {
      input.find(arrItem => arrItem.id === closest.inputId).size++;
    }
  }
}

input.sort((a, b) => a.size - b.size);
console.log(input.filter(item => item.edgeNode !== true).pop().size);
