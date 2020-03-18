import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { connect, Provider } from 'react-redux'
import * as reducers from './reducers';
import { createEpicMiddleware } from 'redux-observable';
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
  connectRouter,
} from 'connected-react-router'

import createHistory from 'history/createBrowserHistory'
import { Redirect } from 'react-router-dom'

import './index.scss';
import './styles/theme.scss'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
// import NavBar from './components/navbar/navbar';
import Navbar from './containers/Navbar';
import LeftNavbar from './containers/LeftNavbar';
import Login from './containers/Login';
import Register from './containers/Register';
import Players from './containers/Players';
import Organizations from './containers/Organizations';
import Games from './containers/Games';
import Dashboard from './containers/Dashboard';
import Characters from './containers/Characters'
import Items from './containers/Items';
import {
  Grid,
  GridCell,
} from 'rmwc';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
const history = createHistory()
const epicMiddleware = createEpicMiddleware();
const createStoreWithMiddleware = applyMiddleware(epicMiddleware, thunk, logger, routerMiddleware(history))(createStore);
const reducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
});
const store = createStoreWithMiddleware(reducer);
epicMiddleware.run(rootEpic);


class PrivateRouteContainer extends React.Component {

  componentDidMount() {
    if (this.props.dispatch) {
      console.log('mounting smart router and tetching user');
      this.props.dispatch({type: 'CHECK_USER_AUTHENTICATED'});
    }
  }

  renderComponent(Component, props) {
    return (
      <Component {...props} />
    )
  }
  redirectToLogin(props) {
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  }

  redirectToPlayers(props) {
    return (
      <Redirect to={{
        pathname: '/players',
        state: { from: props.location }
      }} />
    )
  }

  redirectToOrganizationSelect(props) {
    return (
      <Redirect to={{
        pathname: '/organizations',
        state: { from: props.location }
      }} />
    )
  }

  displayOrganizationSelect(props) {
    return (
      <Organizations {...props}/>
    )
  }

  redirectToGameSelect(props) {
    return (
      <Redirect to={{
        pathname: '/games',
        state: { from: props.location }
      }} />
    )
  }

  redirectToOrganizationSelect(props) {
    return (
      <Redirect to={{
        pathname: '/organizations',
        state: { from: props.location }
      }} />
    )
  }

  wait() {
    return (<div>asdasdasd</div>)
  }

  renderOne() {
    const {
      authenticated,
      authenticating,
      organizationSelected,
      gameSelected,
      component: Component,
      ...props
    } = this.props
    if (authenticating) {
      return (
        <Route
          {...props}
          render={props => this.wait()}
        />
      )
    }
    if (authenticated) {
      console.log(
      "authenticated:", authenticated,
      "organization selected:", organizationSelected,
      "am I true?", window.location.pathname !== '/' && window.location.pathname != '/organizations'
     )
      if (window.location.pathname !== '/' && window.location.pathname != '/organizations' && !organizationSelected) {
        return this.redirectToOrganizationSelect(props);
      }

      if (!organizationSelected && window.location.pathname !== '/organizations') {
        return this.redirectToOrganizationSelect(props)
      }
      if (!gameSelected && ['/games', '/organizations'].indexOf(window.location.pathname) === -1) {
        return this.redirectToGameSelect(props)
      }
      return (
        <Route
          {...props}
          render={props => this.renderComponent(Component, props)}
        />
      )
    }
    return this.redirectToLogin(props);
  }

  render() {
    return this.renderOne();
  }
}
const PrivateRoute = connect(state => {
  console.log('Private Route State');
  return ({
    authenticated: Boolean(state.user.authenticated),
    authenticating: state.user.authenticating === undefined
                      ? true
                      : state.user.authenticating,
    organizationSelected: state.organization.selected || false,
    gameSelected: state.game.selected || false,
  })
})(PrivateRouteContainer)

class SmartRouterContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.setState({});
    this.fetched = false;
  }

  render() {
    const {
      gameSelected,
      organizationSelected,
      component: Component,
      ...props
    } = this.props

    return (
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={Navbar}/>
          <div class="content" style={{marginTop: "48px"}}>
            {(() => {
              if (gameSelected && organizationSelected)
                return (<PrivateRoute path="/" component={LeftNavbar}/>)
            })()}
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <PrivateRoute exact path="/players" component={Players}/>
                <PrivateRoute exact path="/players/:id" component={Players}/>
                <PrivateRoute exact path="/characters" component={Characters}/>
                <PrivateRoute exact path="/characters/:id" component={Characters}/>
                <PrivateRoute exact path="/games" component={Games}/>
                <PrivateRoute exact path="/organizations" component={Organizations}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/items" component={Items}/>
                <PrivateRoute exact path="/items/:id" component={Items}/>
                <PrivateRoute exact path="/" component={Organizations}/>
             {/*<Route component={Home}/>*/}
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    )
  }
}
const SmartRouter = connect((state) => ({
  organizationSelected: state.organization.selected || false,
  gameSelected: state.game.selected || false,
}))(SmartRouterContainer)

ReactDOM.render((
  <Provider store={store}>
    <SmartRouter></SmartRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker();
