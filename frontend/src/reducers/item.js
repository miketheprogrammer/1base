import {
  FETCH_ITEMS,
  ITEMS_FETCHED,
  CREATE_NEW_ITEM,
  CANCEL_CREATE_NEW_ITEM,
  NEW_ITEM_SAVED,
  SELECT_ITEM,
  ITEM_SELECTED,
  ITEM_LIST_LOADED,
  USER_LOGGEDOUT,
  SEARCH_ITEMS,
} from '../constants/ActionTypes';

export default function items(state = {items:[]}, action = {}) {
  console.log('Item State', state);
  switch (action.type) {
    case ITEMS_FETCHED:
      return {...state, items: action.payload.result, fetchingItems:false}
    case FETCH_ITEMS:
      return {...state, fetchingItems: true}
    case CREATE_NEW_ITEM:
      return {...state, creating: true}
    case CANCEL_CREATE_NEW_ITEM:
      return {...state, creating: false}
    case NEW_ITEM_SAVED:
      return {...state, creating: false}
    case ITEM_SELECTED:
      return {...state, selected: action.payload._id}
    case ITEM_LIST_LOADED:
      return {...state, selected: undefined}
    case SEARCH_ITEMS:
      return {...state, searchFilter: action.payload.searchFilter}
    case USER_LOGGEDOUT:
      return {}
    default:
      return state;
  }
}
