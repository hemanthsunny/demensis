import fb from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = fb.firestore();


export const initFirebaseUser = () => {
	auth.onAuthStateChanged(user => {
		const isAuthenticated = user != null;
		if (isAuthenticated) {
			user.getIdToken().then(accessToken => {
				user = user.toJSON();
				setToken(accessToken);
			})
		} else {
			setToken("");
		}
	});
};

export const setToken = accessToken => {
	window.sessionStorage.setItem("token", accessToken);
};

export const googleSignin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/plus.login");
  return auth.signInWithPopup(provider).then(() => {
    window.location.reload();
  });
}

export const signout = () => {
	return auth.signOut().then(() => {
		window.sessionStorage.setItem("token", "");
	});
};
