import React from 'react';
import { connect } from 'react-redux';
import addTodo from '../actions/addTodo';

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
    const { dispatch } = this.props;
    const input = document.getElementById('todoInput');
    dispatch(addTodo(input.value));
    input.value = '';
  }
  handleKeyDown(e){
    const ENTER = 13;
    if (e.keyCode === ENTER){
      this.addTodo();
    }
  }
  render(){
    let input;
    const { dispatch } = this.props;

    return(
      <div>
      <input id='todoInput' ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
      Add Todo
      </button>
      </div>
    );
  }
}

AddTodo = connect()(AddTodo);

export default AddTodo;
