const initialState = {
  list: [],
  newArticle: {name: ''},
  loading: false,
  message: undefined,
  rating: 0
};
const articlesReducer = (state = initialState, action) => {
  switch(action.type){
    case 'FETCH_ARTICLES_SUCCESS':{
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
      action.data['words'] = action.data.name.split(' ').length;
      return {
        list: state.list.concat(action.data),
        loading: false,
        message: undefined,
        newArticle: {name: ''},
        rating: action.data
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
      return {
        ...state,
        newArticle:{
          ...state.newArticle,
          name: action.name
        }
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