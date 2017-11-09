import React, { Component } from 'react';
import CounterApp from './CounterApp';
import { createStore, applyMiddleware, combineReducers } from '../lib/rx-redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootEpic } from '../epics';

// We should think of refactoring apply middleware to be an argument of createStore

const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterApp />
      </Provider>
    );
    // return (
    //   <Provider store={store}>
    //     {() => <CounterApp />}
    //   </Provider>
    // );
  }
}
