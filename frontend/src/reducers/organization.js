import {
  FETCH_ORGANIZATIONS,
  ORGANIZATIONS_FETCHED,
  SELECT_ORGANIZATION,
  ORGANIZATION_SELECTED,
  GOTO_ORGANIZATION_SELECT,
} from '../constants/ActionTypes';

export default function organization(state = {players:[]}, action = {}) {
  console.log('Org Actions', action.type, action.payload)
  switch (action.type) {
    case '@@redux/INIT':
      return {...state, selected: window.localStorage.getItem('1base.organization_id')}
    case ORGANIZATIONS_FETCHED:
      console.log({...state, organizations: action.payload, fetchingOrganizations:false})
      return {...state, organizations: action.payload, fetchingOrganizations:false}
    case FETCH_ORGANIZATIONS:
      return {...state, fetchingOrganizations: true}
    case SELECT_ORGANIZATION:
      return {...state, selected: action.payload._id }
    case GOTO_ORGANIZATION_SELECT:
      return {...state, selected: undefined}
    default:
      return state;
  }
}
