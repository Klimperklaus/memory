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

    // create solution
    const solutionArr = [];
    chosenArray.forEach(() => {
      const arr = createRandomArray(chosenArray);
      solutionArr.push(arr);
    });

    console.log("\nsolutionArr: \n", solutionArr);

    // hide solution
    const hideArr = solutionArr.map((item, i) => {
      return item.map((_element, j) => {
        return (_element = `${i}${j}`);
      });
    });

    console.log("\nhideArr: \n", hideArr);

    let finished = false;
    let counter = 1;
    let usedCoordinates = [];
    let defaultCoordinates = [];
    while (!finished) {
      // set counter back if needed
      if (counter > 2) {
        counter = 1;
      }

      // userinput for field
      let userCoordinates = getUserCoordinates();
      console.log(
        `\nuserCoordinates: col = ${userCoordinates.col}, row = ${userCoordinates.row}`
      );

      usedCoordinates.push(userCoordinates);
      console.log(usedCoordinates);

      // backup if compared values are false
      defaultCoordinates.push(
        hideArr[userCoordinates.col][userCoordinates.row]
      );

      //  reveal hideArr
      hideArr[userCoordinates.col][userCoordinates.row] =
        solutionArr[userCoordinates.col][userCoordinates.row];

      // comparing streams
      let round1String;
      let round2String;

      if (counter === 1) {
        round1String = solutionArr[userCoordinates.col][userCoordinates.row];
      }

      if (counter === 2) {
        round2String = solutionArr[userCoordinates.col][userCoordinates.row];
      }

      console.log("defaultCoordinates: \n", defaultCoordinates);

      console.log("\nsolArr: \n", solutionArr);
      console.log("\nhideArr: \n", hideArr);

      if (round1String !== round2String) {
        hideArr[userCoordinates.col][userCoordinates.row] =
          defaultCoordinates[counter - 1];
      }

      // reset array after 2nd round
      if (usedCoordinates.length === 2) {
        usedCoordinates = [];
      }

      if (defaultCoordinates.length === 2) {
        defaultCoordinates = [];
      }

      counter++;
      // finished = true;
    }

    // end game or not
    end = endTheGame();
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
  let userInput = rl.question("\nType in field coordinates: ");
  // RegEx
  let isInputValid = /^[0-5]{2}$/.test(userInput);
  while (!isInputValid) {
    userInput = rl.question(
      "\nValue not valid, range is [00 - 05 -> 50 - 55]: "
    );
    isInputValid = /^[0-5]{2}$/.test(userInput);
  }
  let coordinate1 = parseInt(userInput[0]);
  let coordinate2 = parseInt(userInput[1]);

  return { col: coordinate1, row: coordinate2 };
}

function endTheGame() {
  let endGame = rl.question("\nWanna play again [y/n]?: ");
  while (endGame !== "n" && endGame !== "y") {
    endGame = rl.question(
      "\nPlease choose between [y] for 'yes' and [n] for 'no': "
    );
  }
  if (endGame === "n") {
    return true;
  }
  return false;
}
