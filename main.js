import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './src/components/container/TodoApp';
import { createStore } from 'redux';
import rootReducer from './src/reducers';
import Provider from './src/components/context';

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
