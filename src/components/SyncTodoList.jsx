import {connect} from 'react-redux';
import TodoList from './TodoList.jsx';
import {deleteTodo, addTodo, completeTodo, updateName} from '../actions/syncTodo.actions';

// Takes in the current store, returns a props
const mapStateToProps = ({syncTodos}) => ({
  todos: syncTodos.list|| [],
  newTodo: syncTodos.newTodo,
  loading:false
});

const mapDispatchToProps = (dispatch) => ({
  onDelete(todoId){
    dispatch(deleteTodo(todoId));
  },
  onAddTodo(){
    dispatch(addTodo());
  },
  onCompleteTodo(todoId){
    dispatch(completeTodo(todoId));
  },
  onUpdateName(name){
    dispatch(updateName(name));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);