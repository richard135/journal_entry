const initialState = {
  list: [],
  newArticle: {name: ''},
  message: '',
  rating: 10,
  sentiment_score: 0,
  words: 0
};
//...State is to change the current state for immutability
const articlesReducer = (state = initialState, action) => {
  switch(action.type){
    case 'FETCH_ARTICLES_SUCCESS':{
      return {
        ...state, list: action.list
      };
    }
    case 'ADD_ARTICLE_SUCCESS':{
      return {
        list: state.list.concat(action.data),
        newArticle: {name: ''},
        rating: action.data.rating,
        sentiment_score: 0,
      };
    }
    case 'UPDATE_NAME':{
      return {
        ...state,
        newArticle:{
          ...state.newArticle,
          name: action.name
        },
        words: action.name.replace(/^\s+|\s+$/g,"").split(/\s+/).length
      };
    }
    case 'UPDATE_RATING':{
      return {
        ...state,
        rating: action.rating
      };
    }
    default: return state;
  }
}



export default articlesReducer;