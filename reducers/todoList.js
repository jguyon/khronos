import {List, Map} from 'immutable';
import {createReducer, combineReducers} from 'redux-immutablejs';
import {
  ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO,
  STOP_EDIT_TODO
} from '../constants/todoList';

const todosReducer = createReducer(List(), {
  [ADD_TODO]: (state, action) => {
    const id = state.reduce(
      (maxId, todo) => Math.max(maxId, todo.get('id')),
      -1
    ) + 1;

    return state.push(Map({
      id: id,
      text: action.text,
      completed: false,
      editing: false
    }));
  },

  [COMPLETE_TODO]: (state, action) => state.map((todo) => {
    if (todo.get('id') === action.id) {
      return todo.set('completed', true);
    }

    return todo;
  }),

  [UNCOMPLETE_TODO]: (state, action) => state.map((todo) => {
    if (todo.get('id') === action.id) {
      return todo.set('completed', false);
    }

    return todo;
  }),

  [DELETE_TODO]: (state, action) => state.filter((todo) => (
    todo.get('id') !== action.id
  )),

  [EDIT_TODO]: (state, action) => state.map((todo) => {
    if (todo.get('id') === action.id) {
      return todo.set('editing', true);
    }

    return todo;
  }),

  [UPDATE_TODO]: (state, action) => state.map((todo) => {
    if (todo.get('id') === action.id) {
      return todo.set('text', action.text).set('editing', false);
    }

    return todo;
  }),

  [STOP_EDIT_TODO]: (state, action) => state.map((todo) => {
    if (todo.get('id') === action.id) {
      return todo.set('editing', false);
    }

    return todo;
  })
});

export default combineReducers({
  todos: todosReducer
});
