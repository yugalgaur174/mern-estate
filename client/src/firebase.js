// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-97896.firebaseapp.com",
  projectId: "mern-estate-97896",
  storageBucket: "mern-estate-97896.firebasestorage.app",
  messagingSenderId: "200466686202",
  appId: "1:200466686202:web:a2aa842c67cea6cce02943",
  measurementId: "G-XZ3W4KPXYJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);