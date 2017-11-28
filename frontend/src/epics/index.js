import Rx from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { PLAYERS_FETCHED, FETCH_PLAYERS, INCREMENT_COUNTER, DECREMENT_COUNTER, REFRESH_COUNTER, COUNTER_REFRESHED, INCREMENT_COUNTER_IF_ODD, REGISTER_USER, USER_REGISTERED, REMOVE_USER, USER_REMOVED, LOGIN_USER, USER_LOGGEDIN, LOGOUT_USER, USER_LOGGEDOUT} from '../constants/ActionTypes';
import Request from '../api/json/api-json';

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
      .map((result) => { return {type: COUNTER_REFRESHED, payload: result}; })
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

export const fetchPlayers = action$ =>
  action$
    .filter(action => action.type === FETCH_PLAYERS)
    .mergeMap(action =>
      Request.get('/players?game=82256d20-d3bd-11e7-860f-1f59d7818213')
        .map((result)=>{return {type: PLAYERS_FETCHED, payload: result.result};})
      );

export const rootEpic = combineEpics(
  incrementEpic,
  decrementEpic,
  refreshEpic,
  incrementIfOdd,
  registerUser,
  loginUser,
  fetchPlayers
);
