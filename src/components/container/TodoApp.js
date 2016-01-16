import React from 'react';
import FilterLink from '../FilterLink';
import getVisibleTodos from '../../helpers/getVisibleTodos';
import store from '../../store/store';

// PRESENTATIONAL COMPONENTS
import Todo from '../presentational/Todo';
import TodoList from '../presentational/TodoList';

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

export default TodoApp;
