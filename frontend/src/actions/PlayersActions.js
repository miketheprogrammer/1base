import { FETCH_PLAYERS} from '../constants/ActionTypes';

export function fetchPlayers(payload) {
  return {
    type: FETCH_PLAYERS,
    payload
  };
}
