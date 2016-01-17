import React from 'react';
import Link from '../presentational/Link';

// CONTAINER: provides data and behavior for
// the presentational components (Link)
class FilterLink extends React.Component{
  componentDidMount(){
    // move subscription to the store,
    // to the lifecycle methods, here we can
    // check whether our relevant state has updated
    // before re-rendering
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  render(){
    const { store } = this.props;
    // it reads but is not subscribed
    const state = store.getState();

    return(
      <Link
        active={
          this.props.filter === state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: this.props.filter
          })
        }
      >
        {this.props.children}
      </Link>
    );
  }
}

export default FilterLink;
