// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXTLbyI5Ab1DhrqKfiGcBzbUOoCkFJhQE",
  authDomain: "react-notes-872d0.firebaseapp.com",
  projectId: "react-notes-872d0",
  storageBucket: "react-notes-872d0.firebasestorage.app",
  messagingSenderId: "63305392288",
  appId: "1:63305392288:web:14ec4be1c1bfba77e5a9c5",
  measurementId: "G-87FQP60B7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")