import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0U3t4amExpQWPg9LAqIm7GfapF27dO2Q",
  authDomain: "signal-aecf1.firebaseapp.com",
  projectId: "signal-aecf1",
  storageBucket: "signal-aecf1.appspot.com",
  messagingSenderId: "394481880606",
  appId: "1:394481880606:web:f770b95fc5d469a617a80f",
  measurementId: "G-19XFDQF9V6"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export  const db= getFirestore();