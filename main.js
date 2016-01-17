import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './src/components/container/TodoApp';
import { createStore } from 'redux';
import rootReducer from './src/reducers';

ReactDOM.render(
  <TodoApp store={createStore(rootReducer)}/>,
  document.getElementById('root')
);
