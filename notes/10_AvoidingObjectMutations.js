// AVOIDING OBJECT MUTATIONS WITH
// Object.assign(), and ...spread
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const toggleTodo = (todo) => {
  // mutating version
  // todo.completed = !todo.completed;
  // return todo;
  // non-mutating version
  // v1: return a new object
  // return {
  //   id: todo.id,
  //   text: todo.text,
  //   completed: !todo.completed
  // };
  // v2: use Object.assign() method,
  // so that if we update properties of
  // todo object, we don't have to update
  // tests. (new es6 Object method)
  // first arg is the base object that we
  // will be mutating. Here we pass an
  // empty object so that we're not
  // mutating our existing todo object.
  // further arguments are objects whose
  // properties will be added to the initial
  // object supplied in the first arg
  // If multiple object arguments supply
  // values for the same property, the last
  // one (l-to-r) is the one that ends up
  // being assigned
  // return Object.assign({}, todo, {
  //   completed: !todo.completed
  // });
  // another option is to use the es7
  // object spread operator. This is
  // possible by using the stage2 preset
  // in babel
  return {
    ...todo,
    completed: !todo.completed
  };
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };
  // enforce immutability
  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');
