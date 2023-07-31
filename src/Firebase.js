// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAh_1giwvkU-w-YM_FKr16e2VrWLXN2-WU",
  authDomain: "react-notes-b9fce.firebaseapp.com",
  projectId: "react-notes-b9fce",
  storageBucket: "react-notes-b9fce.appspot.com",
  messagingSenderId: "970076199226",
  appId: "1:970076199226:web:113fd8c21ce7fb3836d803",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
