import { REGISTER_USER, REMOVE_USER, LOGIN_USER, LOGOUT_USER } from '../constants/ActionTypes';

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

export function loginUser() {
  return {
    type: LOGIN_USER
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
