// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl3mNARCDs-bh-aIE6xs_mcqpYrJ-gl8o",
  authDomain: "greennest-store.firebaseapp.com",
  projectId: "greennest-store",
  storageBucket: "greennest-store.firebasestorage.app",
  messagingSenderId: "414384944915",
  appId: "1:414384944915:web:22e18ee0b1e0074f5d4ce6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);