// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB3cOJZmsHBb63t-0_mKZgmznyTQj-VAN4",
  authDomain: "react-crud-5f137.firebaseapp.com",
  projectId: "react-crud-5f137",
  storageBucket: "react-crud-5f137.firebasestorage.app",
  messagingSenderId: "571076740428",
  appId: "1:571076740428:web:af2867ca219396dbb6fbe9",
  measurementId: "G-Q24J4VF088"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);
signInAnonymously(auth).catch(err=>console.error("anonymous sign-in failed:",err));