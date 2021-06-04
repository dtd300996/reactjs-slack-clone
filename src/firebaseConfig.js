import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyCbe0lh5pngyWBKGFxatTNVcIhxsa0UEzI',
	authDomain: 'slack-clone-2fb81.firebaseapp.com',
	projectId: 'slack-clone-2fb81',
	storageBucket: 'slack-clone-2fb81.appspot.com',
	messagingSenderId: '577867170567',
	appId: '1:577867170567:web:84fa9707a33ab918b2fba2',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
