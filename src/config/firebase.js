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


export const initFirebaseUser = (bindAuthUser) => {
	auth.onAuthStateChanged(user => {
		const isAuthenticated = user != null;
		if (isAuthenticated) {
			user.getIdToken().then(accessToken => {
				user = user.toJSON();
				bindAuthUser(user);
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
  return auth.signInWithPopup(provider);
}

export const signout = () => {
	return auth.signOut().then(() => {
		window.sessionStorage.setItem("token", "");
	});
};

/* Common entries */
export const arrayAdd = firebase.firestore.FieldValue.arrayUnion;
export const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

/* Common code */
function formatResult(status, message, data={}) {
	return { status, message, data };
}

/* CRUD operations */
export const add = (collection, data) => {
	data['createdAt'] = new Date().getTime();
	data['updatedAt'] = new Date().getTime();
	return firestore.collection(collection).add(data)
		.then(res => formatResult(200, 'Successfully created', res))
		.catch(e => formatResult(500, 'Something went wrong'))
}

export const update = (collection, id, data) => {
	data['updatedAt'] = new Date().getTime();
	return firestore.collection(collection).doc(id).update(data)
		.then((res) => formatResult(200, 'Successfully updated', res))
		.catch(e => formatResult(422, e.message));
}

export const get = (collection, id="all") => {
	let snapshot = firestore.collection(collection).get();

	return snapshot.then((results) => {
			let object = []
			results.forEach(doc => {
				object.push({
					id: doc.id,
					...doc.data()
				})
			});
			return object.sort((a, b) => b.createdAt - a.createdAt);
		})
		.catch((err) => {
			console.error(err);
			return {error: err.code}
		});
}

export const getQuery = (customQuery=null) => {
	return customQuery.then((results) => {
			let object = []
			results.forEach(doc => {
				object.push({
					id: doc.id,
					...doc.data()
				})
			});
			return object.sort((a, b) => a.createdAt - b.createdAt);
		})
		.catch((err) => {
			console.error(err);
			return {error: err.code}
		});
}

export const getId = (collection, id) => {
	return firestore.collection(collection).doc(id).get()
		.then(doc => doc.exists ? doc.data() : formatResult(404, "No data found"))
		.catch((err) => formatResult(err.code, err.message));
}

export default firebase;
