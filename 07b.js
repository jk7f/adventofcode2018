const fs = require("fs");
const input = fs
  .readFileSync("./07.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "");

// const input = [
//   "Step C must be finished before step A can begin.",
//   "Step C must be finished before step F can begin.",
//   "Step A must be finished before step B can begin.",
//   "Step A must be finished before step D can begin.",
//   "Step B must be finished before step E can begin.",
//   "Step D must be finished before step E can begin.",
//   "Step F must be finished before step E can begin."
// ];

let letters = [];
let seconds = 0;

const workers = [
  {
    available: true,
    letter: null
  },
  {
    available: true,
    letter: null
  },
  {
    available: true,
    letter: null
  },
  {
    available: true,
    letter: null
  },
  {
    available: true,
    letter: null
  }
]

input.forEach(item => {
  const letter = item.split("Step ")[1][0];
  const dependency = item.split("before step ")[1][0];
  const letterItem = letters.find(a => a.letter === letter);
  if (!letterItem) {
    letters.push({
      letter,
      dependencies: [dependency],
      duration = letter.charCodeAt() - 4,
      isBusy = false
    });
  } else {
    letterItem.dependencies.push(dependency);
  }
});

letters.sort((a, b) => a.letter.localeCompare(b.letter));
const clearFromDependencies = letter => {
  letters.forEach(letterItem => {
    letterItem.dependencies.filter(dep => dep !== letter);
  });
};
let result = "";

const areOtherLettersDependantOnLetter = inputLetter => {
  let dependant = false;

  letters.forEach(element => {
    if (element.letter !== inputLetter) {
      if (element.dependencies.includes(inputLetter)) {
        dependant = true;
      }
    }
  });
  return dependant;
};

const getStart = () => {
  const matches = [];
  letters.forEach(letter => {
    if (!areOtherLettersDependantOnLetter(letter.letter)) {
      matches.push(letter);
    }
  });

  if (matches.length) {
    matches.sort((a, b) => a.letter < b.letter);
    const match = matches.pop();
    return match;
  }
};

const loop = inputLetter => {
  result += inputLetter.letter;
  clearFromDependencies(inputLetter.letter);
  delete letters[letters.findIndex(item => item.letter === inputLetter.letter)];
  letters = letters.filter(item => Object.keys(item).length);

  const nextStart = getStart();

  if (letters.length) {
    loop(nextStart);
  } else {
    if (!nextStart) {
      result += inputLetter.dependencies.find(letter => {
        return !result.includes(letter);
      });
    } else result += nextStart.letter;
  }
};

const masterLoop = () => {
  seconds++;
  workers.forEach(worker => {
    letters.forEach(letter => {
      if (letter.letter === worker.letter) {
        letter.duration --;
        if (letter.duration === 0) {
          worker.available = true;
          worker.letter = null;
        }
      }
    })
  })
}

const startLetter = getStart();
loop(startLetter);
console.log(result);
