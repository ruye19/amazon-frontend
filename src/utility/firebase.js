
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCerOms-S2QbRbwp43_eWI7MFOjAiCepC0",
  authDomain: "clone-35cea.firebaseapp.com",
  projectId: "clone-35cea",
  storageBucket: "clone-35cea.firebasestorage.app",
  messagingSenderId: "325736875040",
  appId: "1:325736875040:web:8194f617cb96c509356845"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);