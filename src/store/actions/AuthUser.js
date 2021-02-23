import { SET_AUTH_USER } from "../types";

/* crud options from firebase config */
import { getQuery, firestore, add } from "config/firebase";

const getDatabaseUser = (query) => {
	return getQuery(firestore.collection("users").where("email", "==", query.email).get());
}

export const SetAuthUser = (authUser) => {
	return (dispatch) => {
		getDatabaseUser({email: authUser.email}).then(async (res) => {
			if (!res[0]) {
				let args = {
					name: authUser.displayName,
					email: authUser.email,
					mobile: authUser.phoneNumber,
					image: authUser.photoURL,
					emailVerified: authUser.emailVerified,
					lastLoginAt: authUser.lastLoginAt
				}
				await add("users", args);
				res = await getDatabaseUser({email: authUser.email});
			}
			dispatch({
				type: SET_AUTH_USER,
				payload: {
					authUser,
					currentUser: res[0]
				}
			});
		});
	}
}
