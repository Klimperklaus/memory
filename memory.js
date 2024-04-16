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
  const getArr = Object.values(categories[choice]); // get needed array
  console.log(`getArr: ${getArr}`);

  const usedNums = [];
  const newArr = getArr.map((element) => {
    let randNum = Math.floor(Math.random() * getArr.length);
    if (!usedNums.includes(randNum)) {
      usedNums.push(randNum);
      return (element = getArr[randNum]);
    } else {
      while (usedNums.includes(randNum)) {
        randNum = Math.floor(Math.random() * getArr.length);
      }
      usedNums.push(randNum);
      return (element = getArr[randNum]);
    }
  });

  console.log(`newArr: ${newArr}`);
}
