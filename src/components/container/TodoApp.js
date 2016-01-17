import React from 'react';
import getVisibleTodos from '../../helpers/getVisibleTodos';
import store from '../../store/store';

// PRESENTATIONAL COMPONENTS
import Todo from '../presentational/Todo';
import TodoList from '../presentational/TodoList';
import Footer from '../presentational/Footer';

import AddTodo from '../presentational/AddTodo';

let nextTodoId = 0;

// NOTE diverging from Dan here because I want
// to maintain my keydown listener
class TodoApp extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
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
  addTodo(){
    const todoInput = document.getElementById('todoInput');
    store.dispatch({
      type: 'ADD_TODO',
      id: nextTodoId++,
      text: todoInput.value
    });
    todoInput.value = '';
  }
  handleKeyDown(e){
    const ENTER = 13;
    if (e.keyCode === ENTER){
      this.addTodo();
    }
  }
  render(){
    const { todos, visibilityFilter } = this.props;
    return(
      <div>
      <AddTodo
        onAddClick={text =>
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text
          })
        }
      />
      <TodoList
        todos={getVisibleTodos(
          todos,
          visibilityFilter
        )}
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
      <Footer />
      </div>
    );
  }
};

export default TodoApp;
