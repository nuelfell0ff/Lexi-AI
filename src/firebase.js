import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD8pRtsI3rTJahPQRTc-CO20ZUd7q2Ps0",
  authDomain: "lexi-ai-6d20b.firebaseapp.com",
  projectId: "lexi-ai-6d20b",
  storageBucket: "lexi-ai-6d20b.firebasestorage.app",
  messagingSenderId: "532709161020",
  appId: "1:532709161020:web:47e1081317f3633b45eb39"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);