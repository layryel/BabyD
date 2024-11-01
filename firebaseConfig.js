import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importa o módulo de autenticação
import { getStorage } from "firebase/storage"; // Importa o Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCtP8BGB9VWdIz95GcXUhGkF8m1xxF84Vg",
    authDomain: "babyd-e4b04.firebaseapp.com",
    projectId: "babyd-e4b04",
    storageBucket: "babyd-e4b04.appspot.com",
    messagingSenderId: "721606524315",
    appId: "1:721606524315:web:67bf491091548b89be753e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicialização do Firestore
const auth = getAuth(app); // Inicialização da autenticação
const storage = getStorage(app); // Inicializa o Firebase Storage

export { db, auth, storage }; // Exporta o Firestore, autenticação e storage
