// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfU0zl4aSuxbGjyWZZn5DgBX32we3iACg",
    authDomain: "two-birds-inventory.firebaseapp.com",
    databaseURL: "https://two-birds-inventory-default-rtdb.firebaseio.com",
    projectId: "two-birds-inventory",
    storageBucket: "two-birds-inventory.appspot.com",
    messagingSenderId: "361919319972",
    appId: "1:361919319972:web:b8674eb7d7f06fc23c7b31"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
export const database = getDatabase(firebase);