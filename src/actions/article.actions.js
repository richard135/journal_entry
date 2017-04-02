import axios from 'axios';

export const addArticle = () => (dispatch, getState) => {
  axios.post('/articles', {
    name: getState().articleLists.newArticle.name,
    rating: getState().articleLists.rating,
    words: getState().articleLists.words,
    sentiment_score: getState().articleLists.sentiment_score
  })
    .then((response) => {
      dispatch({type:'ADD_ARTICLE_SUCCESS', data: response.data});
      axios.get('/articles')
      .then((response) => {
        dispatch({type: 'FETCH_ARTICLES_SUCCESS', list: response.data});
      }, () => {
        dispatch({type: 'FETCH_ARTICLES_FAILURE'});
      });
    }, () => {
      dispatch({type: 'ADD_ARTICLE_FAILURE'});
    });
};

export const fetchArticles = () => (dispatch) => {
  axios.get('/articles')
  .then((response) => {
    dispatch({type: 'FETCH_ARTICLES_SUCCESS', list: response.data});
  }, () => {
    dispatch({type: 'FETCH_ARTICLES_FAILURE'});
  });
}

export const updateName = (name) => ({
  type: 'UPDATE_NAME',
  name:name
});

export const updateRating = (rating) => ({
  type: 'UPDATE_RATING',
  rating:rating
});


