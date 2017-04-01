import {combineReducers} from 'redux';
import asyncTodoReducer from './articles.reducer';

const combined = combineReducers({
  asyncTodos: asyncTodoReducer
});

export default combined;
