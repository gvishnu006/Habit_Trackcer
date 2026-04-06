import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHs7yj7-1jliRysuOEhhfyxBPpHXcKRCw",
  authDomain: "habittracker-580ff.firebaseapp.com",
  databaseURL: "https://habittracker-580ff-default-rtdb.firebaseio.com",
  projectId: "habittracker-580ff",
  storageBucket: "habittracker-580ff.firebasestorage.app",
  messagingSenderId: "566411819172",
  appId: "1:566411819172:web:d58c3cbe9f1a92feb50e31",
  measurementId: "G-CVF1CW2M4P"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
