// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqxbqMX593v0XBDcllCRa7EG7fhX_k1bU",
  authDomain: "fitfriends-c2d18.firebaseapp.com",
  projectId: "fitfriends-c2d18",
  storageBucket: "fitfriends-c2d18.firebasestorage.app",
  messagingSenderId: "803718837210",
  appId: "1:803718837210:web:8581313003ae19aef406e3",
  measurementId: "G-TFE7TZX4C1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Firestore initialization

export { auth, provider, signInWithPopup, signOut, db  };