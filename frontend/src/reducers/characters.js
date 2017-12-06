import {
  CHARACTER_SELECTED,
  SELECT_CHARACTER,
} from '../constants/ActionTypes';

export default function characters(state = {characters:[]}, action = {}) {
  switch (action.type) {
    case CHARACTER_SELECTED:
      return {...state, selectedCharacter: action.payload._id}
    default:
      return state;
  }
}
