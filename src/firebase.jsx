// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTxAfp9GxDotBczYRsaw-CrTjRQwqE4tw",
  authDomain: "calendar-test-abfc6.firebaseapp.com",
  projectId: "calendar-test-abfc6",
  storageBucket: "calendar-test-abfc6.firebasestorage.app",
  messagingSenderId: "629846927933",
  appId: "1:629846927933:web:d4ef409a9ccc10a7075854",
  measurementId: "G-3W56TBDVEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};