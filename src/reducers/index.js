import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter'

// root reducer
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;
