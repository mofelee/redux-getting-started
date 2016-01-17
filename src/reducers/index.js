import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter'

// root reducer
const rootReducer = combineReducers({
  todos,
  visibilityFilter
});

export default rootReducer;
