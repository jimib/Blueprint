import {
	LOGIN_FAILURE,
} from './Types';

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const loginFailed = data => ({
  type: LOGIN_FAILURE,
  payload: data
});