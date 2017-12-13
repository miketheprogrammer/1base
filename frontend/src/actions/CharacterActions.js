import {
  FETCH_CHARACTERS,
  CREATE_NEW_CHARACTER,
  CANCEL_CREATE_NEW_CHARACTER,
  SAVE_NEW_CHARACTER,
  SELECT_CHARACTER,
  SEARCH_CHARACTERS,
} from '../constants/ActionTypes';

export function fetchCharacters(payload) {
  return {
    type: FETCH_CHARACTERS,
    payload
  }
}

export function searchCharacters(searchFilter) {
  return {
    type: SEARCH_CHARACTERS,
    payload: {searchFilter}
  }
}

export function createNewCharacter() {
  return {
    type: CREATE_NEW_CHARACTER
  }
}
export function cancelCreateNewCharacter() {
  return {
    type: CANCEL_CREATE_NEW_CHARACTER
  }
}

export function saveNewCharacter(payload) {
  return {
    type: SAVE_NEW_CHARACTER,
    payload
  }
}

export function selectCharacter(_id){
  return {
    type: SELECT_CHARACTER,
    payload: {_id}
  }
}
