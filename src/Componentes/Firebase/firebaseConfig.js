import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPKHwMVftCUJfHHPEUFI8vQ0Iw8XN22LI",
    authDomain: "turnero-a9c0e.firebaseapp.com",
    projectId: "turnero-a9c0e",
    storageBucket: "turnero-a9c0e.appspot.com",
    messagingSenderId: "350137652889",
    appId: "1:350137652889:web:fd4f2d7eab7d9499c90a08",
    measurementId: "G-N8NC2PBTGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)