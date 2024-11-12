// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7YrS-wTzyCQBvSwX9mgLpGHtSc4fDkWs",
  authDomain: "wokky-98d01.firebaseapp.com",
  projectId: "wokky-98d01",
  storageBucket: "wokky-98d01.firebasestorage.app",
  messagingSenderId: "212874543231",
  appId: "1:212874543231:web:39863ffb226664a8437f4a",
  measurementId: "G-5KVM30KWQW"
};

// Initialize Firebase
const firebaseConf = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseConf);
