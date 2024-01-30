// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8LT8JPVhsfzv3v-lnfVecqDdyrDDatM0",
    authDomain: "kid-pro-edu-bf507.firebaseapp.com",
    projectId: "kid-pro-edu-bf507",
    storageBucket: "kid-pro-edu-bf507.appspot.com",
    messagingSenderId: "620120262028",
    appId: "1:620120262028:web:59263d7c1f851e5d9d02a9",
    measurementId: "G-YQ4LXEFRHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore } from 'firebase/firestore'

export const db = getFirestore(app)