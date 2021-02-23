import { SET_APP } from "../types";

const INITIAL_STATE = {
	app: {}
}

const app = (state=INITIAL_STATE, action) => {
	const { payload } = action;
	switch (action.type) {
		case SET_APP: {
			return {
				...state,
				app: payload.app
			}
		}
		default:
			return state;
	}
}

export default app;
