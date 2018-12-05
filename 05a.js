const fs = require("fs");
const input = fs
  .readFileSync("./05.txt")
  .toString()
  .trim();

const inputArray = [...input];
let repeat = true;
while (repeat) {
  let changeHasOccured = false;
  inputArray.some((item, index) => {
    if (index !== inputArray.length - 1) {
      const currentChar = item;
      const nextChar = inputArray[index + 1];
      const currentCharIsLowerCase = currentChar === currentChar.toLowerCase();

      if (currentCharIsLowerCase && nextChar === currentChar.toUpperCase()) {
        inputArray.splice(index, 2);
        changeHasOccured = true;
        return true;
      } else if (!currentCharIsLowerCase && nextChar === currentChar.toLowerCase()) {
        inputArray.splice(index, 2);
        changeHasOccured = true;
        return true;
      }
    }
  });
  if (!changeHasOccured) {
    repeat = false;
  }
}
console.log(inputArray.length);
