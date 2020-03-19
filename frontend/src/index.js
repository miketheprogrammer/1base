import React, { useCallback, useEffect, useMemo, } from 'react';
import { useDispatch, useSelector } from "react-redux";
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

import {createBrowserHistory} from 'history'
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
  selectOrganizations,
  selectSelectedOrganizationId,
} from './selectors/organization.selectors';
import {
  selectGames,
  selectSelectedGameId,
} from './selectors/game.selectors';
import {
  selectOrganizationIdParameter,
  selectGameIdParameter,
} from './selectors/router.selectors';
import {
  selectPlayers,
  selectSelectedPlayerId,
  selectPlayerCreateActive,
  selectPlayerSearchFilter,
} from '\./selectors/player.selectors';
import {
  selectUserAuthenticating,
  selectUserAuthenticated,
} from './selectors/user.selectors';
import {
  Grid,
  GridCell,
} from 'rmwc';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
const history = createBrowserHistory()
const epicMiddleware = createEpicMiddleware();
const createStoreWithMiddleware = applyMiddleware(epicMiddleware, thunk, logger, routerMiddleware(history))(createStore);
const reducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
});
const store = createStoreWithMiddleware(reducer);
epicMiddleware.run(rootEpic);


const PrivateRoute = (props) => {
  const dispatch = useDispatch();

  const {
    component: Component,
  } = props

  const userAuthenticated = useSelector((state) => {
    return state.user.authenticated;
  })

  const userAuthenticating = useSelector((state) => {
    return state.user.userAuthenticating
  });

  useEffect(() => {
    dispatch({type: 'CHECK_USER_AUTHENTICATED'});
  }, [userAuthenticated, userAuthenticating]);

  const organizationId = useSelector(
    useMemo(() => selectSelectedOrganizationId),
  );

  const gameId = useSelector(
    useMemo(() => selectSelectedGameId),
  )

  console.log(
    "authenticated:", userAuthenticated,
    "authenticating:", userAuthenticating,
    "organization selected:", organizationId,
  );

  console.log('private route props', props);

  if (userAuthenticating) {
    return (
      <Route
        {...props}
        render={props => this.wait()}
      />
    )
  }
  if (userAuthenticated) {
   
    if (!organizationId && window.location.pathname.search('/games') > 0) {
      // return this.redirectToOrganizationSelect(props)
    }
    if (!gameId && window.location.pathname.search('games') > 0) {
      // return this.redirectToGameSelect(props)
    }
    console.log('rendering route');
    console.log((
      <Route
        {...props}
        render={props => {
          return (
            <Component {...props} />
          )
        }}
      />
    ));
    return (
      <Route
        {...props}
        render={props => {
          return (
            <Component {...props} />
          )
        }}
      />
    )
  }
  return (<></>);
  // return (
  //   <Redirect to={{
  //     pathname: '/login',
  //     state: { from: props.location }
  //   }} />
  // );
}
// class PrivateRoute extends React.Component {

//   redirectToLogin(props) {
//     return (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }} />
//     )
//   }

//   redirectToPlayers(props) {
//     return (
//       <Redirect to={{
//         pathname: '/players',
//         state: { from: props.location }
//       }} />
//     )
//   }

//   redirectToOrganizationSelect(props) {
//     return (
//       <Redirect to={{
//         pathname: '/organizations',
//         state: { from: props.location }
//       }} />
//     )
//   }

//   displayOrganizationSelect(props) {
//     return (
//       <Organizations {...props}/>
//     )
//   }

//   redirectToGameSelect(props) {
//     return (
//       <Redirect to={{
//         pathname: '/games',
//         state: { from: props.location }
//       }} />
//     )
//   }

//   redirectToOrganizationSelect(props) {
//     return (
//       <Redirect to={{
//         pathname: '/organizations',
//         state: { from: props.location }
//       }} />
//     )
//   }

//   wait() {
//     return (<div>asdasdasd</div>)
//   }

//   renderOne() {
    
//     }
//     return this.redirectToLogin(props);
//   }

//   render() {
//     return this.renderOne();
//   }
// }

const SmartRouter = (props) => {
  const {
    component: Component,
  } = props

  const organizationId = useSelector(
    useMemo(() => selectSelectedOrganizationId),
  );

  const gameId = useSelector(
    useMemo(() => selectSelectedGameId),
  )

  return (
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={Navbar}/>
        <div className="content" style={{marginTop: "48px"}}>
          {(() => {
            if (gameId && organizationId)
              return (<PrivateRoute path="/" component={LeftNavbar}/>)
          })()}
          <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <PrivateRoute exact path="/organization/:org_id/game/:game_id/players" component={Players}/>
              <PrivateRoute exact path="/organization/:org_id/game/:game_id/players/:id" component={Players}/>
              <PrivateRoute exact path="/organization/:org_id/game/:game_id/player/:id/characters" component={Characters}/>
              <PrivateRoute exact path="/organization/:org_id/game/:game_id/player/:id/characters/:id" component={Characters}/>
              <PrivateRoute exact path="/organization/:org_id/games" component={Games}/>
              <PrivateRoute exact path="/organizations" component={Organizations}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/organization/:org_id/game/:game_id/character/:character_id/items" component={Items}/>
              <PrivateRoute exact path="/organization/:org_id/game/:game_id/character/:character_id/items/:id" component={Items}/>
              <PrivateRoute exact path="/" component={Organizations}/>
           {/*<Route component={Home}/>*/}
          </Switch>
        </div>
      </div>
    </ConnectedRouter>
  )
}

ReactDOM.render((
  <Provider store={store}>
    <SmartRouter></SmartRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker();
