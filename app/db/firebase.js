import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAwG1u1hCN2U9IsHBu-K7_-9kOEoxboiGo",
  authDomain: "versura-fcb2f.firebaseapp.com",
  projectId: "versura-fcb2f",
  storageBucket: "versura-fcb2f.appspot.com",
  messagingSenderId: "42667190535",
  appId: "1:42667190535:web:26518cdea9bc65f8cfbda2",
  measurementId: "G-HX3HEFFXV8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };