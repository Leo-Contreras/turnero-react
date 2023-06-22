import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCxV2kEfGd0HNa3k7clnIve89pC0GmFVEg",
    authDomain: "turnero-adbc.firebaseapp.com",
    projectId: "turnero-adbc",
    storageBucket: "turnero-adbc.appspot.com",
    messagingSenderId: "306996940648",
    appId: "1:306996940648:web:788d67244ccfc6f88a50dd",
    measurementId: "G-6EJ4RTE51Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)