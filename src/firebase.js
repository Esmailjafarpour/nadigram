import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
     apiKey: "AIzaSyB7zbQnHqwAaPvaOCCl50OokTZPIvtlRMk",
     authDomain: "nadigram-828f0.firebaseapp.com",
     projectId: "nadigram-828f0",
     storageBucket: "nadigram-828f0.appspot.com",
     messagingSenderId: "946901785654",
     appId: "1:946901785654:web:93135841cd02f5c78d0c97"
   }).auth();