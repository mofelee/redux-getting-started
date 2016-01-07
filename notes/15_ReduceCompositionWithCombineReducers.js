// REDUCER COMPOSITION WITH COMBINEREDUCERS
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';

const todo = (state, action) => {
  switch (action.type){
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id){
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      // here we concat a new object with an id, text,
      // and completed field to our state array
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// says that the todos field inside the state object
// will be updated by calling the todos reducer,
// similarly with the visibilityFilter, and
// the results will be assembled into a single object
//
// convention: name reducers after the state keys
// that they manage. We can omit the values thanks to
// the es6 object literal shorthand notation
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

// use the todoApp reducer, which consists
// of several reducers combined using the
// reducer composition pattern above
const store = createStore(todoApp);

// the initial state of the combined reducer
// now contains the initial states of both
// of the independent reducers
console.log('Initial state:');
console.log(JSON.stringify(store.getState()));
console.log('--------------');

// each time an action comes in, each independent
// reducer in the combined todoApp reducer handle
// the action independently. This helps scale
// redux development
console.log('Dispatching ADD_TODO.');
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});
console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go shopping'
});
console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('--------------');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});
console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('--------------');

console.log('Dispatching SET_VISIBILITY_FILTER.');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(JSON.stringify(store.getState()));
console.log('--------------');
