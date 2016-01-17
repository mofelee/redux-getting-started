import React from 'react';
import TodoList from '../presentational/TodoList';
import getVisibleTodos from '../../helpers/getVisibleTodos';

class VisibleTodoList extends React.Component{
  componentDidMount(){
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  render(){
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return(
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
};

export default VisibleTodoList;
