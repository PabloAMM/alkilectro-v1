import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBsS54Vno4DJRf8jyJdAvcpGGy2i8eZMrQ",
    authDomain: "alkilectro-v1.firebaseapp.com",
    projectId: "alkilectro-v1",
    storageBucket: "alkilectro-v1.appspot.com",
    messagingSenderId: "730993714458",
    appId: "1:730993714458:web:ad8b223d72785d16b178a3",
}

export const firebaseApp  = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
export const storage = getStorage();