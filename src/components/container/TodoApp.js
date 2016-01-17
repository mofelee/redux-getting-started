import React from 'react';
import getVisibleTodos from '../../helpers/getVisibleTodos';

// PRESENTATIONAL COMPONENTS
import Todo from '../presentational/Todo';
import VisibleTodoList from './VisibleTodoList';
import Footer from '../presentational/Footer';

import AddTodo from '../AddTodo';

// NOTE diverging from Dan here because I want
// to maintain my keydown listener
class TodoApp extends React.Component{
  render(){
    const { todos, visibilityFilter } = this.props;
    return(
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
};

TodoApp.contextTypes = {
  store: React.PropTypes.object
};

export default TodoApp;
