import {connect} from 'react-redux';
import TodoList from './ArticleList.jsx';
import {deleteArticle, addArticle, updateName} from '../actions/article.actions';

// Takes in the current store, returns a props
const mapStateToProps = ({asyncTodos}) => ({
  todos: asyncTodos.list || [],
  newTodo: asyncTodos.newTodo,
  loading:asyncTodos.loading
});

const mapDispatchToProps = (dispatch) => ({
  onDelete(todoId){
    dispatch(deleteArticle(todoId));
  },
  onAddTodo(){
    dispatch(addArticle());
  },
  onUpdateName(name){
    dispatch(updateName(name));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);