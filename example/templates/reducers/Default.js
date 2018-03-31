import { Map } from 'immutable';
import * as mutate from '../utils/Mutators';

import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE
} from '../actions/Types';

const INITIAL_STATE = Map({
});

export default (state = INITIAL_STATE, action) => {
	
	const { payload } = action;
	//example reducer
	switch (action.type) {
		case LOGIN_SUCCESS: {
			return updateState(state, {
				user : payload,
				error : null
			});
		}
		case LOGIN_FAILURE: {
			return updateState(state, {
				user : null,
				error : payload.error || 'An error occured whilst logging in'
			});
		}
		default: {
			return state;
		}
	}
};
