// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence, // or browserSessionPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzPWd3toz4dXBdUKSxjZjku8PSxEISRHk",
  authDomain: "webinar-a49cd.firebaseapp.com",
  projectId: "webinar-a49cd",
  storageBucket: "webinar-a49cd.firebasestorage.app",
  messagingSenderId: "410739958026",
  appId: "1:410739958026:web:08688114a3c92d1cc91af3",
  measurementId: "G-5NFY90E6NE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Persist auth (keeps user signed in). For higher security use session persistence.
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn("Could not set persistence:", err?.message || err);
});

export { app, auth, db};
