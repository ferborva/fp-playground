const Either = require('ramda-fantasy').Either;
const R = require('ramda');

const right = Either.Right(1);
const left = Either.Left(2);

// Using current static
const myPathTaker = Either.either(l => console.log('Left:', l),
                                  r => console.log('Right:', r));

myPathTaker(right);
myPathTaker(left);


// Using a static 'fold like' either
right.fold(l => console.log('Left:', l),
           r => console.log('Right:', r));

left.fold(l => console.log('Left:', l),
          r => console.log('Right:', r));
