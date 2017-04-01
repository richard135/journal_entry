import axios from 'axios';

export const deleteArticle = (id) => (dispatch) =>{
  dispatch({type:'DELETE_ARTICLE'});
  axios.delete(`/todos/${id}`)
    .then(() => {
      dispatch({type:'DELETE_ARTICLE_SUCCESS', id});
    }, () => {
      dispatch({type: 'DELETE_ARTICLE_FAILURE'});
    });
};

export const addArticle = () => (dispatch, getState) => {
  dispatch({type: 'ADD_ARTICLE'});
  console.log('ADD_ARTICLE', getState());
  axios.post('/todos', {name: getState().asyncTodos.newTodo.name})
    .then((response) => {
      dispatch({type:'ADD_ARTICLE_SUCCESS', data: response.data});
    }, () => {
      dispatch({type: 'ADD_ARTICLE_FAILURE'});
    });
};

export const fetchArticles = () => (dispatch) => {
  dispatch({type: 'FETCH_ARTICLES'});
  axios.get('/todos')
    .then((response) => {
      dispatch({type: 'FETCH_ARTICLES_SUCCESS', list: response.data});
    }, () => {
      dispatch({type: 'FETCH_ARTICLES_FAILURE'});
    });
}
export const updateName = (name) => ({type: 'UPDATE_NAME', name});