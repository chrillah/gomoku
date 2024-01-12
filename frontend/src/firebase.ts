import { getDatabase } from 'firebase/database'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALesBH1iHEDA8ngIcTzoeAVKU_5-qoMP0",
  authDomain: "gomoku-grupp3.firebaseapp.com",
  databaseURL: "https://gomoku-grupp3-default-rtdb.firebaseio.com",
  projectId: "gomoku-grupp3",
  storageBucket: "gomoku-grupp3.appspot.com",
  messagingSenderId: "574925857554",
  appId: "1:574925857554:web:0caf874e31419f3e8689cb",
  measurementId: "G-5P0C1MM2WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getDatabase(app)
