import firebase from 'firebase'
import "firebase/auth";
import "firebase/database";

var config = {
    apiKey: "AIzaSyByuTcTjIv3I74eLaXfe-fP_1hEyj-kTgA",
    authDomain: "ensemble-7df30.firebaseapp.com",
    databaseURL: "https://ensemble-7df30-default-rtdb.firebaseio.com/",
  };
firebase.initializeApp(config);


export const auth = firebase.auth;
export const db = firebase.database();