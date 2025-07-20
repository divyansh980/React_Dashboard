import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "API KEY ADD HERE",
  authDomain: "admindash.firebaseapp.com",
  projectId: "admindash",
  storageBucket: "admindash.firebasestorage.app",
  messagingSenderId: "",
  appId: "1:500779392983:web:",
  measurementId: "G-QCSWT7FK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


