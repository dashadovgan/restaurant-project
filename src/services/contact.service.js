import { db } from "@/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createContactMessage = async (data) => {
  return await addDoc(collection(db, "contacts"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};