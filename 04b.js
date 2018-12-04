const fs = require("fs");
const getType = input => {
  if (input.includes("begins shift")) {
    return "BEGIN";
  } else if (input.includes("wakes up")) {
    return "WAKE";
  } else {
    return "SLEEP";
  }
};

const input = fs
  .readFileSync("./04.txt")
  .toString()
  .split("\n")
  .filter(item => item !== "")
  .sort()
  .map(entry => ({
    type: getType(entry),
    raw: entry
  }));

const inputByDay = [];

let arrIndex = -1;
input.forEach(item => {
  if (item.type === "BEGIN") {
    arrIndex++;
    inputByDay[arrIndex] = {
      guardId: item.raw.split("#")[1].split(" ")[0],
      sleepStarts: [],
      wakeTimes: [],
      scheduleString: "".padStart(60, "."),
      totalAsleep: 0
    };
  }
  if (item.type === "SLEEP") {
    inputByDay[arrIndex].sleepStarts.push(item.raw.split(":")[1].split("]")[0]);
  }
  if (item.type === "WAKE") {
    inputByDay[arrIndex].wakeTimes.push(item.raw.split(":")[1].split("]")[0]);
  }
});

inputByDay.forEach(item => {
  for (let counter = 0; counter < item.sleepStarts.length; counter++) {
    item.totalAsleep += item.wakeTimes[counter] - item.sleepStarts[counter];
    const charArray = [...item.scheduleString];
    for (let charCounter = item.sleepStarts[counter]; charCounter < item.wakeTimes[counter]; charCounter++) {
      charArray[charCounter] = "#";
    }
    item.scheduleString = charArray.join("");
  }
});

const guards = [];
inputByDay.forEach(input => {
  const guard = guards.find(guard => guard.id === input.guardId);
  if (guard) {
    guard.events.push(input);
    guard.totalAsleep += input.totalAsleep;
  } else {
    guards.push({
      id: input.guardId,
      events: [input],
      totalAsleep: input.totalAsleep
    });
  }
});

guards.forEach(guard => {
  let mostAsleepMinute = 0;
  let mostAsleepTime = 0;
  const sleepCountArray = [];
  for (let counter = 0; counter < 60; counter++) {
    sleepCountArray.push(0);
  }
  guard.events.forEach(event => {
    const sleepArray = [...event.scheduleString];
    sleepArray.forEach((sleepTime, index) => {
      if (sleepTime === "#") {
        sleepCountArray[index]++;
      }
    });
  });

  sleepCountArray.forEach((time, index) => {
    if (time > mostAsleepTime) {
      mostAsleepTime = time;
      mostAsleepMinute = index;
    }
  });

  guard.mostAsleepMinute = mostAsleepMinute;
  guard.mostAsleepTime = mostAsleepTime;
});

guards.sort((a, b) => a.mostAsleepTime - b.mostAsleepTime);

const chosenGuard = guards[guards.length - 1];

console.log("guard id: " + chosenGuard.id);
console.log("most asleep minute: " + chosenGuard.mostAsleepMinute);
console.log("answer: " + parseInt(chosenGuard.id, 10) * chosenGuard.mostAsleepMinute);
