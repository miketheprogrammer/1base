import { FETCH_GAMES, GAMES_FETCHED, SELECT_GAME, GAME_SELECTED } from '../constants/ActionTypes';

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
