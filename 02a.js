const fs = require("fs");
const input = fs
  .readFileSync("./02.txt")
  .toString()
  .split("\n");

let threes = 0;
let doubles = 0;

const count = (string, amount) => {
  let result = 0;
  string.forEach(letter => {
    let letterCount = 0;
    string.forEach(counter => {
      if (letter === counter) {
        letterCount++;
      }
    });
    if (letterCount === amount) {
      result = letterCount;
    }
  });
  if (result === amount) {
    return true;
  } else {
    return false;
  }
};

input.forEach(item => {
  const itemArray = [...item];
  if (count(itemArray, 2)) {
    doubles++;
  }

  if (count(itemArray, 3)) {
    threes++;
  }
});

console.log(doubles, threes);
console.log(doubles * threes);
