'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let sorted = false;
//V145 CReating DOM elements

const displayMovements = function (movements, sort = false) {
  //Empty the container
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    //Add new elements
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  //returns the HTML of the element
  //console.log(containerMovements.innerHTML);
};
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//displayMovements(account1.movements);
const user = 'Steven Thomas Williams';

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map((word) => word[0]) //how i did it word.slice(0, 1)
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);
//v147 Data transformations: map filter reduce

//v150 The filter Method
const deposits = movements.filter((mov) => mov > 0);
const withdrawals = movements.filter((mov) => mov < 0);

// console.log(deposits, withdrawals);

//v151 the reduce method

// console.log(movements);

const balance = movements.reduce(function (acc, cur, i, arr) {
  // console.log(`Iterationi ${i}: ${acc}`);
  return acc + cur;
}, 0); //initial value of the accumulator

// console.log(balance);

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${account.balance} €`;
};

//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => (acc += mov), 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  //interest > 1 is paid in each deposit
  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//calcDisplaySummary(movements);
//V153. The magic of chaining methods

//v156 Implementing Login
let currentAccount;

function updateUI(currentAccount) {
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
}

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('login');
    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    //Clear the input fields

    inputLoginUsername.value = inputLoginPin.value = '';
    //make pin lose focus
    inputLoginPin.blur();
    //Display balance, summary and movements

    updateUI(currentAccount);
  }

  console.log(currentAccount);
});

//v157 Implementing transfers

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('Transfer valid');
    //actual transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  } else {
    console.log('Invalid Transfer');
  }

  inputTransferAmount.value = inputTransferTo.value = '';
  //make pin lose focus
  inputTransferAmount.blur();
  console.log(amount, receiverAcc);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmount * 0.1)
  ) {
    console.log(`ỳou can request a loan`);
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  } else {
    console.log(`you cant request a loan`);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  console.log(username, pin);

  if (username === currentAccount.username && pin === currentAccount.pin) {
    console.log(`you can close your account`);

    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    console.log(accounts);
  } else {
    console.log(`invalid data`);
  }

  inputClosePin.value = inputCloseUsername.value = '';
  inputClosePin.blur();
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(movements, !sorted);
  sorted = !sorted;
});
// const inputLoginUsername = document.querySelector('.login__input--user');
// const inputLoginPin;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

/*
//v141 Simple Array Methods

let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2)); //c, d,e
console.log(arr.slice(2, 4)); //cd from index 2, before index 4
console.log(arr.slice(-2)); //last 2 elemets d,e
console.log(arr.slice(-1)); //e
console.log(arr.slice(1, -2)); //b,c extract anything but the last 2 elements

//splice
console.log(arr);
console.log(arr.splice(2)); //c d e
console.log(arr); //a b
console.log(arr.splice(-1)); //b
console.log(arr); //a

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT
const letters = arr.concat(arr2);
console.log(letters);

//JOIN
console.log(letters.join(' - ')); //a - b - c - d - e - f - e - g - h - i - j



//v142 looping arrays forEach
*/

/*
//for (const movement of movements) {
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('FOREACH');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

//0: function(200)
//1: function(450)

//what if we needed a counter variable
// Arrow function
// forEach((currentValue) => { ... } )
// forEach((currentValue, index) => { ... } )
// forEach((currentValue, index, array) => { ... } )

// // Callback function
// forEach(callbackFn)
// forEach(callbackFn, thisArg)

// // Inline callback function
// forEach(function callbackFn(currentValue) { ... })
// forEach(function callbackFn(currentValue, index) { ... })
// forEach(function callbackFn(currentValue, index, array){ ... })
// forEach(function callbackFn(currentValue, index, array) { ... }, thisArg)




//v143 forEach with maps and sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Set. Value is the same as key here as set has no keys.
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value} : ${[...map]}`);
});
*/

//V144 project: Bankist app

//v148 The map methods
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// //using map, a function, is the modern way to use js, with a functional apporach, paradigm
// const movementsUsd = movements.map(function (mov) {
//   return Math.trunc(mov * eurToUsd, 2);
//   //in each iteration the return is added to a new array.
// });

// console.log(movements);
// console.log('usd: ' + movementsUsd);

// //same thing but with forEach
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

// //same as abpve but with an arrow function
// const movArrow = movements.map((mov) => Math.trunc(mov * eurToUsd, 2));

// console.log(movArrow);

// console.log(
//   movements.map(
//     (mov, i) =>
//       `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//         mov
//       )}`
//   )
// );

//Maximum value

// const maxValue = movements.reduce(function (acc, mov) {
//   return (acc = mov > acc ? mov : acc);
// }, movements[0]);

// console.log(maxValue);

// //V153. The Magic of chaining methods
// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

//v155 The find methods

// const firstWithdrawal = movements.find((mov) => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
// console.log(account);

//v159 some and every

console.log(movements);

//Equality
console.log(movements.includes(130)); //includes tests for equality

//Some: Condition
const anyDeposits = movements.some((mov) => mov > 5000);
console.log(anyDeposits);

//Every: Condition
console.log(account4.movements);
const everyDeposit = account4.movements.every((mov) => mov > 0);
console.log(everyDeposit);

//Separate callback

const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//V160 flat and flatMap
//Introuced in 2019

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //[1,2,3,4,5,6,7,8]

const arrDeep = [[1, [2, 3]], [4, 5, 6], 7, 8];
console.log(arrDeep.flat()); //1, array(2), 4, 5, 6, 7,8
console.log(arrDeep.flat(2)); //[1,2,3,4,5,6,7,8]

//overall balance of all the movements of all the acocunts

const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);

const overallBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance2);

//v161 Sorting Arrays

//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

//Numbers
console.log(movements);

//retrun <0 a,b
//retrun >0, b,a
//ascending order
console.log(movements.sort((a, b) => a - b));

//descending order
console.log(movements.sort((a, b) => b - a));

//v162 more ways of Creating and filling arrays

//Empty array + fill methods
const x = new Array(7); //[empty x 7]
console.log(x);

console.log(x.map(() => 5)); //[`empty x 7]

//console.log(x.push(7)); // 8 (length of the array)
console.log(x); //[empty x 7], 7

console.log(x.fill(1, 0, 2)); //[1,1,emptyx5]
console.log(x.fill(5, 5)); //1,1,emptux3, 5, 5

//Array.from()

const y = Array.from({ length: 7 }, () => 1);
console.log(y); //[1,1,1,1,1,1,1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

//an array with 100 random dice rolls
const randomDice = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(randomDice);

//real life use of Array.from

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    (el) => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  //another way of creating the array. it creates the array but we would have to map it separately
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
