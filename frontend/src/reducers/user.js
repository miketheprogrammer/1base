import { REGISTER_USER, REMOVE_USER, USER_LOGGEDIN, USER_LOGGEDOUT, LOGIN_USER, LOGOUT_USER } from '../constants/ActionTypes';
import * as _ from 'lodash';

export function registerUser() {
    return {
        type: REGISTER_USER
    };
}

export function removeUser() {
    return {
        type: REMOVE_USER
    };
}
export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGEDIN:
      return {...state, loggedIn: true}
    default:
      return state;
  }
}

/*      case INCREMENT_COUNTER:
          return state + 1;
      case DECREMENT_COUNTER:
          return state - 1;
      case COUNTER_REFRESHED:
          return state = action.payload.counter;
      default:
          return state;
  }
}
export const LOGIN_USER = 'LOGIN_USER';
export const USER_LOGGEDIN = 'USER_LOGGEDIN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const USER_LOGGEDOUT = 'USER_LOGGEDOUT';

*/
