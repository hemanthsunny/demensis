import { SET_AUTH_USER } from "../types";

export const SetAuthUser = (content) => {
	return {
		type: SET_AUTH_USER,
		payload: {
			authUser: content
		}
	}
}
