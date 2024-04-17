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

    // console.log("\nhideArr: \n", hideArr);

    //////////////////////////////////////////////////////////////////////////////////////////////
    let finished = false;
    let counter = 1;
    let usedCoordinates = [];
    let defaultCoordinates = [];
    let round1String;
    let round2String;
    while (!finished) {
      // set counter back if needed
      if (counter > 2) {
        counter = 1;
        defaultCoordinates = [];
        usedCoordinates = [];
        round1String = "";
        round2String = "";
      }

      console.log(hideArr);

      // userinput for field
      let userCoordinates = getUserCoordinates();
      console.log(
        `\nuserCoordinates: col = ${userCoordinates.col}, row = ${userCoordinates.row}`
      );

      console.log("counter: ", counter);

      usedCoordinates.push(userCoordinates);
      console.log("usedCoordinates: ", usedCoordinates);

      // backup if compared values are false
      defaultCoordinates.push(
        hideArr[userCoordinates.col][userCoordinates.row]
      );

      //  reveal hideArr
      hideArr[userCoordinates.col][userCoordinates.row] =
        solutionArr[userCoordinates.col][userCoordinates.row];

      if (counter === 1) {
        round1String = solutionArr[userCoordinates.col][userCoordinates.row];
      }

      if (counter === 2) {
        round2String = solutionArr[userCoordinates.col][userCoordinates.row];
      }

      console.log("round1String: ", round1String);
      console.log("round2String: ", round2String);

      console.log("defaultCoordinates: ", defaultCoordinates);

      console.log("\nsolArr: \n", solutionArr);
      console.log("\nhideArr: \n", hideArr);

      if (round1String !== round2String && counter === 2) {
        rl.question(
          "Take your time to memorize, then press [ENTER] to continue..."
        );
        hideArr[usedCoordinates[1].col][usedCoordinates[1].row] =
          defaultCoordinates[counter - 1];
        hideArr[usedCoordinates[0].col][usedCoordinates[0].row] =
          defaultCoordinates[counter - 2];
      }

      counter++;
      // finished = true;
    }

    // end game or not
    end = endTheGame();
  }
  //////////////////////////////////////////////////////////////////////////////////////////////
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
