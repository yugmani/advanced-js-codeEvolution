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
