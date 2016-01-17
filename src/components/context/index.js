import React from 'react';

class Provider extends React.Component{
  // store will be part of the context that
  // the provider provides for any of its children
  // and grandchildren
  getChildContext(){
    return{
      store: this.props.store
    };
  }
  render(){
    return this.props.children;
  }
}

// essential for context to work
Provider.childContextTypes = {
  store: React.PropTypes.object
};

export default Provider;
