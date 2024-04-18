/////////////////////////////////////// PROGRAMM ///////////////////////////////////////

const rl = require("readline-sync");

// catgories to choose from
const categories = {
  animals: ["Monkey", "Dog", "Rabbit", "Pigeon", "Dolphin", "Snake"],
  cars: ["BMW", "Mercedes", "Ford", "Nissan", "Mitsubishi", "Ferrari"],
  numbers: ["123", "523", "1337", "752", "9523", "4298"],
  sports: ["Tennis", "Football", "Baseball", "Ski", "Boxing", "Sailing"],
  movies: ["Mad Max", "Die Hard", "Frozen", "Bambi", "Bloodsport", "Jumanji"],
};

// game logic
game();

// end of game
console.log("\nSee you next time !");

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// FUNCTIONS ///////////////////////////////////////

function game() {
  let end = false;
  while (!end) {
    /*
        ==============================
        | 1. Player chooses category |
        ==============================
    */

    // print categories to show user the available commands
    printCategories(categories);

    // user chooses category he wants to play
    let choice = rl.question("\nType in a category name: ");

    // if userinput is not in categories object, get a new input until its valid
    while (!Object.hasOwn(categories, choice)) {
      choice = rl.question(
        "\nNo matching category found, pls choose a valid category name: "
      );
    }

    // get array which user choose
    const chosenArray = Object.values(categories[choice]);

    /*
          ======================
          | 2. Cards get mixed |
          ======================
     */

    // create solution array - size based on number of chosenArray elements
    const solutionArr = [];
    chosenArray.forEach(() => {
      const arr = createRandomArray(chosenArray);
      solutionArr.push(arr);
    });

    /*
          =================
          | 3. Hide cards |
          =================
    */

    // hide solution
    const hideArr = solutionArr.map((item, i) => {
      return item.map((_element, j) => {
        return (_element = `${i}${j}`);
      });
    });

    // function where the actual game logic is running
    gameLoop(solutionArr, hideArr);

    // end game or not
    console.log(
      "\n(>*.*)> Congratulations, you made it, well played ! <(*.*<)"
    );

    /*
          ===============================================
          | 9. Player decides to play a new game or not |
          ===============================================
    */

    end = endTheGame();
  }
}

function gameLoop(solution, hide) {
  let finished = false;
  let round = 1;
  let usedCoordinates = [];
  let defaultCoordinates = [];
  let round1String;
  let round2String;
  let points = 0;
  let lastMatch = null;
  let endDev = true;
  let devLog = false;
  let firstUserInput = { col: null, row: null };
  const foundPairs = [];
  while (!finished) {
    // back to default
    if (round > 2) {
      round = 1;
      defaultCoordinates = [];
      usedCoordinates = [];
      round1String = "";
      round2String = "";
    }

    if (round === 1) {
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

    /*
          ======================================
          | 4. Player chooses a card to reveal |
          ======================================
    */

    // generate input and check if input already found
    let userCoordinates = checkInput(foundPairs, firstUserInput);

    if (devLog) {
      console.log("\n\n\n\n\n///////////// LOGGING /////////////\n");
      console.log("round: ", round);
      console.log("userCoordinates: ", userCoordinates);
    }

    usedCoordinates.push(userCoordinates);

    if (devLog) {
      console.log("usedCoordinates: ", usedCoordinates);
    }

    // backup if compared values are false
    defaultCoordinates.push(hide[userCoordinates.col][userCoordinates.row]);

    /*
          =====================================
          | 5. Player reveals the chosen card |
          =====================================
    */

    //  reveal hideArr
    hide[userCoordinates.col][userCoordinates.row] =
      solution[userCoordinates.col][userCoordinates.row];

    if (round === 1) {
      round1String = solution[userCoordinates.col][userCoordinates.row];
      firstUserInput = userCoordinates;
    }

    if (round === 2) {
      round2String = solution[userCoordinates.col][userCoordinates.row];
    }

    if (devLog) {
      console.log("round1String: ", round1String);
      console.log("round2String: ", round2String);

      console.log("defaultCoordinates: ", defaultCoordinates);
      console.log("foundPairs: ", foundPairs);
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

    /*
          ===================================================
          | 7.1 If cards not match, hide the revealed cards |
          ===================================================
    */

    if (round1String !== round2String && round === 2) {
      console.log("\nNO MATCH ...");
      rl.question(
        "Take your time to memorize, then press [ENTER] to continue..."
      );
      hide[usedCoordinates[1].col][usedCoordinates[1].row] =
        defaultCoordinates[round - 1];
      hide[usedCoordinates[0].col][usedCoordinates[0].row] =
        defaultCoordinates[round - 2];
      firstUserInput = { col: null, row: null };
    }

    /*
          ===========================================
          | 7.2 If cards match, cards keep revealed |
          ===========================================
    */

    if (round1String === round2String && round === 2) {
      points++;
      lastMatch = round1String;
      foundPairs.push(usedCoordinates);
      firstUserInput = { col: null, row: null };
    }

    /*
          ===================================================================================================
          | 6. If player revealed only 1 card at this time he goes into next round and reveals another card |
          ===================================================================================================
    */

    round++;

    /*
    
          8. If all cards revealed, we end the game
    */

    if (points === 18) {
      console.log("Points: ", points);
      finished = true;
    }
  }
}

function checkInput(arrMatches, firstInput) {
  let userCoordinates = getUserCoordinates();
  for (const element of arrMatches) {
    for (item of element) {
      while (
        item.col === userCoordinates.col &&
        item.row === userCoordinates.row
      ) {
        console.log("\nALREADY FOUND ! Please choose other coordinates...");
        userCoordinates = getUserCoordinates();
      }
    }
  }
  while (
    firstInput.col === userCoordinates.col &&
    firstInput.row === userCoordinates.row
  ) {
    console.log(
      "\nSECOND INPUT MATCHES FIRST INPUT ! Please choose other coordinates..."
    );
    userCoordinates = getUserCoordinates();
  }
  return userCoordinates;
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
