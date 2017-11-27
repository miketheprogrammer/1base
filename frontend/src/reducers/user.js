import { REGISTER_USER, REMOVE_USER, USER_LOGGEDIN, USER_LOGGEDOUT, LOGIN_USER, LOGOUT_USER } from '../constants/ActionTypes';

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGEDIN:
      return {...state, loggedIn: true}
    default:
      return state;
  }
}
