import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCHsPC0be5V5bTBNyKYHlVT--c8G9GJaJw",
    authDomain: "goit-react-native-project-2023.firebaseapp.com",
    projectId: "goit-react-native-project-2023",
    storageBucket: "goit-react-native-project-2023.appspot.com",
    messagingSenderId: "895716451416",
    appId: "1:895716451416:web:a499d6e3444a07d177562d",
    measurementId: "G-ERJP73PFTF",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
