const fs = require("fs");
const input = fs
  .readFileSync("./01.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "");

let result = 0;
const seen = [];

const loop = () => {
  let match = false;
  input.some((item, index) => {
    result += Number(item);
    if (seen[result]) {
      console.log(result);
      match = true;
      return true;
    } else {
      seen[result] = result;
    }
  });
  if (!match) {
    loop();
  }
};

loop();
