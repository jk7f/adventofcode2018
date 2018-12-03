const fs = require("fs");
const input = fs
  .readFileSync("./03.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "")
  .map(item => ({
    id: item.split(" @")[0],
    coords: item
      .split("@ ")[1]
      .split(": ")[0]
      .split(",")
      .map(coord => parseInt(coord, 10)),
    dimensions: item
      .split(": ")[1]
      .split("x")
      .map(dimension => parseInt(dimension, 10)),
    conflicts: []
  }));

const generateGrid = (width, height) => {
  const result = [];

  for (let w = 0; w < width; w++) {
    const widthArray = [];
    for (let h = 0; h < height; h++) {
      widthArray.push({
        count: 0,
        ids: []
      });
    }
    result.push(widthArray);
  }
  return result;
};

const grid = generateGrid(1000, 1000);

input.forEach(item => {
  for (let height = 0; height < item.dimensions[1]; height++) {
    for (let width = 0; width < item.dimensions[0]; width++) {
      const gridItem = grid[item.coords[1] + height][item.coords[0] + width];
      gridItem.count++;
      gridItem.ids.push(item.id);
    }
  }
});

grid.forEach(gridRow => {
  gridRow.forEach(gridColumn => {
    if (gridColumn.count > 1) {
      gridColumn.ids.forEach(id => {
        const index = input.findIndex(item => item.id === id);
        if (index > -1) {
          input[index].conflicts = [...input[index].conflicts, ...gridColumn.ids];
        }
      });
    }
  });
});

input.some(item => {
  if (item.conflicts.length < 2) {
    console.log(item.id);
    return true;
  }
});
