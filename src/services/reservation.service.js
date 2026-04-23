import { db } from "@/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const PRICE_PER_GUEST = 22.11;


export const calculateTotal = (guests) => {
  return (guests || 1) * PRICE_PER_GUEST;
};


export const generateTransactionId = () => {
  return "TRX-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};
export const createReservation = async (data) => {
  return await addDoc(collection(db, "reservations"), {
    ...data,
    createdAt: serverTimestamp(),
    transactionId: generateTransactionId(),
  });
};