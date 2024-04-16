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

const rl = require("readline-sync");

let end = false;
while (!end) {
  // print categories
  console.log(`
Categories:
***********\n`);
  for (const cat in categories) {
    console.log(`-> ${cat}`);
  }

  // choose category
  let choice = rl.question("\nChoose a category: ");

  // if userinput is not in categories array, get a new input until its valid
  while (!Object.hasOwn(categories, choice)) {
    choice = rl.question("\nNo category found, pls choose a valid category: ");
  }

  // randomize items in array
  const ChosenArray = Object.values(categories[choice]);

  function createRandomArray(arr) {
    const usedNums = [];
    const newArr = arr.map((element) => {
      let randNum = Math.floor(Math.random() * arr.length);
      if (!usedNums.includes(randNum)) {
        usedNums.push(randNum);
        return (element = arr[randNum]);
      } else {
        while (usedNums.includes(randNum)) {
          randNum = Math.floor(Math.random() * arr.length);
        }
        usedNums.push(randNum);
        return (element = arr[randNum]);
      }
    });
    return newArr;
  }

  console.log(`\nrandomArray: ${createRandomArray(ChosenArray)}\n`);

  // create solution
  const solutionArr = [];
  ChosenArray.forEach(() => {
    const arr = createRandomArray(ChosenArray);
    solutionArr.push(arr);
  });

  console.log(solutionArr);

  // hide solution
  const hideArr = solutionArr.map((item, index) => {
    return item.map((element) => {
      return (element[index] = "x");
    });
  });

  console.log(hideArr);

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

console.log("\nSee you next time !");
