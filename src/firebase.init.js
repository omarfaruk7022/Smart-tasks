import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGJPGVq1TlzSzrD_Dg7_m0PIg584NLHBQ",
  authDomain: "smart-taks.firebaseapp.com",
  projectId: "smart-taks",
  storageBucket: "smart-taks.appspot.com",
  messagingSenderId: "340275432336",
  appId: "1:340275432336:web:31341ca994e4ba8a548115",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
