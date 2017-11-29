import {
  FETCH_GAMES,
  GAMES_FETCHED,
  GOTO_GAME_SELECT,
  SELECT_GAME,
  GAME_SELECTED,
  CREATE_NEW_GAME,
  SAVE_NEW_GAME,
  CANCEL_CREATE_NEW_GAME,
} from '../constants/ActionTypes';

export function fetchGames(payload) {
    return {
        type: FETCH_GAMES,
        payload
    };
}

export function gamesFetched(payload) {
    return {
        type: GAMES_FETCHED,
        payload
    };
}

export function selectGame(payload) {
  return {
    type: SELECT_GAME,
    payload
  };
}

export function gameSelected() {
  return {
    type: GAME_SELECTED
  };
}

export function gotoGameSelect() {
  return {
    type: GOTO_GAME_SELECT
  }
}

export function createNewGame() {
  return {
    type: CREATE_NEW_GAME
  }
}

export function cancelCreateNewGame() {
  return {
    type: CANCEL_CREATE_NEW_GAME
  }
}

export function saveNewGame(payload) {
  return {
    type: SAVE_NEW_GAME,
    payload
  }
}
