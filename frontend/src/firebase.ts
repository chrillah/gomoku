import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCJ6NUbIQ3kC8bImsRjsoJcubFtE3D-wJM",
  authDomain: "gomoku-database.firebaseapp.com",
  databaseURL: "https://gomoku-database-default-rtdb.firebaseio.com",
  projectId: "gomoku-database",
  storageBucket: "gomoku-database.appspot.com",
  messagingSenderId: "1068701156586",
  appId: "1:1068701156586:web:e91e034c717665c5dd0393",
  measurementId: "G-YH8MLEDBJQ"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getDatabase(app)
