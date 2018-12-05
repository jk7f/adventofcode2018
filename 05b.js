const fs = require("fs");
const input = fs
  .readFileSync("./05.txt")
  .toString()
  .trim();

const inputArray = [...input];

const fold = foldInput => {
  let repeat = true;
  while (repeat) {
    let changeHasOccured = false;
    foldInput.some((item, index) => {
      if (index !== foldInput.length - 1) {
        const currentChar = item;
        const nextChar = foldInput[index + 1];
        const currentCharIsLowerCase = currentChar === currentChar.toLowerCase();

        if (currentCharIsLowerCase && nextChar === currentChar.toUpperCase()) {
          foldInput.splice(index, 2);
          changeHasOccured = true;
          return true;
        } else if (!currentCharIsLowerCase && nextChar === currentChar.toLowerCase()) {
          foldInput.splice(index, 2);
          changeHasOccured = true;
          return true;
        }
      }
    });
    if (!changeHasOccured) {
      repeat = false;
    }
  }
  return foldInput.length;
};

const letters = [];
for (let index = 97; index < 123; index++) {
  letters.push(String.fromCharCode(index));
}

const result = letters.map(letter => {
  const foldArray = inputArray.filter(item => item.toLowerCase() !== letter);

  return fold(foldArray);
});

console.log(result.sort().shift());
