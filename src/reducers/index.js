import {combineReducers} from 'redux';

import syncTodoReducer from './syncTodo.reducer';
import asyncTodoReducer from './asyncTodo.reducer';
const combined = combineReducers({
  syncTodos: syncTodoReducer,
  asyncTodos: asyncTodoReducer
});

export default combined;
