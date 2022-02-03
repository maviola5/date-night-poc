import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  onSnapshot,
} from '@firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from '@firebase/auth';
import { environment } from '../.environment';

const firebaseConfig = environment.firebase;

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  getDoc,
  doc,
  collection,
  setDoc,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  query,
  where,
  onSnapshot,
  getDocs,
};
