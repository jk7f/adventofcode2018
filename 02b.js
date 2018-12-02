const fs = require("fs");
const input = fs
  .readFileSync("./02.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "");

input.forEach((toCheckString, toCheckIndex) => {
  input.forEach((compareString, compareIndex) => {
    if (toCheckIndex === compareIndex) {
      return false;
    } else {
      const toCheckArray = [...toCheckString];
      const compareArray = [...compareString];
      let invalid = 0;
      toCheckArray.forEach((char, index) => {
        if (compareArray[index] !== char) {
          invalid++;
        }
      });
      if (invalid <= 1) {
        console.log(toCheckString, compareString);
      }
    }
  });
});
