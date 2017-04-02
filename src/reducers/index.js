import {combineReducers} from 'redux';
import articlesReducer from './articles.reducer';
const combined = combineReducers({
  articleLists: articlesReducer
});

export default combined;
