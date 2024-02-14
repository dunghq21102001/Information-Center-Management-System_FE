// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeqBdAzYdMFQuBM0tlcrnfkjMV2ySZ-oo",
    authDomain: "kidproedu-d505c.firebaseapp.com",
    projectId: "kidproedu-d505c",
    storageBucket: "kidproedu-d505c.appspot.com",
    messagingSenderId: "288692354749",
    appId: "1:288692354749:web:1b9218f8f2603f59edc1d4",
    measurementId: "G-640J8XX8C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const storage = getStorage(app)

const db = getFirestore(app)

export { storage, db }