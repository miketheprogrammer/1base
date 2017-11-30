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
  CREATE_NEW_ORGANIZATION,
  CREATING_NEW_ORGANIZATION,
  NEW_ORGANIZATION_SAVED,
  SAVE_NEW_ORGANIZATION,
  CREATE_NEW_GAME,
  CREATING_NEW_GAME,
  NEW_GAME_SAVED,
  SAVE_NEW_GAME,
  CREATE_NEW_PLAYER,
  CREATING_NEW_PLAYER,
  NEW_PLAYER_SAVED,
  SAVE_NEW_PLAYER,
} from '../constants/ActionTypes';
import Request from '../api/json/api-json';
import { push } from 'react-router-redux';
const localStorage = window.localStorage;

// USER EPICS
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

// PLAYER EPICS
export const fetchPlayers = action$ =>
  action$
    .filter(action => action.type === FETCH_PLAYERS)
    .mergeMap(action =>
      Request.get('/players?game='+action.payload.game_id)
        .map((result)=>{return {type: PLAYERS_FETCHED, payload: result};})
      );

  export const saveNewPlayer = action$ =>
    action$
      .filter(action => action.type === SAVE_NEW_PLAYER)
      .mergeMap(action =>
        Request.post('/players', action.payload)
        .map((result) => { return {type: NEW_PLAYER_SAVED, payload: result}; })
    );

  export const fetchPlayersOnNewPlayerSave = action$ =>
    action$
      .filter(action => action.type === NEW_PLAYER_SAVED)
      .map((result) => {
        return {type: FETCH_PLAYERS, payload: {game_id: localStorage.getItem('1base.game_id')}}
      });

// AUTHENTICATION EPICS
export const checkUserAuthenticated = action$ =>
action$
  .filter(action => action.type === CHECK_USER_AUTHENTICATED)
  .mergeMap(action =>
    Request.get('/whoami')
    .map((result) => { if (result && result.result) return {type: USER_AUTHENTICATED}; else return {type: AUTHENTICATION_FAILED} })
);

// ORGANIZATION EPICS
export const fetchOrganizations = action$ =>
action$
  .filter(action => action.type === FETCH_ORGANIZATIONS)
  .mergeMap(action =>
    Request.get('/organizations')
    .map((result) => { return {type: ORGANIZATIONS_FETCHED, payload: result} })
);

export const selectOrganization = action$ =>
  action$
    .filter(action => action.type === SELECT_ORGANIZATION)
    .map((action) => { return {type: ORGANIZATION_SELECTED, payload: action.payload}; });

export const organizationSelected = action$ =>
  action$
    .filter(action => action.type === ORGANIZATION_SELECTED)
    .map((action) => {localStorage.setItem('1base.organization_id', action.payload._id); return push({url: '/games', pathname:'/games'}) });

export const saveNewOrganization = action$ =>
  action$
    .filter(action => action.type === SAVE_NEW_ORGANIZATION)
    .mergeMap(action =>
      Request.post('/organizations', action.payload)
      .map((result) => { return {type: NEW_ORGANIZATION_SAVED, payload: result}; })
  );

export const fetchOrganizationsOnNewOrganizationSave = action$ =>
  action$
    .filter(action => action.type === NEW_ORGANIZATION_SAVED)
    .map(action => {
      return {type: FETCH_ORGANIZATIONS}
    });

// GAMES EPICS
export const fetchGames = action$ =>
action$
  .filter(action => action.type === FETCH_GAMES)
  .mergeMap(action =>
    Request.get('/games?organization=' + action.payload.organization_id)
    .map((result) => { return {type: GAMES_FETCHED, payload: result} })
);

export const selectGame = action$ =>
  action$
    .filter(action => action.type === SELECT_GAME)
    .map((action) => { return {type: GAME_SELECTED, payload: action.payload}; });

export const gameSelected = action$ =>
  action$
    .filter(action => action.type === GAME_SELECTED)
    .map((action) => {
      localStorage.setItem('1base.game_id', action.payload._id);
      return push({url: '/players', pathname:'/players'})
    });

export const saveNewGame = action$ =>
  action$
    .filter(action => action.type === SAVE_NEW_GAME)
    .mergeMap(action =>
      Request.post('/games', action.payload)
      .map((result) => { return {type: NEW_GAME_SAVED, payload: result}; })
  );

export const fetchGamesOnNewGameSave = action$ =>
  action$
    .filter(action => action.type === NEW_GAME_SAVED)
    .map((result) => {
      return {type: FETCH_GAMES, payload: {organization_id: localStorage.getItem('1base.organization_id')}}
    });
// NAVIGATION EPICS
export const gotoGameSelect = action$ =>
  action$
    .filter(action => action.type === GOTO_GAME_SELECT)
    .map((action) => {
      return push({url: '/games', pathname:'/games'})
    });

export const gotoOrganizationSelect = action$ =>
  action$
    .filter(action => action.type === GOTO_ORGANIZATION_SELECT)
    .map((action) => {
      return push({url: '/organizations', pathname:'/organizations'})
    });

// ROUTER EPICS
export const setOrganizationIdIfUrlId = action$ =>
  action$
    .filter(action => action.type === '@@router/LOCATION_CHANGE')
    .filter(action => action.payload.pathname.search('/organizations/') > -1)
    .map((action) => {
      return {type: SELECT_ORGANIZATION, payload: {_id: action.payload.pathname.split('/organizations/')[1]}}
    });

export const setGameIdIfUrlId = action$ =>
  action$
    .filter(action => action.type === '@@router/LOCATION_CHANGE')
    .filter(action => action.payload.pathname.search('/games/') > -1)
    .map((action) => {
      return {type: SELECT_GAME, payload: {_id: action.payload.pathname.split('/games/')[1]}}
    });

export const clearStateOnOrganizationsPageLoad = action$ =>
    action$
      .filter(action => action.type === '@@router/LOCATION_CHANGE')
      .filter(action => action.payload.pathname.search('/organizations') > -1)
      .map((action) => {
        localStorage.removeItem('1base.organization_id');
        localStorage.removeItem('1base.game_id');
        return {type: 'NOOP'}
      });

export const clearStateOnGamesPageLoad = action$ =>
    action$
      .filter(action => action.type === '@@router/LOCATION_CHANGE')
      .filter(action => action.payload.pathname.search('/games') > -1)
      .map((action) => {
        localStorage.removeItem('1base.game_id');
        return {type: 'NOOP'}
      });

// COMBINE EPICS
export const rootEpic = combineEpics(
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
  saveNewGame,
  fetchGamesOnNewGameSave,
  gotoOrganizationSelect,
  gotoGameSelect,
  setOrganizationIdIfUrlId,
  saveNewOrganization,
  fetchOrganizationsOnNewOrganizationSave,
  clearStateOnOrganizationsPageLoad,
  clearStateOnGamesPageLoad,
  saveNewPlayer,
  fetchPlayersOnNewPlayerSave,
  
);
