// FILTERING TODOS
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

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter){
    return <span>{children}</span>
  }

  return(
    <a href='#'
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        });
      }}
    >
      {children}
    </a>
  );
};

const getVisibleTodos = (
  todos,
  filter
) => {
  switch(filter){
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}


let nextTodoId = 0;
// declare TodoApp component
class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.addTodo = this.addTodo.bind(this);
  }
  addTodo = () => {
    store.dispatch({
      type: 'ADD_TODO',
      text: this.input.value,
      id: nextTodoId++
    });
    document.getElementById('addTodoBtn').value = '';
  }
  render(){
    window.onkeydown((e) => {
      console.log(e.value);
    });
    const {
      todos,
      addTodos,
      visibilityFilter
    } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );
    return(
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button id='addTodoBtn' onClick={addTodo);
            this.input.value = '';
          }}>
          Add Todo
        </button>
        <ul>
        {/* the lack of {} gives implicit return for the <li> */}
          {visibleTodos.map(todo =>
            <li key={todo.id}
              onClick={() => {
                  store.dispatch({
                      type: 'TOGGLE_TODO',
                      id: todo.id
                  });
              }}
              style={{
                  textDecoration: todo.completed ?
                      'line-through' :
                      'none'
              }}>
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink
           filter='SHOW_ALL'
           currentFilter={visibilityFilter}
          >
            All
          </FilterLink>
          {' '}
          <FilterLink
           filter='SHOW_ACTIVE'
           currentFilter={visibilityFilter}
          >
            Active
          </FilterLink>
          {' '}
          <FilterLink
           filter='SHOW_COMPLETED'
           currentFilter={visibilityFilter}
          >
            Completed
          </FilterLink>
        </p>
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
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};
// call render function whenever store changes
store.subscribe(render);
render();
