// WRITING A COUNTER REDUCER WITH TESTS

import expect from 'expect';

// the reducer for the counter
// state = 0 is es6 default argument syntax
const counter = (state = 0, action) => {
  switch (action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// some test assertions
expect(
  counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'INCREMENT' })
).toEqual(2);

expect(
  counter(2, { type: 'DECREMENT' })
).toEqual(1);

expect(
  counter(1, { type: 'DECREMENT' })
).toEqual(0);

// if we dispatch an a random action, it should
// return the current state of the application
expect(
  counter(1, { type: 'SOMETHING_ELSE' })
).toEqual(1);

// the reduce should specify the initial state
// the redux convention is that if the reducer
// receives undefined as the state argument,
// it must return what it considers the
// initial state of the application
expect(
  counter(undefined, {})
).toEqual(0);

console.log('Tests passed');
