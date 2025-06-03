import { initializeApp, getApps} from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAhODf-WrCxvpeAJ4WREuqAoNbgbC3VSHA",
    authDomain: "dentiexpress-13f08.firebaseapp.com",
    databaseURL: "https://dentiexpress-13f08-default-rtdb.firebaseio.com",
    projectId: "dentiexpress-13f08",
    storageBucket: "dentiexpress-13f08.firebasestorage.app",
    messagingSenderId: "519490753699",
    appId: "1:519490753699:web:8c40a57d7ef0b07e991b16"
  };
  
// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);
