import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzbaZnMX2SRJo6RZtb_G-36Bt9hPzw5eM",
  authDomain: "admindash-749f2.firebaseapp.com",
  projectId: "admindash-749f2",
  storageBucket: "admindash-749f2.firebasestorage.app",
  messagingSenderId: "500779392983",
  appId: "1:500779392983:web:356f2b48e7fe135f2cf592",
  measurementId: "G-QCSWTKQ7FK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


