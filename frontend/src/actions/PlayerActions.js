import {
  FETCH_PLAYERS,
  CREATE_NEW_PLAYER,
  CANCEL_CREATE_NEW_PLAYER,
  SAVE_NEW_PLAYER,
} from '../constants/ActionTypes';

export function fetchPlayers(payload) {
  return {
    type: FETCH_PLAYERS,
    payload
  }
}

export function createNewPlayer() {
  return {
    type: CREATE_NEW_PLAYER
  }
}
export function cancelCreateNewPlayer() {
  return {
    type: CANCEL_CREATE_NEW_PLAYER
  }
}

export function saveNewPlayer(payload) {
  return {
    type: SAVE_NEW_PLAYER,
    payload
  }
}
