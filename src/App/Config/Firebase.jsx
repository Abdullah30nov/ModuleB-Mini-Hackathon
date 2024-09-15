// import { getAuth } from "f/irebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAyUMZuXEbw_HcNS1XgM2PSGqZLXc8wQUE",
  authDomain: "react-hackathon-6f970.firebaseapp.com",
  projectId: "react-hackathon-6f970",
  storageBucket: "react-hackathon-6f970.appspot.com",
  messagingSenderId: "137969475887",
  appId: "1:137969475887:web:c518cdb83a4468cd7581da"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
export {auth,database}