import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  //apiKey: import.meta.env.VITE_API_KEY,
  apiKey:"AIzaSyCmf31leR3uZ1ZnhB29ZxQaB37EB9zc0ig ",
  authDomain: "reactchat-72bef.firebaseapp.com",
  projectId: "reactchat-72bef",
  storageBucket: "reactchat-72bef.appspot.com",
  messagingSenderId: "730777247317",
  appId: "1:730777247317:web:1560ff41f149b3761d3edc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

