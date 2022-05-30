// Import stylesheets
import './style.css';

// Write Javascript code!

// ************************************
//Nested function scope ( Lexical scope)
// ************************************
let a = 10;

function outer() {
  let b = 20;
  function inner() {
    let c = 30;
    console.log('a: ', a);
    console.log('b: ', b);
    console.log('c: ', c);
  }
  inner();
}

outer();

// a: 10
// b: 20
// c: 30

// ************************************
//closures
// ************************************

// function outsider() {
//   let counter = 0;
//   function insider() {
//     counter++;
//     console.log(counter);
//   }
//   insider();
// }

// outsider();
//1
// outsider();
//1   -> everytime a function is invoked it initializes the inner variables.

//Another case
function outsider() {
  let counter = 0;

  //inner function
  function insider() {
    counter++;
    console.log(counter);
  }

  //returning a function
  return insider;
}

const fn1 = outsider();

fn1(); //1
fn1(); //2

// ******************************************
// currying
// ******************************************

function sum(a, b, c) {
  return a + b + c;
}

console.log(sum(2, 3, 5)); //10

function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}

const curriedSum = curry(sum);

console.log('Curried Sum: ', curriedSum(2)(3)(5));
// Curried Sum:10

const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);

console.log(add5);
//10;

// ****************************************
// 'this' keyword
// ****************************************

function sayMyName(name) {
  console.log(`My name is ${name}`);
}

sayMyName('Walter White');
//My name is Walter White
sayMyName('Heisenburg');
// My name is Heisenburg

//implicit binding
// -----------------------------------------
const person = {
  name: 'Yoog',
  sayName: function () {
    console.log(`My name is ${this.name}`);
  },
};

person.sayName();
//My name is Yoog

//Explicit binding
// -----------------------------------------
function sayNewName() {
  console.log(`Your name is ${this.name}`);
}

//let's reference 'sayNewName()' function to previous 'person' object
sayNewName.call(person);
//Your name is Yoog

// New binding
// -----------------------------------------
function User(name) {
  //here this = {}
  this.name = name;
}

const user1 = new User('Yoog');
const user2 = new User('Viswash');

console.log(user1.name); //Yoog
console.log(user2.name); //Viswash

//Default binding
// -----------------------------------------

function printName(name) {
  console.log(`My Nick name is ${name}`);
}

printName();
// My Nick name is undefined

//if you are working in ***Node environment*** add following 'globalThis.name' assigned with 'Batman' before 'printName()' function. Here 'this' refers to the global variable 'name';
// const name = "Batman";
// globalThis.name = 'Batman';
// function printName(name) {
//   console.log(`My Nick name is ${this.name}`);
// }
// printName();
//output: My Nick name is Batman

// **************************************
// ************* Prototype **************
// **************************************

function Admin(fName, lName) {
  this.firstName = fName;
  this.lastName = lName;
}

const admin1 = new Admin('Bruce', 'Wayne');
const admin2 = new Admin('Clark', 'Kent');

//a function specific to admin1.
admin1.getFullName = function () {
  return this.firstName + ' ' + this.lastName;
};

console.log(admin1.getFullName());
//Bruce Wayne

// console.log(admin2.getFullName());
//Error: admin2.getFullName is not a function

//lets create a prototype( a function not specific to any particular instance.)
Admin.prototype.showFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

//Now this one can be used for every instances
console.log(admin1.showFullName()); //Bruce Wayne
console.log(admin2.showFullName()); //Clark Kent

//inheritance
function SuperHero(fName, lName) {
  Admin.call(this, fName, lName);
  this.isSuperHero = true;
}

SuperHero.prototype.fightCrime = function () {
  console.log(`Fighting crime`);
};

SuperHero.prototype = Object.create(Admin.prototype);

SuperHero.prototype.constructor = SuperHero;
const batman = new SuperHero('John', 'Mehr');
console.log(batman.showFullName());
//John Mehr

// ******************************************************
// ********************** Class *************************
// ******************************************************

class Manager {
  constructor(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
  }

  sayMyName() {
    return this.firstName + ' ' + this.lastName;
  }
}

const manager1 = new Manager('Subash', 'Bhandari');
console.log(manager1.sayMyName());
// Subash Bhandari

//inheriting properties and methods from previous(parent) class
class MegaHero extends Manager {
  constructor(fName, lName) {
    super(fName, lName);
    this.isSuperHero = true;
  }

  crimeDetect() {
    console.log('Fighting crime!');
  }
}

const hitman = new MegaHero('Eka', 'Sharma');

//invoke method of parent class
console.log(hitman.sayMyName());
//Eka Sharma
