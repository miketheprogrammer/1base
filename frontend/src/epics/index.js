import * as Rx from 'rxjs';
import * as x from 'rxjs-compat';
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
  SELECT_PLAYER,
  PLAYER_SELECTED,
  PLAYERLIST_LOADED,
  SEARCH_PLAYERS,
  CREATE_NEW_ITEM,
  CREATING_NEW_ITEM,
  NEW_ITEM_SAVED,
  SAVE_NEW_ITEM,
  SELECT_ITEM,
  ITEM_SELECTED,
  ITEM_LIST_LOADED,
  SEARCH_ITEMS,
  ITEMS_FETCHED,
  FETCH_ITEMS,
  FETCH_CHARACTERS,
  CHARACTERS_FETCHED,
  SEARCH_CHARACTERS,
  CREATE_NEW_CHARACTER,
  CREATING_NEW_CHARACTER,
  SAVE_NEW_CHARACTER,
  NEW_CHARACTER_SAVED,
  CANCEL_CREATE_NEW_CHARACTER,
  SELECT_CHARACTER,
  CHARACTER_SELECTED,
  CHARACTERLIST_LOADED,
} from '../constants/ActionTypes';
import Request from '../api/json/api-json';
import { push } from 'connected-react-router';
const localStorage = window.localStorage;

// USER EPICS
export const registerUser = action$ =>
action$
  .filter(action => action.type === REGISTER_USER)
  .mergeMap(action =>
    Request.post('/register', action.payload)
    .map((result) => { return {type: USER_REGISTERED, payload: result}; })
  );

export const onUserRegistered = action$ =>
action$
  .filter(action => action.type === USER_REGISTERED)
  .map(() => push({pathname: '/login'}));

export const loginUser = action$ =>
action$
  .filter(action => action.type === LOGIN_USER)
  .mergeMap(action =>
    Request.post('/login', action.payload)
    .map((result) => { return {type: USER_LOGGEDIN, payload: result}; })
);

// export const userLoggedIn = action$ =>
//   action$
//     .filter(action => action.type === USER_LOGGEDIN)
//     .map((action) => { return {type: USER_AUTHENTICATED}; });

export const userLoggedIn = action$ =>
  action$
    .filter(action => action.type === USER_LOGGEDIN)
    .map(() => push({pathname: '/organizations'}));

export const logOutUser = action$ =>
  action$
    .filter(action => action.type === LOGOUT_USER)
    .map((action) => {
      localStorage.clear();
      return action;
    })
    .mergeMap(action =>
      Request.get('/logout')
        .map((result) => { return {type: USER_LOGGEDOUT}; })
      )
export const onUserLoggedOut = action$ =>
  action$
    .filter(action => action.type === USER_LOGGEDOUT)
    .map((action) => { return push({pathname: '/login'}) });
// PLAYER EPICS
export const fetchPlayers = action$ =>
  action$
    .filter(action => action.type === FETCH_PLAYERS)
    .mergeMap(action =>
      Request.get('/players?game='+action.payload.game_id)
        .map((result)=>{return {type: PLAYERS_FETCHED, payload: result};})
      );

export const searchPlayers = action$ =>
  action$
    .filter(action => action.type === SEARCH_PLAYERS)
    .mergeMap(action =>
      Request.get(`/players?game=${localStorage.getItem('1base.game_id')}&search=${action.payload.searchFilter}`)
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

export const selectPlayer = action$ =>
  action$
    .filter(action => action.type === SELECT_PLAYER)
    .map((action) => { return {type: 'NOOP'};});

//Character EPICS
export const fetchCharacters = action$ =>
  action$
    .filter(action => action.type === FETCH_CHARACTERS)
    .mergeMap(action =>
      Request.get('/characters?game='+action.payload.game_id)
        .map((result)=>{return {type: CHARACTERS_FETCHED, payload: result};})
      );

export const searchCharacters = action$ =>
  action$
    .filter(action => action.type === SEARCH_CHARACTERS)
    .mergeMap(action =>
      Request.get(`/characters?game=${localStorage.getItem('1base.game_id')}&search=${action.payload.searchFilter}`)
        .map((result)=>{return {type: CHARACTERS_FETCHED, payload: result};})
      );


export const saveNewCharacter = action$ =>
  action$
    .filter(action => action.type === SAVE_NEW_CHARACTER)
    .mergeMap(action =>
      Request.post('/characters', action.payload)
      .map((result) => { return {type: NEW_CHARACTER_SAVED, payload: result}; })
  );

export const fetchCharactersOnNewCharacterSave = action$ =>
  action$
    .filter(action => action.type === NEW_CHARACTER_SAVED)
    .map((result) => {
      return {type: FETCH_CHARACTERS, payload: {game_id: localStorage.getItem('1base.game_id')}}
    });

export const selectCharacter = action$ =>
  action$
    .filter(action => action.type === SELECT_CHARACTER)
    .map((action) => { return { type: 'NOOP' } });

// Item EPICS
export const fetchItems = action$ =>
  action$
    .filter(action => action.type === FETCH_ITEMS)
    .mergeMap(action =>
      Request.get('/items?game='+localStorage.getItem('1base.game_id'))
        .map((result)=>{return {type: ITEMS_FETCHED, payload: result};})
      );

export const searchItems = action$ =>
  action$
    .filter(action => action.type === SEARCH_ITEMS)
    .mergeMap(action =>
      Request.get(`/items?game=${localStorage.getItem('1base.game_id')}&search=${action.payload.searchFilter}`)
        .map((result)=>{return {type: ITEMS_FETCHED, payload: result};})
      );


export const saveNewItem = action$ =>
  action$
    .filter(action => action.type === SAVE_NEW_ITEM)
    .mergeMap(action => {
      let body = action.payload;
      body.game = body.game || localStorage.getItem('1base.game_id');
      return Request.post('/items', body)
      .map((result) => { return {type: NEW_ITEM_SAVED, payload: result}; })
    });

export const fetchItemsOnNewItemSave = action$ =>
  action$
    .filter(action => action.type === NEW_ITEM_SAVED)
    .map((result) => {
      return {type: FETCH_ITEMS, payload: {game_id: localStorage.getItem('1base.game_id')}}
    });

export const selectItem = action$ =>
  action$
    .filter(action => action.type === SELECT_ITEM)
    .map((action) => {return push({url: `/items/${action.payload._id}`, pathname:`/items/${action.payload._id}`}) });


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
    .map((action) => {localStorage.setItem('1base.organization_id', action.payload._id); return {type: 'NOOP'}; });

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
    Request.get('/games?organization=' + action.payload.organizationId)
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
      return {type: 'NOOP'};
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
export const gotoGameSelect = (action$) =>
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

export const setCharacterIdIfUrlId = action$ =>
  action$
  .filter(action => action.type === '@@router/LOCATION_CHANGE')
  .filter(action => action.payload.location.pathname.search('/characters') > -1)
  .map((action) => {
    const characterIdPath= action.payload.location.pathname.split('/characters/')[1]
    if(characterIdPath){
      console.log("ROUTE WORKING MUFFUCKA", characterIdPath)
    return {type: CHARACTER_SELECTED, payload: {_id: action.payload.location.pathname.split('/characters/')[1]}}
  }else{
    return {type:CHARACTERLIST_LOADED}
  }
  });

export const setPlayerIdIfUrlId = action$ =>
  action$
    .filter(action => action.type === '@@router/LOCATION_CHANGE')
    .filter(action => action.payload.location.pathname.search('/players') > -1)
    .map((action) => {
      const playerIdPath= action.payload.location.pathname.split('/players/')[1]
      if(playerIdPath){
      return {type: PLAYER_SELECTED, payload: {_id: action.payload.location.pathname.split('/players/')[1]}}
    }else{
      return {type:PLAYERLIST_LOADED}
    }
    });

export const setItemIdIfUrlId = action$ =>
  action$
    .filter(action => action.type === '@@router/LOCATION_CHANGE')
    .filter(action => action.payload.location.pathname.search('/items') > -1)
    .map((action) => {
      const itemIdPath= action.payload.location.pathname.split('/items/')[1]
      if(itemIdPath){
      return {type: ITEM_SELECTED, payload: {_id: action.payload.location.pathname.split('/items/')[1]}}
    }else{
      return {type:ITEM_LIST_LOADED}
    }
    });

export const setOrganizationIdIfUrlId = action$ =>
  action$
    .filter(action => action.type === '@@router/LOCATION_CHANGE')
    .filter(action => action.payload.location.pathname.search('/organizations/') > -1)
    .map((action) => {
      return {type: SELECT_ORGANIZATION, payload: {_id: action.payload.location.pathname.split('/organizations/')[1]}}
    });

export const setGameIdIfUrlId = action$ =>
  action$
    .filter(action => action.type === '@@router/LOCATION_CHANGE')
    .filter(action => action.payload.location.pathname.search('/games/') > -1)
    .map((action) => {
      return {type: SELECT_GAME, payload: {_id: action.payload.location.pathname.split('/games/')[1]}}
    });

export const clearStateOnOrganizationsPageLoad = action$ =>
    action$
      .filter(action => action.type === '@@router/LOCATION_CHANGE')
      .filter(action => action.payload.location.pathname.search('/organizations') > -1)
      .map((action) => {
        localStorage.removeItem('1base.organization_id');
        localStorage.removeItem('1base.game_id');
        return {type: 'NOOP'}
      });

export const clearStateOnGamesPageLoad = action$ =>
    action$
      .filter(action => action.type === '@@router/LOCATION_CHANGE')
      .filter(action => action.payload.location.pathname.search('/games') > -1)
      .map((action) => {
        localStorage.removeItem('1base.game_id');
        return {type: 'NOOP'}
      });

export const logger = action$ =>
    action$
      .filter(action => action.type === '@@router/LOCATION_CHANGE')
      .filter(action => action.payload.location.pathname.search('/games') > -1)
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
  selectPlayer,
  setPlayerIdIfUrlId,
  onUserRegistered,
  logOutUser,
  onUserLoggedOut,
  searchPlayers,
  setItemIdIfUrlId,
  fetchItems,
  searchItems,
  saveNewItem,
  fetchItemsOnNewItemSave,
  selectItem,
  setCharacterIdIfUrlId,
  fetchCharacters,
  fetchCharactersOnNewCharacterSave,
  selectCharacter,
  saveNewCharacter,
  searchCharacters,
  
);
