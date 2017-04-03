import React from 'react';
import ArticleList from './components/ArticleHandlers.jsx';
import {connect} from 'react-redux';
import {fetchArticles} from './actions/article.actions.js';

class App extends React.Component{
  componentDidMount(){
    this.props.onFetchArticles();
  }
  render(){
    return <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Journal Entry Sentiment Analysis</a>
          </div>
        </div>
      </nav>
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

