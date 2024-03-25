// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmysREWJFaA4_BNaqhRr2XcEkzsYYtFh0",
    authDomain: "instagram-clone-b25bd.firebaseapp.com",
    projectId: "instagram-clone-b25bd",
    storageBucket: "instagram-clone-b25bd.appspot.com",
    messagingSenderId: "716179051630",
    appId: "1:716179051630:web:55e1c10c2941da4024427f"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };