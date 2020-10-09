import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB9e2oIFK7IDm6eGr-O67e3KEuKSY9GYUU",
    authDomain: "whatsapp-mern-4b017.firebaseapp.com",
    databaseURL: "https://whatsapp-mern-4b017.firebaseio.com",
    projectId: "whatsapp-mern-4b017",
    storageBucket: "whatsapp-mern-4b017.appspot.com",
    messagingSenderId: "94932016191",
    appId: "1:94932016191:web:6e33061cbf7991ddb5ec8a"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
  auth,
  provider
};
