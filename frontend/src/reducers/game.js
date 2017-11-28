import {
  FETCH_GAMES,
  GAMES_FETCHED,
  SELECT_GAME,
  GAME_SELECTED,
} from '../constants/ActionTypes';

export default function game(state = {players:[]}, action = {}) {
  console.log('Org Actions', action.type, action.payload)
  switch (action.type) {
    case GAMES_FETCHED:
      console.log({...state, games: action.payload, fetchingGames:false})
      return {...state, games: action.payload, fetchingGames:false}
    case FETCH_GAMES:
      return {...state, fetchingGames: true}
    case SELECT_GAME:
      return {...state, selected: action.payload._id }
    default:
      return state;
  }
}
