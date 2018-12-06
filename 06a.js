const fs = require("fs");
const input = fs
  .readFileSync("./06.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "")
  .map(item => item.split(", "));

console.log(input);
