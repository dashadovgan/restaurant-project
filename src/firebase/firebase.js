import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuzgOb1QjUGo1iZ5cROTXDX_8oGfOfKrM",
  authDomain: "restorenpetproject.firebaseapp.com",
  projectId: "restorenpetproject",
  storageBucket: "restorenpetproject.firebasestorage.app",
  messagingSenderId: "598254716562",
  appId: "1:598254716562:web:cd4ea95de00246bae8c84b",
  measurementId: "G-NZ0YWGT858",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
