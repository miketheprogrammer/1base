import {
  FETCH_ORGANIZATIONS,
  ORGANIZATIONS_FETCHED,
  SELECT_ORGANIZATION,
  ORGANIZATION_SELECTED,
  GOTO_ORGANIZATION_SELECT,
  CREATE_NEW_ORGANIZATION,
  CANCEL_CREATE_NEW_ORGANIZATION,
  NEW_ORGANIZATION_SAVED,
  USER_LOGGEDIN
} from '../constants/ActionTypes';

export default function organization(state = {players:[]}, action = {}) {
  console.log('Org Actions', action.type, action.payload, state);
  switch (action.type) {
    case USER_LOGGEDIN:
      return {...state, selected: undefined}
    case '@@redux/INIT':
      return {...state, selected: window.localStorage.getItem('1base.organization_id')}
    case ORGANIZATIONS_FETCHED:
      console.log({...state, organizations: action.payload.result, fetchingOrganizations:false})
      return {...state, organizations: action.payload.result, fetchingOrganizations:false}
    case FETCH_ORGANIZATIONS:
      return {...state, fetchingOrganizations: true}
    case SELECT_ORGANIZATION:
      return {...state, selected: action.payload._id }
    case GOTO_ORGANIZATION_SELECT:
      return {...state, selected: undefined}
    case CREATE_NEW_ORGANIZATION:
      return {...state, creating: true}
    case CANCEL_CREATE_NEW_ORGANIZATION:
      return {...state, creating: false}
    case NEW_ORGANIZATION_SAVED:
      return {...state, creating: false}
    default:
      return state;
  }
}
