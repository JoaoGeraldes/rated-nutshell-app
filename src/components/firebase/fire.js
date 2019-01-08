import firebase from 'firebase';

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

const fire = firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const provider_fb = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export default fire;
