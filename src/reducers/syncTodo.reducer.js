/*
State shape, 
list: Todo[]
newTodo: Todo (blank)
*/
let index = 1;
const makeNewTodo = () => ({
  name: '',
  completed: false
});
const initialState = {
  list: [{name: 'Prepare Redux Lecture', completed: false, id: 0}],
  newTodo: makeNewTodo()
};
const syncTodoReducer = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_TODO':{
      // Create a new todo and add it to the list
      const newId = index++;
      const newList = state.list.concat({
        name: state.newTodo.name,
        completed: state.newTodo.completed,
        id: newId
      });
      return {
        list: newList,
        newTodo: makeNewTodo()
      };
    }
    case 'DELETE_TODO':{
      const newList = state.list.filter((todo) => todo.id !== action.id);
      return {
        ...state,
        list: newList
      };
    }
    case 'COMPLETE_TODO':{
      const newList = state.list.map((todo) => (todo.id === action.id)?({ ...todo, completed: true}):todo)
      return {
        ...state,
        list: newList
      };
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

export default syncTodoReducer;