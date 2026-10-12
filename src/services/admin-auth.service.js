import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Auth подключается только в админке, чтобы не утяжелять публичные страницы
const auth = getAuth(db.app);

// Ждём, пока Firebase восстановит сессию после перезагрузки страницы
export const getCurrentUser = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

// Кто админ, решают правила Firestore (firestore.rules): документ
// adminAccess/check доступен для чтения только разрешённому Google-аккаунту
export const hasAdminAccess = async () => {
  try {
    await getDoc(doc(db, "adminAccess", "check"));
    return true;
  } catch (error) {
    if (error.code === "permission-denied") return false;
    throw error;
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await signInWithPopup(auth, provider);

  if (!(await hasAdminAccess())) {
    await signOut(auth);
    const error = new Error("This Google account has no access to the admin panel");
    error.code = "admin/no-access";
    throw error;
  }
};

export const signOutAdmin = () => signOut(auth);
