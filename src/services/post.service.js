import { db } from "@/firebase/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export const fetchPosts = async (maxPosts = null) => {
  let q;

  if (maxPosts) {
    q = query(
      collection(db, "posts"),
      orderBy("date", "desc"),
      limit(maxPosts)
    );
  } else {
    q = query(collection(db, "posts"), orderBy("date", "desc"));
  }

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};