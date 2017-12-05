import {
  FETCH_ITEMS,
  CREATE_NEW_ITEM,
  CANCEL_CREATE_NEW_ITEM,
  SAVE_NEW_ITEM,
  SELECT_ITEM,
  SEARCH_ITEMS,
} from '../constants/ActionTypes';

export function fetchItems(payload) {
  return {
    type: FETCH_ITEMS,
    payload
  }
}

export function searchItems(searchFilter) {
  return {
    type: SEARCH_ITEMS,
    payload: {searchFilter}
  }
}

export function createNewItem() {
  return {
    type: CREATE_NEW_ITEM
  }
}
export function cancelCreateNewItem() {
  return {
    type: CANCEL_CREATE_NEW_ITEM
  }
}

export function saveNewItem(payload) {
  return {
    type: SAVE_NEW_ITEM,
    payload
  }
}

export function selectItem(_id){
  return {
    type: SELECT_ITEM,
    payload: {_id}
  }
}
