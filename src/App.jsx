import React from 'react';
import AsyncTodoList from './components/AsyncTodoList.jsx';
import {connect} from 'react-redux';
import {fetchTodos} from './actions/asyncTodo.actions'
class App extends React.Component{
  componentDidMount(){
    this.props.onFetchTodos();
  }
  render(){
    return <div>
      <h2>Please enter your article</h2>
      <AsyncTodoList/>
    </div>;
  }
}
App.propTypes = {
  onFetchTodos: React.PropTypes.func
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  onFetchTodos(){
    dispatch(fetchTodos());
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
