// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBADI91f5NpD-iWs1SH2x_iM-k5SwG4Nk",
  authDomain: "loginandregister-4aa12.firebaseapp.com",
  projectId: "loginandregister-4aa12",
  storageBucket: "loginandregister-4aa12.firebasestorage.app",
  messagingSenderId: "116158849866",
  appId: "1:116158849866:web:66b5c4e12c824a51e417b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
export const db = getFirestore(app);
