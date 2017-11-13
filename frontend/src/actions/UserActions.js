import { REGISTER_USER, REMOVE_USER, LOGIN_USER, LOGOUT_USER } from '../constants/ActionTypes';

export function registerUser(payload) {
    return {
        type: REGISTER_USER,
        payload
    };
}

export function removeUser(payload) {
    return {
        type: REMOVE_USER,
        payload
    };
}

export function loginUser(payload) {
  return {
    type: LOGIN_USER,
    payload
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
