import {
  FETCH_PLAYERS,
  PLAYERS_FETCHED,
  CREATE_NEW_PLAYER,
  CANCEL_CREATE_NEW_PLAYER,
  NEW_PLAYER_SAVED,
  SELECT_PLAYER,
  PLAYER_SELECTED
} from '../constants/ActionTypes';

export default function players(state = {players:[]}, action = {}) {
  console.log('Player State', state);
  switch (action.type) {
    case PLAYERS_FETCHED:
      return {...state, players: action.payload.result, fetchingPlayers:false}
    case FETCH_PLAYERS:
      return {...state, fetchingPlayers: true}
    case CREATE_NEW_PLAYER:
      return {...state, creating: true}
    case CANCEL_CREATE_NEW_PLAYER:
      return {...state, creating: false}
    case NEW_PLAYER_SAVED:
      return {...state, creating: false}
    case PLAYER_SELECTED:
      return {...state, selection: action.payload._id}
    default:
      return state;
  }
}
