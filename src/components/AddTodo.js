import React from 'react';
import store from '../store/store';

class AddTodo extends React.Component{
  constructor(){
    super();
  }
  componentDidMount(){
    const state = store.getState();
    this.nextTodoId = state.todos.length;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
    document.addEventListener(
      'keydown',
      (e) => this.handleKeyDown(e)
    );
  }
  componentWillUnmount(){
    this.unsubscribe();
    document.removeEventListener(
      'keydown',
      (e) => this.handleKeyDown(e)
    );
  }
  componentDidUpdate(){
    const state = store.getState();
    this.nextTodoId = state.todos.length;
  }
  addTodo(){
    const state = store.getState();
    const todoInput = document.getElementById('todoInput');
    store.dispatch({
      type: 'ADD_TODO',
      id: this.nextTodoId,
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
    const state = store.getState();
    let input;

    return(
      <div>
      <input id='todoInput' ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: this.nextTodoId,
          text: input.value
        })
        input.value = '';
      }}>
      Add Todo
      </button>
      </div>
    );
  }
}

export default AddTodo;
