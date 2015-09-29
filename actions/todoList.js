import {
  ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO,
  STOP_EDIT_TODO
} from '../constants/todoList';

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text: text
  };
};

export function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    id: id
  };
};

export function uncompleteTodo(id) {
  return {
    type: UNCOMPLETE_TODO,
    id: id
  };
};

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id: id
  };
};

export function editTodo(id) {
  return {
    type: EDIT_TODO,
    id: id
  };
};

export function updateTodo(id, text) {
  return {
    type: UPDATE_TODO,
    id: id,
    text: text
  };
};

export function stopEditTodo(id) {
  return {
    type: STOP_EDIT_TODO,
    id: id
  };
};
