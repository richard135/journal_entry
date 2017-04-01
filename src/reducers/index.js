import {combineReducers} from 'redux';

import asyncTodoReducer from './asyncTodo.reducer';
const combined = combineReducers({
  asyncTodos: asyncTodoReducer
});

export default combined;
