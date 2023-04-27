import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { 
    getDatabase, 
    ref as firebaseDatabaseRef, 
    set as firebaseSet,
    child,
    get,
    onValue
} from "firebase/database";
// ref == reference to a "collection"

const firebaseConfig = {
    apiKey: "AIzaSyD2hEAHj4u-S5i0PPBYM83eEoUjmmiK-jw",
    authDomain: "trainingapp-a7efc.firebaseapp.com",
    databaseURL: "https://trainingapp-a7efc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "trainingapp-a7efc",
    storageBucket: "trainingapp-a7efc.appspot.com",
    appId: '1:96447439520:android:d46aac3e13a287078a5fc5',
    messagingSenderId: "96447439520",  // project_number
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

export {
    auth, 
    db, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged, 
    firebaseDatabaseRef, 
    firebaseSet, 
    sendEmailVerification,
    child,
    get,
    onValue, // reload when online DB changed
}