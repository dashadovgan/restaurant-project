// src/firebase/posts.js
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

// получить 3 последних поста
export async function getLatestPosts() {
  const q = query(collection(db, "posts"), orderBy("date", "desc"), limit(3));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// получить один пост по id
export async function getPostById(id) {
  const ref = doc(db, "posts", id);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    throw new Error("Post not found");
  }
}
