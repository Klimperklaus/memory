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

/////////////////////////////////////// FUNCTIONS ///////////////////////////////////////

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

    // create solution - size based on chosenArray.length
    const solutionArr = [];
    chosenArray.forEach(() => {
      const arr = createRandomArray(chosenArray);
      solutionArr.push(arr);
    });

    // hide solution
    const hideArr = solutionArr.map((item, i) => {
      return item.map((_element, j) => {
        return (_element = `${i}${j}`);
      });
    });

    gameLoop(solutionArr, hideArr);

    // end game or not
    console.log(
      "\n(>*.*)> Congratulations, you made it, well played ! <(*.*<)"
    );
    end = endTheGame();
  }
}

function gameLoop(solution, hide) {
  let finished = false;
  let counter = 1;
  let usedCoordinates = [];
  let defaultCoordinates = [];
  let round1String;
  let round2String;
  let points = 0;
  let lastMatch = null;
  let endDev = true;
  let devLog = false;
  while (!finished) {
    // back to default
    if (counter > 2) {
      counter = 1;
      defaultCoordinates = [];
      usedCoordinates = [];
      round1String = "";
      round2String = "";
    }

    if (counter === 1) {
      console.log("\n\n\n\n\n", hide);
      console.log("Points: ", points);
      if (lastMatch !== null) {
        console.log("Last Match: ", lastMatch);
      }
    }

    // developer option, only for presentation
    if (endDev) {
      let devEnd = rl.question("\nDEV -> Wanna end [y/n]?: ");
      if (devEnd === "y") {
        break;
      }
      if (devEnd === "n") {
        endDev = false;
        const devDecision = rl.question(
          "\nDEV -> Wanna activate variable logging [y/n]?: "
        );
        if (devDecision === "y") {
          devLog = true;
        }
      }
    }

    // userinput for field
    let userCoordinates = getUserCoordinates();

    if (devLog) {
      console.log("\n\n\n\n\n///////////// DEV ZONE /////////////");
      console.log(
        `\nuserCoordinates: col = ${userCoordinates.col}, row = ${userCoordinates.row}`
      );
    }

    if (devLog) {
      console.log("counter: ", counter);
    }

    usedCoordinates.push(userCoordinates);

    if (devLog) {
      console.log("usedCoordinates: ", usedCoordinates);
    }

    // backup if compared values are false
    defaultCoordinates.push(hide[userCoordinates.col][userCoordinates.row]);

    //  reveal hideArr
    hide[userCoordinates.col][userCoordinates.row] =
      solution[userCoordinates.col][userCoordinates.row];

    if (counter === 1) {
      round1String = solution[userCoordinates.col][userCoordinates.row];
    }

    if (counter === 2) {
      round2String = solution[userCoordinates.col][userCoordinates.row];
    }

    if (devLog) {
      console.log("round1String: ", round1String);
      console.log("round2String: ", round2String);

      console.log("defaultCoordinates: ", defaultCoordinates);
      console.log("\n////////////////////////////////////\n\n");
    }

    if (devLog) {
      console.log("\nsolArr: \n", solution);
    }

    if (devLog) {
      console.log(hide);
    }

    if (!devLog) {
      console.log("\n\n\n\n\n", hide);
    }

    console.log("Points: ", points);
    if (lastMatch !== null) {
      console.log("Last Match: ", lastMatch);
    }

    if (round1String !== round2String && counter === 2) {
      console.log("\nNO MATCH ...");
      rl.question(
        "Take your time to memorize, then press [ENTER] to continue..."
      );
      hide[usedCoordinates[1].col][usedCoordinates[1].row] =
        defaultCoordinates[counter - 1];
      hide[usedCoordinates[0].col][usedCoordinates[0].row] =
        defaultCoordinates[counter - 2];
    }

    if (round1String === round2String && counter === 2) {
      points++;
      lastMatch = round1String;
    }

    counter++;

    if (points === 18) {
      finished = true;
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

/////////////////////////////////////////////////////////////////////////////////////////
