import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchFavoriteDishes = async () => {
  const q = query(
    collection(db, "menuItems"),
    where("isFavorite", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};