// IMPLEMENTING STORE FROM SCRATCH

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

// BASIC IMPLEMENTATION OF REDUX CREATESTORE METHOD!
const createStore = (reducer) => {
  let state;
  // keep track of all the listeners
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    // call the reducer with the state and action as args
    state = reducer(state, action);
    // call each listener on dispatch action
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      // return a function that removes listener from listeners array
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // we want the store to have the initial state populated
  // so we dispatch a dummy action
  dispatch({});

  return { getState, dispatch, subscribe };
};

// TEST OUT OUR CREATESTORE FUNCTION

const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' })
});
