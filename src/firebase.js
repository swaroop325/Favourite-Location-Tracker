import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBbCghBXCJMiaGFQS-jSh_3t0-FP-HRgq0",
    authDomain: "fav-location-tracker.firebaseapp.com",
    databaseURL: "https://fav-location-tracker.firebaseio.com",
    projectId: "fav-location-tracker",
    storageBucket: "fav-location-tracker.appspot.com",
    messagingSenderId: "153323060946",
    appId: "1:153323060946:web:d0d12b593c377c3148f70b"
  };
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();