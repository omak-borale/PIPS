// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "pips-app-vnphg",
  "appId": "1:844945116973:web:21b10427234de1479b0da4",
  "storageBucket": "pips-app-vnphg.firebasestorage.app",
  "apiKey": "AIzaSyBx_qH9_2wFEvX5JR9aQFDMDfRyp-cZRuU",
  "authDomain": "pips-app-vnphg.firebaseapp.com",
  "measurementId": "G-SDBGD9C24J",
  "messagingSenderId": "844945116973",
  "databaseURL": "https://pips-app-vnphg-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

export { app, db };
