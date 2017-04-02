import {connect} from 'react-redux';
import ArticleList from './ArticleList.jsx';
import {deleteArticle, addArticle, updateName, updateRating} from '../actions/article.actions';

// Takes in the current store, returns a props
const mapStateToProps = ({articleLists}) => ({
  articles: articleLists.list || [],
  newArticle: articleLists.newArticle,
  loading: articleLists.loading
});

const mapDispatchToProps = (dispatch) => ({
  onDelete(articleId){
    dispatch(deleteArticle(articleId));
  },
  onAdd(){
    dispatch(addArticle());
  },
  onUpdateName(name){
    dispatch(updateName(name));
  },
  onUpdateRating(rating){
    dispatch(updateRating(rating));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);