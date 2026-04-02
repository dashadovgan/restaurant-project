import { db } from "@/firebase/firebase";
import { collection, addDoc, updateDoc, doc, getDocs } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const menuCollection = collection(db, "menuItems");

export const MenuService = {
  async addDish(dish) {
    const docRef = await addDoc(menuCollection, dish);
    return docRef.id;
  },

  async updateDish(dish) {
    const dishRef = doc(db, "menuItems", dish.id);
    await updateDoc(dishRef, { ...dish });
  },

  async uploadImage(file) {
    if (!file) return "";

    const path = `menuImages/${Date.now()}_${file.name}`;
    const storageReference = storageRef(storage, path);

    await uploadBytes(storageReference, file);
    const url = await getDownloadURL(storageReference);

    return url;
  },

  async getAllDishes() {
    const snapshot = await getDocs(menuCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};