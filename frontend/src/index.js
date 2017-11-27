import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootEpic } from './epics';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import NavBar from './components/navbar/navbar';
import Login from './containers/Login';
import RegisterUser from './containers/RegisterUser';
import Players from './containers/Players';

const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = applyMiddleware(thunk, epicMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/registeruser" component={RegisterUser}/>
            <Route exact path="/players" component={Players}/>
            <Route exact path="/" component={App}/>
         {/*<Route component={Home}/>*/}
        </Switch>
      </div>
    </BrowserRouter>
</Provider>
), document.getElementById('root'));

registerServiceWorker();
