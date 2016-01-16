// EXTRACTING PRESENTATIONAL COMPONENTS
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

// PRESENTATIONAL COMPONENT
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
        textDecoration: completed ?
          'line-through' :
          'none'
    }}>
    {text}
  </li>
);

// PRESENTATIONAL COMPONENT
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

// CONTAINER COMPONENT
let nextTodoId = 0;
class TodoApp extends React.Component{
  // CONSTRUCTOR
  constructor(props){
    super(props);
    this.addTodo = this.addTodo.bind(this);
  }
  // LIFECYCLE METHODS
  componentDidMount(){
    // arrow function preserves this context
    // otherwise we'd have to do
    // this.handleKeyDown.bind(this)
    document.addEventListener(
      'keydown',
      (e) => this.handleKeyDown(e)
    );
  }
  componentWillUnmount(){
    document.removeEventListener(
      'keydown',
      (e) => this.handleKeyDown(e)
    );
  }
  // METHODS
  handleKeyDown(e){
    const ENTER = 13;
    if (e.keyCode === ENTER){
      this.addTodo();
    }
  }
  addTodo(){
    const todoInput = document.getElementById('todoInput');
    store.dispatch({
      type: 'ADD_TODO',
      text: todoInput.value,
      id: nextTodoId++
    });
    todoInput.value = '';
  }
  // RENDER
  render(){
    const {
      todos,
      addTodo,
      visibilityFilter
    } = this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    );
    return(
      <div>
        <input id='todoInput' ref={node => {
          this.input = node;
        }} />
        <button onClick={this.addTodo}>
          Add Todo
        </button>
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          }
        />
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
