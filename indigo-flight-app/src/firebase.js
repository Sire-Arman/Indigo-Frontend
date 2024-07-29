// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDBwRH0v2QyBVCIaIAF1o3YU_wy0bJh45w",
  authDomain: "indigo-flight-app.firebaseapp.com",
  projectId: "indigo-flight-app",
  storageBucket: "indigo-flight-app.appspot.com",
  messagingSenderId: "460156525443",
  appId: "1:460156525443:web:ed3eebdfaf54ad0a0074b6",
  measurementId: "G-EFFBYLVW6N"
};
const fapp = initializeApp(firebaseConfig);
const messaging = getMessaging(fapp);
export  { messaging, getToken, onMessage };