const Either = require('ramda-fantasy').Either;
const Identity = require('ramda-fantasy').Identity;
const Tuple = require('ramda-fantasy').Tuple;
const R = require('ramda');


// Build a checker function
const checker = (predicate, errorMsg, tuple) => {
  if (predicate(Tuple.fst(tuple))) {
    // The value is valid
  } else {
    // The value is not valid => Add error msg to the array
    tuple.map(arr => arr.push(errorMsg));
  }
  return tuple;
};

// Curry the checker
const curriedChecker = R.curry(checker);


// Validation predicate example
const isGreaterThan40 = x => x > 40;

// Is Number + Msg
const myIsNumber = curriedChecker(R.is(Number), 'Value must be a number');

// Is greater that 42 + Msg
const myGreaterThan42 = curriedChecker(isGreaterThan40, 'Value must be greater than 42');


/*
  To validate a value we put it into a Tuple together with an empty array
  We build a validator function which takes the value and passes
  it through all our checkers

  This could very well be extracted to function that
  takes a value and an array of predicates
 */
const myNumberValidator = (x) => {
  const checkedTuple = Identity.of(Tuple(x, []))
        .map(myIsNumber)
        .map(myGreaterThan42)
        .chain(R.identity);
  if (Tuple.snd(checkedTuple).length) {
    // There are errors
    return Either.Left(checkedTuple);
  }
  return Either.of(checkedTuple);
};


const allGood = 42;
const badValue = 2;
const badNumberAndValue = 'foo';

console.log(myNumberValidator(allGood));
console.log(myNumberValidator(badValue));
console.log(myNumberValidator(badNumberAndValue));
