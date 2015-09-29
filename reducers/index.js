import {combineReducers} from 'redux-immutablejs';
import timer from './timer';
import todoList from './todoList';

export default combineReducers({
  timer: timer,
  todoList: todoList
});
