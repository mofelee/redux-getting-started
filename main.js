// EXTRACTING PRESENTATIONAL COMPONENTS
import React from 'react';
import ReactDOM from 'react-dom';
import store from './src/store/store';
import TodoApp from './src/components/container/TodoApp';

// render function
const render = () => {
  ReactDOM.render(
    <TodoApp
      // Read the current state of the store and pass
      // as a prop to the TodoApp component.
      // The render function is called on every change
      // to the store, so the TodoApp is always up to date
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};
// call render function whenever store changes
store.subscribe(render);
render();
