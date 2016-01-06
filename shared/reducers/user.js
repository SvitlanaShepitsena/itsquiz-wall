import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR } from 'constants';

export default function user(state={
  isWaiting: false,
  authenticated: false }, action={}) {
  switch (action.type) {
    case MANUAL_LOGIN:
      return Object.assign({}, state, {
        isWaiting: true
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case SIGNUP:
      return Object.assign({}, state, {
        isWaiting: true
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case SIGNUP_ERROR:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case LOGOUT:
      return Object.assign({}, state, {
        isWaiting: true
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case LOGOUT_ERROR:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    default:
      return state;
  }
}
