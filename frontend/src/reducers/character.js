import{
  FETCH_CHARACTERS,
  CREATE_NEW_CHARACTER,
  CANCEL_CREATE_NEW_CHARACTER,
  CHARACTER_SELECTED,
  SEARCH_CHARACTERS,
  CHARACTERS_FETCHED,
  NEW_CHARACTER_SAVED,
  CHARACTERLIST_LOADED,
  USER_LOGGEDOUT
} from '../constants/ActionTypes';


export default function characters(state = {characters:[]}, action = {}) {
  switch (action.type) {
    case CHARACTERS_FETCHED:
      return {...state, characters: action.payload.result, fetchingPlayers:false}
    case FETCH_CHARACTERS:
      return {...state, fetchingCharacters: true}
    case CREATE_NEW_CHARACTER:
      return {...state, creating: true}
    case CANCEL_CREATE_NEW_CHARACTER:
      return {...state, creating: false}
    case NEW_CHARACTER_SAVED:
      return {...state, creating: false}
    case CHARACTER_SELECTED:
      return {...state, selectedCharacter: action.payload._id}
    case CHARACTERLIST_LOADED:
      return {...state, selectedCharacter: undefined}
    case SEARCH_CHARACTERS:
      return {...state, searchFilter: action.payload.searchFilter}
    case USER_LOGGEDOUT:
      return {}
    default:
      return state;
  }
}
