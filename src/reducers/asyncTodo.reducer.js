const initialState = {
  list: [],
  newTodo: {name: ''},
  loading: false,
  message: undefined
};
const asyncTodoReducer = (state = initialState, action) => {
  switch(action.type){
    case 'ASYNC_FETCH_TODOS':{
      return {
        ...state, loading: true
      };
    }
    case 'ASYNC_FETCH_TODOS_SUCCESS':{
      return {
        ...state, list: action.list, loading: false, message: undefined
      };
    }
    case 'ASYNC_ADD_TODO':{
      return {...state, loading: true, message: undefined};
    }
    case 'ASYNC_ADD_TODO_SUCCESS':{
      return {
        list: state.list.concat(action.data), 
        loading: false, 
        message: undefined, 
        newTodo: {name: ''}
      };
    }
    case 'ASYNC_DELETE_TODO':{
      return {...state, loading:true};
    }
    case 'ASYNC_DELETE_TODO_SUCCESS':{
      return {...state, 
        list: state.list.filter(todo => todo.id !== action.id),
        loading: false,
        message: undefined
      };
    }
    case 'ASYNC_COMPLETE_TODO':{
      return {...state, loading:true};
    }
    case 'ASYNC_COMPLETE_TODO_SUCCESS':{
      return {
        ...state,
        list: state.list.map((todo) => (todo.id === action.id)?
          {...todo, completed: true}:
          todo),
        loading: false,
        message: undefined
      };
    }
    case 'ASYNC_DELETE_TODO_FAILURE':
    case 'ASYNC_FETCH_TODOS_FAILURE':
    case 'ASYNC_ADD_TODO_FAILURE':
    case 'ASYNC_COMPLETE_TODO_FAILURE':{
      return {...state, loading: false, message: 'There was a fetch error'};
    }
    case 'ASYNC_UPDATE_NAME':{
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