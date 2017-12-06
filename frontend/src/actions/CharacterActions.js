import {
  SELECT_CHARACTER,
} from '../constants/ActionTypes'

export function selectCharacter(_id){
  return {
    type: SELECT_CHARACTER,
    payload: {_id}
  }
}
