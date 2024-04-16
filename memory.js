const rl = require("readline-sync");

const categories = {
  animals: ["Monkey", "Dog", "Rabbit", "Pigeon", "Dolphin", "Snake"],
  cars: ["BMW", "Mercedes", "Ford", "Nissan", "Mitsubishi", "Ferrari"],
  numbers: ["123", "523", "1337", "752", "9523", "4298"],
  sports: ["Tennis", "Football", "Baseball", "Ski", "Boxing", "Sailing"],
  movies: ["Mad Max", "Die Hard", "Frozen", "Bambi", "Bloodsport", "Jumanji"],
};

game();

console.log("\nSee you next time !");

// functions

function game() {
  let end = false;
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
      const userCoordinates = getUserCoordinates();
      console.log(
        `userCoordinates: col = ${userCoordinates.col}, row = ${userCoordinates.row}`
      );
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

function getUserCoordinates() {
  let userInput = rl.question("Type in field coordinates: ");
  // RegEx
  let isInputValid = /^[0-5]{2}$/.test(userInput);
  while (!isInputValid) {
    userInput = rl.question("Value not valid, range is [00 - 05 -> 50 - 55]: ");
    isInputValid = /^[0-5]{2}$/.test(userInput);
  }
  let coordinate1 = parseInt(userInput[0]);
  let coordinate2 = parseInt(userInput[1]);

  return { col: coordinate1, row: coordinate2 };
}
