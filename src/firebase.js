import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuzgOb1QjUGo1iZ5cROTXDX_8oGfOfKrM",
  authDomain: "restorenpetproject.firebaseapp.com",
  projectId: "restorenpetproject",
  storageBucket: "restorenpetproject.firebasestorage.app",
  messagingSenderId: "598254716562",
  appId: "1:598254716562:web:cd4ea95de00246bae8c84b",
  measurementId: "G-NZ0YWGT858"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export {db}