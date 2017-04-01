const initialState = {
  list: [],
  newTodo: {name: ''},
  loading: false,
  message: undefined
};
const asyncTodoReducer = (state = initialState, action) => {
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
      return {
        list: state.list.concat(action.data),
        loading: false,
        message: undefined,
        newTodo: {name: ''}
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
        newTodo:{
          ...state.newTodo,
          name: action.name
        }
      };
    }
    default: return state;
  }
}

export default asyncTodoReducer;