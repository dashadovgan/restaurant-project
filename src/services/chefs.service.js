import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchChefs = async () => {
  const snapshot = await getDocs(collection(db, "chefs"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};