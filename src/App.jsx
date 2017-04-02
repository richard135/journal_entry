import React from 'react';
import ArticleList from './components/ArticleHandlers.jsx';
import {connect} from 'react-redux';
import {fetchArticles} from './actions/article.actions.js'
class App extends React.Component{
  componentDidMount(){
    this.props.onFetchArticles();
  }
  render(){
    return <div>
      <h2>Please enter your article</h2>
      <ArticleList/>
    </div>
  }
}

App.propTypes = {
  onFetchArticles: React.PropTypes.func
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  onFetchArticles(){
    dispatch(fetchArticles());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);