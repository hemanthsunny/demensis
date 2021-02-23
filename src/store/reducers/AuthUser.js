import { SET_AUTH_USER } from "../types";

const INITIAL_STATE = {
	currentUser: {},
	authUser: {}
}

const app = (state=INITIAL_STATE, action) => {
	const { payload } = action;
	switch (action.type) {
		case SET_AUTH_USER: {
			return {
				...state,
				currentUser: payload.authUser.providerData[0],
				authUser: payload.authUser
			}
		}
		default:
			return state;
	}
}

export default app;
