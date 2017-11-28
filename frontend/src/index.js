import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootEpic } from './epics';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push,
} from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'
import { Redirect } from 'react-router-dom'

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
// import NavBar from './components/navbar/navbar';
import Navbar from './containers/Navbar';
import LeftNavbar from './containers/LeftNavbar';
import Login from './containers/Login';
import RegisterUser from './containers/RegisterUser';
import Players from './containers/Players';
import './styles/theme.scss'
import {
  Grid,
  GridCell,
} from 'rmwc';


const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = applyMiddleware(thunk, epicMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

class PrivateRouteContainer extends React.Component {
  render() {
    const {
      isAuthenticated,
      component: Component,
      ...props
    } = this.props

    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated
            ? <Component {...props} />
            : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
          )
        }
      />
    )
  }
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={Navbar}/>
        <div style={{marginTop: "25px"}}>
          <Grid>
            <GridCell span="1">
              <Route path="/" component={LeftNavbar}/>
            </GridCell>
            <GridCell span="11">
              <Switch>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/registeruser" component={RegisterUser}/>
                  <Route exact path="/players" component={Players}/>
                  <Route exact path="/" component={App}/>
               {/*<Route component={Home}/>*/}
              </Switch>
            </GridCell>
          </Grid>
        </div>
      </div>
    </BrowserRouter>
</Provider>
), document.getElementById('root'));

registerServiceWorker();
