import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJWhPQbQ84x5Inp9yoautv5yfwru18ZZg",
  authDomain: "desadigital-2a941.firebaseapp.com",
  projectId: "desadigital-2a941",
  storageBucket: "desadigital-2a941.appspot.com",
  messagingSenderId: "8611182099",
  appId: "1:8611182099:web:0775432f991d7a4eef71e6",
  measurementId: "G-778EPWCJZY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);


export { app, db, storage };
