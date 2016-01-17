import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './src/components/container/TodoApp';
import { createStore } from 'redux';
import rootReducer from './src/reducers';
import { Provider } from 'react-redux';

ReactDOM.render(
  // Provider exposes props passed to it on the context
  <Provider store={createStore(rootReducer)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
