// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBH53yPPz_tpL2iD8VwUwylOglS7EDvTds",
	authDomain: "miniblob---animais.firebaseapp.com",
	projectId: "miniblob---animais",
	storageBucket: "miniblob---animais.appspot.com",
	messagingSenderId: "945105696819",
	appId: "1:945105696819:web:bc256f01af7d097c7d4b46",
	measurementId: "G-X3TJE5SHEP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
