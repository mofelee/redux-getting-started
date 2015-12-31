// STORE METHODS: getState, dispatch, and subscribe
import { createStore } from 'redux';

const counter = (state = 0, action) => {
  switch (action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// the store holds the current applications
// state object, and it lets you dispatch
// actions. When you create it, you need
// to specify the reducer that tells
// how state is updated with actions.
const store = createStore(counter);

// the getState method of the store retrieves
// the current state of the redux store
// console.log(store.getState());

// the dispatch method lets you dispatch actions
// to change the state of your application
// store.dispatch({ type: 'INCREMENT' });
// console.log(store.getState());

// the subscribe method lets you register a callback
// that the redux store will call anytime an action
// has been dispatched so that you can update the UI
// of your application to reflect the current
// application state
const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' })
});
