import {
  REGISTER_USER,
  REMOVE_USER,
  USER_LOGGEDIN,
  USER_LOGGEDOUT,
  LOGIN_USER,
  LOGOUT_USER,
  USER_AUTHENTICATED,
  CHECK_USER_AUTHENTICATED,
  AUTHENTICATION_FAILED
} from '../constants/ActionTypes';

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case CHECK_USER_AUTHENTICATED:
      return {...state, authenticating: true}
    case USER_AUTHENTICATED:
      return {...state, authenticated: true, authenticating: false}
    case AUTHENTICATION_FAILED:
      return {...state, authenticated: false, authenticating: false}
    default:
      return state;
  }
}
