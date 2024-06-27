// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkHYWh4imndgc-KM9B2KBI5iyrOb_nI6A",
    authDomain: "pulse-chat-7f202.firebaseapp.com",
    projectId: "pulse-chat-7f202",
    storageBucket: "pulse-chat-7f202.appspot.com",
    messagingSenderId: "250266224273",
    appId: "1:250266224273:web:a7e39a31a1b49e80532130"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersCollection = collection(db, 'users')

export const roomsCollection = collection(db, 'rooms')