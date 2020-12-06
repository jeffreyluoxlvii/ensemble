import firebase from 'firebase'
import "firebase/auth";
import "firebase/database";

var config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "ensemble-7df30.firebaseapp.com",
    databaseURL: "https://ensemble-7df30-default-rtdb.firebaseio.com/",
  };
firebase.initializeApp(config);


export const auth = firebase.auth;
export const db = firebase.database();