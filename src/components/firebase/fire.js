import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBmxHvDAiVPDMIqyn527cU1mKqVNGZAcuY",
    authDomain: "nutshell-c3c29.firebaseapp.com",
    databaseURL: "https://nutshell-c3c29.firebaseio.com",
    projectId: "nutshell-c3c29",
    storageBucket: "nutshell-c3c29.appspot.com",
    messagingSenderId: "387038001834"
};

const fire = firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const provider_fb = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export default fire;
