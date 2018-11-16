import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyByO_7gjKis8iBKHyAMWLy0naT5d0e50VY",
    authDomain: "reactfirebase-a8b43.firebaseapp.com",
    databaseURL: "https://reactfirebase-a8b43.firebaseio.com",
    projectId: "reactfirebase-a8b43",
    storageBucket: "reactfirebase-a8b43.appspot.com",
    messagingSenderId: "601685206379"
  };
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const userRef = databaseRef.child("users");
export const authRef = firebase.auth();
