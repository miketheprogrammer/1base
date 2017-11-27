import { FETCH_PLAYERS, PLAYERS_FETCHED} from '../constants/ActionTypes';

export default function players(state = {players:[]}, action = {}) {
  switch (action.type) {
    case PLAYERS_FETCHED:
      console.log({...state, players: action.payload, fetchingPlayers:false})
      return {...state, players: action.payload, fetchingPlayers:false}
    case FETCH_PLAYERS:
      return {...state, fetchingPlayers: true}
    default:
      return state;
  }
}
