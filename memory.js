const categories = {
  animals: ["Monkey", "Dog", "Rabbit", "Pigeon", "Dolphin"],
  car_manufacturers: ["BMW", "Mercedes", "Ford", "Nissan", "Mitsubishi"],
  numbers: ["123", "523", "1337", "752", "9523"],
  sports: ["Tennis", "Football", "Baseball", "Badminton", "Boxing"],
  movies: ["Mad Max", "Die Hard", "Frozen", "Bambi", "Bloodsport"],
};

const rl = require("readline-sync");

const end = false;
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

  // generate arr
  const grid = [];

  // randomize items in array

  const usedRandNums = [];

  for (const element of categories[choice]) {
    let randNum = Math.floor(Math.random() * categories[choice].length);
    if (!usedRandNums.includes(randNum)) {
      usedRandNums.push(randNum);
      grid.push(categories[choice][randNum]);
    } else {
      while (usedRandNums.includes(randNum)) {
        randNum = Math.floor(Math.random() * categories[choice].length);
      }
      usedRandNums.push(randNum);
      grid.push(categories[choice][randNum]);
    }
  }

  console.log(grid);
}
