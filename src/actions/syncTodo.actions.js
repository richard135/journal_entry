export const deleteTodo = (id) => ({type: 'DELETE_TODO', id});
export const addTodo = () => ({type: 'ADD_TODO'});
export const completeTodo = (id) => ({type: 'COMPLETE_TODO', id});
export const updateName = (name) => ({type: 'UPDATE_NAME', name});