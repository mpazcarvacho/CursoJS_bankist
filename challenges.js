'use strict';

//Challenge 4
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 376, owners: ['Michael'] },
];

//1
dogs.forEach(
  (dog) => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
//dogs.map((dog) => (dog.recommendedFood = dog.weight ** 0.75 * 28));
console.log(dogs);

//2
let index = -1;
let ownersEatTooMuch = [];
let ownersEatTooLittle = [];
let ownersOkay = [];

const foodRange = function (dog) {
  const highLimit = Math.trunc(dog.recommendedFood * 1.1);
  const lowLimit = Math.trunc(dog.recommendedFood * 0.9);
  let str = `This dog is eating ${dog.curFood} grams, the recommended food is ${dog.recommendedFood} within a range of ${lowLimit} - ${highLimit}. `;

  if (highLimit >= dog.curFood && lowLimit <= dog.curFood) {
    str += `It is within range.`;
    ownersOkay.push(...dog.owners);
  } else {
    str += `It is out of range`;
  }

  if (dog.curFood >= highLimit) {
    ownersEatTooMuch.push(...dog.owners);
  } else if (dog.curFood <= lowLimit) {
    ownersEatTooLittle.push(...dog.owners);
  } else console.log(str);
};

const getDog = function (dogs, index) {
  const dog = dogs[index];

  foodRange(dog);

  console.log(`Owners with dogs that eat too much are: ${ownersEatTooMuch}
  Owners with dogs that should eat more! ${ownersEatTooLittle}`);
};

const sarahsDog = function (dogs, ownerName) {
  dogs.forEach((dog, i) =>
    dog.owners.forEach(function (owner) {
      if (owner === ownerName) index = i;
    })
  );
  getDog(dogs, index);
};

//sarahsDog(dogs, 'Sarah');

for (let i = 0; i < dogs.length; i++) {
  getDog(dogs, i);
  console.log(dogs.some((doggy) => doggy.recommendedFood === doggy.curFood));
}

console.log(`Responsible owners: ${ownersOkay}`);

//3

// //1. Array Mehods Practice
// const bankDepositSum = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);

// console.log(bankDepositSum);

// //using only the reduce method
// const bankDepositSumReduce = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((sum, cur) => (cur > 0 ? sum + cur : sum), 0);
// console.log(`reduce ex 1: ${bankDepositSumReduce}`);

// //2
// const numDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;

// console.log(numDeposits1000);

// //same but with reduce method
// const numDepReduce = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(numDepReduce);

// //3. Create a new object
// const sums = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(sums);

// const { deposits2, withdrawals2 } = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits2 += cur) : (sums.withdrawals2 += cur);
//       sums[cur > 0 ? 'deposits2' : 'withdrawals2'] += cur;
//       return sums;
//     },
//     { deposits2: 0, withdrawals2: 0 }
//   );

// console.log(`deposits: ${deposits2}
// withdrawals:${withdrawals2}`);

// //4 this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');
//   return capitalize(titleCase); //to capitalize a first woird that was an exception
// };

// console.log(convertTitleCase(`this a nice title`));
// console.log(convertTitleCase(`this is a LONG title but not too long`));
// console.log(convertTitleCase(`ànd here is another title with an EXAMPLE`));

//Coding challenge
// const data1 = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = (ages) =>
//   ages
//     .map((age) => (age <= 2 ? 2 * age : 16 + 4 * age))
//     .filter((age) => age > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// console.log(calcAverageHumanAge(data1));
// console.log(calcAverageHumanAge(data2));

//Coding challenge #2
// const data1 = [5, 2, 4, 1, 15, 8, 3];
// const data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   let humanAge = ages.map(function (age) {
//     if (age <= 2) {
//       return 2 * age;
//     } else {
//       return 16 + 4 * age;
//     }
//   });
//   console.log(`map: ${humanAge}`);
//   humanAge = humanAge.filter((age) => age >= 18);

//   console.log(`filtered: ${humanAge}`);
//   humanAge = humanAge.reduce(function (sum, age, i) {
//     sum += age;
//     return sum;
//   }, 0);

//   return humanAge;
// };

// const av = calcAverageHumanAge(data1);
// console.log(av);
// calcAverageHumanAge(data2);

//Jonas answer

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter((age) => age >= 18);
//   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   //another way to get the average
//   const av2 = adults.reduce((acc, age, i, arr) => (acc += age / arr.length), 0);
//   return average;
// };

// console.log(calcAverageHumanAge(data1));
// console.log(calcAverageHumanAge(data2));

//Coding challenge #1
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// const juliaData1 = [3, 5, 2, 12, 7];
// const juliaData2 = [9, 16, 6, 8, 3];
// const kateData1 = [4, 1, 15, 8, 3];
// const kateData2 = [10, 5, 6, 1, 4];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const correctedJuliaArr = dogsJulia.slice(1, 3);
//   const arr = [...correctedJuliaArr, ...dogsKate];

//   arr.forEach(function (dogAge, i) {
//     const str =
//       dogAge >= 3
//         ? `is and adult, and is ${dogAge} years old`
//         : `is still a puppy`;
//     console.log(`Dog number ${i + 1} ${str}`);
//   });
// };

// checkDogs(juliaData1, kateData1);
// checkDogs(juliaData2, kateData2);
