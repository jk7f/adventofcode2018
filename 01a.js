const fs = require("fs");
const input = fs
  .readFileSync("./01.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "");

let result = 0;

input.forEach(item => {
  result += parseInt(item, 10);
});

console.log(result);
