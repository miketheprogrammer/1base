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
import Organizations from './containers/Organizations';
import Games from './containers/Games';
import './styles/theme.scss'
import {
  Grid,
  GridCell,
} from 'rmwc';


const history = createHistory()
const epicMiddleware = createEpicMiddleware(rootEpic);
const createStoreWithMiddleware = applyMiddleware(thunk, epicMiddleware, routerMiddleware(history))(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);


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
    return (<div></div>)
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
    console.log({
      authenticated,
      authenticating,
      organizationSelected,
      ...props
    })
    if (authenticating) {
      return (
        <Route
          {...props}
          render={props => this.wait()}
        />
      )
    }
    if (authenticated) {
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
const PrivateRoute = connect(state => ({
  authenticated: Boolean(state.user.authenticated),
  authenticating: state.user.authenticating === undefined
                    ? true
                    : state.user.authenticating,
  organizationSelected: state.organization.selected || false,
  gameSelected: state.game.selected || false,
}))(PrivateRouteContainer)

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
        <body>
          <Route path="/" component={Navbar}/>
          <div class="content mdc-toolbar-fixed-adjust" style={{marginTop: "48px"}}>
            {(() => {
              if (gameSelected && organizationSelected)
                return (<PrivateRoute path="/" component={LeftNavbar}/>)
            })()}
            <Switch>
                <Route exact path="/login" component={Login}/>
                <PrivateRoute exact path="/registeruser" component={RegisterUser}/>
                <PrivateRoute exact path="/players" component={Players}/>
                <PrivateRoute exact path="/players/:id" component={Players}/>
                <PrivateRoute exact path="/games" component={Games}/>
                <PrivateRoute exact path="/organizations" component={Organizations}/>
                <PrivateRoute exact path="/" component={Organizations}/>
             {/*<Route component={Home}/>*/}
            </Switch>
          </div>
        </body>
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
