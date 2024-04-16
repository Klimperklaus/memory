const rl = require("readline-sync");

const categories = {
  animals: ["Monkey", "Dog", "Rabbit", "Pigeon", "Dolphin", "Snake"],
  car_manufacturers: [
    "BMW",
    "Mercedes",
    "Ford",
    "Nissan",
    "Mitsubishi",
    "Ferrari",
  ],
  numbers: ["123", "523", "1337", "752", "9523", "4298"],
  sports: ["Tennis", "Football", "Baseball", "Badminton", "Boxing", "Sailing"],
  movies: [
    "Mad Max",
    "Die Hard",
    "Frozen",
    "Bambi",
    "Bloodsport",
    "One Piece Red",
  ],
};

const end = false;
game(end);

console.log("\nSee you next time !");

// functions

function game(end) {
  while (!end) {
    // print categories
    printCategories(categories);

    // user choose category
    let choice = rl.question("\nType in a category name: ");

    // if userinput is not in categories array, get a new input until its valid
    while (!Object.hasOwn(categories, choice)) {
      choice = rl.question(
        "\nNo matching category found, pls choose a valid category name: "
      );
    }

    // randomize items in array
    const chosenArray = Object.values(categories[choice]);

    console.log(`\nchosenArray: ${chosenArray}\n`);

    // create solution
    const solutionArr = [];

    chosenArray.forEach(() => {
      const arr = createRandomArray(chosenArray);
      solutionArr.push(arr);
    });

    console.log("SolutionArr: \n", solutionArr);

    // hide solution
    const hideArr = solutionArr.map((item) => {
      return item.map((_element) => {
        return (_element = "x");
      });
    });

    console.log("\nhideArr: \n", hideArr);

    let finished = false;
    while (!finished) {
      // userinput for field
      getUserCoordinates(hideArr);
      finished = true;
    }

    // end game or not
    let endGame = rl.question("\nWanna play again [y/n]?: ");
    while (endGame !== "n" && endGame !== "y") {
      endGame = rl.question(
        "\nPlease choose between 'y' for yes and 'n' for no: "
      );
    }
    if (endGame === "n") {
      end = true;
    }
  }
}

// functions

function printCategories(obj) {
  console.log(`
Categories:
***********\n`);
  for (const cat in obj) {
    console.log(`-> ${cat}`);
  }
}

function createRandomArray(arr) {
  const usedNums = [];
  const newArr = arr.map(() => {
    let randNum = Math.floor(Math.random() * arr.length);
    if (!usedNums.includes(randNum)) {
      usedNums.push(randNum);
      return (element = arr[randNum]);
    }
    while (usedNums.includes(randNum)) {
      randNum = Math.floor(Math.random() * arr.length);
    }
    usedNums.push(randNum);
    return (element = arr[randNum]);
  });
  return newArr;
}

function getUserCoordinates(arrMatching) {
  let userInput = rl.question("Type in field coordinates: ");
  let coordinate1 = parseInt(userInput[0]);
  let coordinate2 = parseInt(userInput[1]);
  console.log();
  while (
    Number.isNaN(coordinate1) ||
    coordinate1 > arrMatching.length - 1 ||
    coordinate1 < 0 ||
    Number.isNaN(coordinate2) ||
    coordinate2 > arrMatching.length - 1 ||
    coordinate2 < 0
  ) {
    userInput = rl.question(
      "Value not valid, range is from [00 - 05 | 10 - 15 etc]: "
    );
    coordinate1 = parseInt(userInput[0]);
    coordinate2 = parseInt(userInput[1]);
  }
  console.log(`coordinate1: ${coordinate1}, coordinate2: ${coordinate2}`);
}
