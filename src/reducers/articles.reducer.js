const initialState = {
  list: [],
  newArticle: {name: ''},
  loading: false,
  message: undefined,
  rating: 0,
  sentiment_score: 0,
  words: 0
};
const articlesReducer = (state = initialState, action) => {
  switch(action.type){
    case 'FETCH_ARTICLES':{
      return {
        ...state, loading: true
      };
    }
    case 'FETCH_ARTICLES_SUCCESS':{
      return {
        ...state, list: action.list, loading: false, message: undefined
      };
    }
    case 'ADD_ARTICLE':{
      return {...state, loading: true, message: undefined};
    }
    case 'ADD_ARTICLE_SUCCESS':{
      console.log("This is success data", action.data)
      return {
        list: state.list.concat(action.data),
        loading: false,
        message: undefined,
        newArticle: {name: ''},
        rating: 10,
        sentiment_score: 0,
      };
    }
    case 'DELETE_ARTICLE':{
      return {...state, loading:true};
    }
    case 'DELETE_ARTICLE_SUCCESS':{
      return {...state,
        list: state.list.filter(article => article.id !== action.id),
        loading: false,
        message: undefined
      };
    }
    case 'DELETE_ARTICLE_FAILURE':
    case 'FETCH_ARTICLES_FAILURE':
    case 'ADD_ARTICLE_FAILURE':{
      return {...state, loading: false, message: 'There was a fetch error'};
    }
    case 'UPDATE_NAME':{
      console.log ('This is UPDATE NAME', action)
      return {
        ...state,
        newArticle:{
          ...state.newArticle,
          name: action.name
        },
        words: action.name.split(' ').length
      };
    }
    case 'UPDATE_RATING':{
      console.log('Rating actio====>', action)
      return {
        ...state,
        rating: action.rating
      };
    }
    default: return state;
  }
}

export default articlesReducer;