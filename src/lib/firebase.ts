import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASg-a51EQUOYB4CWSs0xz2CtcwxQZvZaQ",
  authDomain: "finances-4eb6d.firebaseapp.com",
  projectId: "finances-4eb6d",
  storageBucket: "finances-4eb6d.appspot.com",
  messagingSenderId: "1026945988331",
  appId: "1:1026945988331:web:f805a6ed486a0838b070ae",
  measurementId: "G-BLHD1H5JZB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export const database = getFirestore(app);
export const storage = getStorage(app);