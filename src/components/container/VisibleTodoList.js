import React from 'react';
import TodoList from '../presentational/TodoList';
import getVisibleTodos from '../../helpers/getVisibleTodos';

// maps the redux store state
// to the props of the TodoList
// component that are related
// to the data from the redux store
const mapStateToProps = (state) => {
  return {
    // will be updated any time
    // the state changes
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

// maps the dispatch method of the store
// to the callback props of the TodoList
// component. It specifies which callback
// props dispatches which action
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      });
    }
  };
};

import { connect } from 'react-redux';

// generates the container component
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
};

export default VisibleTodoList;
