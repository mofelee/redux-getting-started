// REACT COUNTER EXAMPLE

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const counter = (state = 0, action) => {
  switch (action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counter);

// dumb component - does not contain any business logic
// only describes how the application state transforms
// into renderable output and how the callbacks passed
// via props are bound to the event handlers
const Counter = ({
  value ,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const render = () => {
  ReactDOM.render(
    // pass current state of the store as a prop to root component
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
