// Application entrypoint.

// Load up the application styles
// require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import App from './App.jsx';
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk';
const store = createStore(reducers, applyMiddleware(thunkMiddleware));
render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('react-root'));
