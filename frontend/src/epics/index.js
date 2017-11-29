import Rx from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import {
  PLAYERS_FETCHED,
  FETCH_PLAYERS,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  REFRESH_COUNTER,
  COUNTER_REFRESHED,
  INCREMENT_COUNTER_IF_ODD,
  REGISTER_USER,
  USER_REGISTERED,
  REMOVE_USER,
  USER_REMOVED,
  LOGIN_USER,
  USER_LOGGEDIN,
  LOGOUT_USER,
  USER_LOGGEDOUT,
  CHECK_USER_AUTHENTICATED,
  USER_AUTHENTICATED,
  AUTHENTICATION_FAILED,
  ORGANIZATIONS_FETCHED,
  FETCH_ORGANIZATIONS,
  SELECT_ORGANIZATION,
  ORGANIZATION_SELECTED,
  GAMES_FETCHED,
  FETCH_GAMES,
  SELECT_GAME,
  GAME_SELECTED,
  GOTO_ORGANIZATION_SELECT,
  GOTO_GAME_SELECT,
} from '../constants/ActionTypes';
import Request from '../api/json/api-json';
import { push } from 'react-router-redux';
const localStorage = window.localStorage;
export const incrementEpic = action$ =>
  action$
    .filter(action => action.type === INCREMENT_COUNTER)
    .mergeMap(action =>
      Request.get('/counter/increment')
      .map(() => { return {type: 'NOOP'};})
    );

export const decrementEpic = action$ =>
  action$
    .filter(action => action.type === DECREMENT_COUNTER)
    .mergeMap(action =>
        Request.get('/counter/decrement')
        .map(() => {return {type: 'NOOP'};})
    );

export const refreshEpic = action$ =>
  action$
    .filter(action => action.type === REFRESH_COUNTER)
    .mergeMap(action =>
      Request.get('/counter')
      .map((result) => { return {type: COUNTER_REFRESHED,
        payload: result}; })
    );

export const incrementIfOdd = action$ =>
  action$
    .filter(action => action.type === INCREMENT_COUNTER_IF_ODD)
    .map(() => { return {type: INCREMENT_COUNTER}; });

export const registerUser = action$ =>
action$
  .filter(action => action.type === REGISTER_USER)
  .mergeMap(action =>
    Request.post('/register', action.payload)
    .map((result) => { return {type: USER_REGISTERED, payload: result}; })
  );

export const loginUser = action$ =>
action$
  .filter(action => action.type === LOGIN_USER)
  .mergeMap(action =>
    Request.post('/login', action.payload)
    .map((result) => { return {type: USER_LOGGEDIN, payload: result}; })
);

export const userLoggedIn = action$ =>
  action$
    .filter(action => action.type === USER_LOGGEDIN)
    .map((action) => { return {type: USER_AUTHENTICATED}; });

export const fetchPlayers = action$ =>
  action$
    .filter(action => action.type === FETCH_PLAYERS)
    .mergeMap(action =>
      Request.get('/players?game='+action.payload.game_id)
        .map((result)=>{return {type: PLAYERS_FETCHED, payload: result.result};})
      );

export const checkUserAuthenticated = action$ =>
action$
  .filter(action => action.type === CHECK_USER_AUTHENTICATED)
  .mergeMap(action =>
    Request.get('/whoami')
    .map((result) => { if (result.result) return {type: USER_AUTHENTICATED}; else return {type: AUTHENTICATION_FAILED} })
);

export const fetchOrganizations = action$ =>
action$
  .filter(action => action.type === FETCH_ORGANIZATIONS)
  .mergeMap(action =>
    Request.get('/organizations')
    .map((result) => { return {type: ORGANIZATIONS_FETCHED, payload: result.result} })
);

export const selectOrganization = action$ =>
  action$
    .filter(action => action.type === SELECT_ORGANIZATION)
    .map((action) => { return {type: ORGANIZATION_SELECTED, payload: action.payload}; });

export const organizationSelected = action$ =>
  action$
    .filter(action => action.type === ORGANIZATION_SELECTED)
    .map((action) => {localStorage.setItem('1base.organization_id', action.payload._id); return push({url: '/games', pathname:'/games'}) });

export const fetchGames = action$ =>
action$
  .filter(action => action.type === FETCH_GAMES)
  .mergeMap(action =>
    Request.get('/games?organization=' + action.payload.organization_id)
    .map((result) => { return {type: GAMES_FETCHED, payload: result.result} })
);

export const selectGame = action$ =>
  action$
    .filter(action => action.type === SELECT_GAME)
    .map((action) => { return {type: GAME_SELECTED, payload: action.payload}; });

export const gameSelected = action$ =>
  action$
    .filter(action => action.type === GAME_SELECTED)
    .map((action) => {localStorage.setItem('1base.game_id', action.payload._id); return push({url: '/players', pathname:'/players'}) });

export const gotoGameSelect = action$ =>
  action$
    .filter(action => action.type === GOTO_GAME_SELECT)
    .map((action) => {localStorage.removeItem('1base.game_id'); return push({url: '/games', pathname:'/games'}) });

export const gotoOrganizationSelect = action$ =>
  action$
    .filter(action => action.type === GOTO_ORGANIZATION_SELECT)
    .map((action) => {localStorage.removeItem('1base.organization_id'); return push({url: '/organizations', pathname:'/organizations'}) });

export const rootEpic = combineEpics(
  incrementEpic,
  decrementEpic,
  refreshEpic,
  incrementIfOdd,
  registerUser,
  loginUser,
  fetchPlayers,
  userLoggedIn,
  checkUserAuthenticated,
  fetchOrganizations,
  selectOrganization,
  organizationSelected,
  fetchGames,
  selectGame,
  gameSelected,
  gotoOrganizationSelect,
  gotoGameSelect,
);
