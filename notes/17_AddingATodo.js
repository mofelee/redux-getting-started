// ADDING A TODO
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

// todo reducer
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
// todos reducer
const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
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
// visibilityFilter reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
// root reducer
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
// redux store
const store = createStore(todoApp);
let nextTodoId = 0;
// declare TodoApp component
class TodoApp extends React.Component{
  render(){
    return(
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          {/* compenent expresses desire to mutate the state by
          dispatching an action */}
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++
            });
            this.input.value = '';
          }}>
          Add Todo
        </button>
        <ul>
        {/* the lack of {} gives implicit return for the <li> */}
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
// render function
const render = () => {
  ReactDOM.render(
    <TodoApp
      // Read the current state of the store and pass
      // as a prop to the TodoApp component.
      // The render function is called on every change
      // to the store, so the TodoApp is always up to date
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
};
// call render function whenever store changes
store.subscribe(render);
render();
