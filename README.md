# Lecture Notes for Redux and React

## Array.prototype.reduce

`array.reduce(reducer, initialValue);`

Check out my reduce.wtf.js

Reducers should:

* accept the running accumulation and the current item
* return a new accumulation
* PERFORM NO SIDE EFFECTS

The logic of Redux is very similar. It's like an array reduce happening over time.

`currentState = allTheActionsUntilNow.reduce(reducer, initialState);`

The reducers define an initial state, and then define a simple operation: currentState + action = newState.

The recipe for a reducer is very simple:

```js
const initialState = {/* */}; // Could be any kind of value, but probably an object.
const myReducer = (state = initialState, action){
  switch(action.type){
    // If there is no applicable action, then just return the original state.
    default:
      return state;
  }
}
```

So what about actions?  Generally speaking, they should be simple objects that have at least a `type` parameter that will be a unique constant string.  For instance, if your state has a `name` variable, and you want to update it, you might create the following action creator:
```js
export const updateName = (name) => {
  return {
    type: 'UPDATE_NAME',
    name
  };
};
```

Then update your reducer:

```js
const initialState = {name: ''};

const myReducer = (state = initialState, action){
  switch(action.type){
    // If there's a name value, update that.
    case 'UPDATE_NAME':
      return {...state, name: action.name}
    // If there is no applicable action, then just return the original state.
    default:
      return state;
  }
}
```

Creating an app from your reducer logic requires two functions from Redux: `combineReducers`, and `createStore`.

```js
import {combineReducers, createStore} from 'redux';
import 'myReducer' from './reducers/myReducer';
import 'yourReducer' from './reducers/yourReducer';
const appLogic = combineReducers({
  mine: myReducer,
  yours: yourReducer
});

const store = createStore(appLogic);
```

This store is now ready to be attached to React.  But how does that work?

## Redux and React

It's very easy to think of Redux and React as being part of the same system, since they get mentioned together all the time, but in truth, a React/Redux app is like two apps fused together.  The same Redux app could be used in jQuery as could be used in React, and React could use any state management or no state management as it sees fit.  What links them is a library called `react-redux`.  React-Redux has really just two things you need to connect, which is pretty simple.  There's the Provider component, which wraps around your entire React app and binds it to a specific Redux store.

```js
import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

// App specific code
import {myReducer, yourReducer} from './reducers';
import App from './App.jsx';

// Construct the redux app
const reduxAppLogic = combineReducers({
  mine: myReducer,
  yours: yourReducer
});

const store = createStore(reduxAppLogic);

// Wrap the React app with the redux store
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('react-root');
)
```

Now, it's a matter of connecting specific components to data.  The components that you write should generally be really dumb, stateless components.  You can tell it's dumb if it can be written as a function.

```js
class SmartComp extends React.Component{
  constructor(props){
    super(props);
    // Clever stuff here
  }
  componentDidMount(){
    // Doin' some more cleverness.
    this.setState({clever: 'Obviously'});
  }
  upgradeCleverness(){
    this.setState({clever: `${this.state.clever} Totally`})
  }
  render(){
    return <div>
      <button onClick={this.upgradeCleverness.bind(this)}>Click My Cleverness</button>
      <p>{this.state.clever} Clever</p>
    </div>
  }
}

const DumbComp = ({dumbness}) => (<div>I'm only as smart as my {dumbness}</div>);
```

Dumb components are obviously a little more predictable, which is good.  Given the same set of props, it'll always produce the same result, no matter their state. React-Redux thrives on these kinds of components.  It provides a function called `connect` that lets you take specific state and actions from a given store and map them to props.

Let's look at a simple front-to-back example.

```js
/*
* ./actions/score.actions.js
*/
export const increment = () => ({type: 'INCREMENT'});
export const decrement = () => ({type: 'DECREMENT'});

/*
* ./reducers/score.reducers.js
*/
const initialState = 0;
const scoreReducer = (state = initialState, action) => {
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state
  }
}
export default scoreReducer;

/*
* ./index.jsx
*/

//Assume we did all the proper import statements

const scoreAppLogic = combineReducers({
  score: scoreReducer
});
const store = createStore(scoreAppLogic);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('react-root')
);

/*
App.jsx
*/
import React from 'react';
import {connect} from 'react-redux';
import {increment, decrement} from '../actions/score.actions';

const DumbComponent = ({score, onIncrement, onDecrement}) => (
  <div>
    <button onClick={onDecrement}>-</button>
    {score}
    <button onClick={onIncrement}>+</button>
  </div>
);

DumbComponent.propTypes = {
  score: React.PropTypes.number,
  onIncrement: React.PropTypes.func,
  onDecrement: React.PropTypes.func
};

// Now we create the logic to wrap the DumbComponent with redux.

// Map the store data to props
const mapStateToProps = (state) => {
  return {
    score: state.score
  };
};

// Map store actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement(){
      dispatch(increment());
    },
    onDecrement(){
      dispatch(decrement());
    }
  };
};

// Now create a higher order component function and wrap it around DumbComponent
const BoundComponent = connect(mapStateToProps, mapDispatchToProps)(DumbComponent);
export default BoundComponent as App;
```

Cool... but what about async?

## Async with Redux Middleware

The bad news is that we won't be able to do async or have any side effects with Redux as is.  The good news is that Redux provides a mechanism that can allow us to configure some async behavior: Middleware.  Middleware in Redux is a lot like middleware in Express: it intercepts the actions on dispatch.  We're going to use a middleware called Thunk.  What it does is intercepts the actions that are being dispatched, and if it's a function, it treats it as a "thunk".  That means it calls the function, passing `dispatch` and `getState` as parameters.  Here's a couple of example thunks.

```js
import axios from 'axios'; // Ajax library

export const fetchUsers = () => (dispatch) =>{
  dispatch({type: 'FETCH_USERS'});
  axios.get('/users')
    .then((response) => {
      dispatch({type: 'FETCH_USERS_SUCCESSFUL', data: response.data});
    }, (response) => {
      dispatch({type: 'FETCH_USERS_FAILURE', error: response.error});
    });
}

export const makeUser = () => (dispatch, getState) => {
  const newUser = getState().users.newUser;
  dispatch({type: 'CREATE_USER'});
  axios.post('/users', newUser)
    .then((response) => {
      dispatch({type: 'CREATE_USER_SUCCESS', data: response.data});
    },(response) => {
      dispatch({type: 'CREATE_USER_FAILURE', error: response.error});
    })
}
```

Now we can create async actions.  There are some amazing middleware packages, like Redux-Saga, Redux-Promise, and Redux-Observable.  I recommend Redux-Thunk for its simplicity, but I also recommend looking at Redux-Observable because I think Observables are amazing.