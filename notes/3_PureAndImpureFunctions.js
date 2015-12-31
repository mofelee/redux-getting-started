// PURE AND IMPURE FUNCTIONS

// Pure functions:
// return value depends solely on the values of their arguments
// do not have any observable side-effects such as network
// requests or database calls. same input, same output.
function square(x){
  return x * x;
}
function squareAll(items){
  return items.map(square);
}

// Impure functions
function square(x){
  updateXInDatabase(x);
  return x * x;
}
function squareAll(items){
  for (let i=0; i < items.length; i++){
    items[i] = square(items[i]);
  }
}
