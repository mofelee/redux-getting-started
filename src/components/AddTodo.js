import React from 'react';
import { connect } from 'react-redux';

class AddTodo extends React.Component{
  constructor(){
    super();
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
    const { dispatch, todoId } = this.props;
    const todoInput = document.getElementById('todoInput');
    dispatch({
      type: 'ADD_TODO',
      id: todoId,
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
    let input;
    const { dispatch, todoId } = this.props;

    return(
      <div>
      <input id='todoInput' ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch({
          type: 'ADD_TODO',
          id: todoId,
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

AddTodo = connect(
  state => {
    return {
      todoId: state.todos.length
    };
  },
  // null or falsy second argument
  // gets dispatch as a prop
  null
)(AddTodo);

export default AddTodo;
