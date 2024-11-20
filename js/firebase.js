import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAHJ2kc7-6Ff2CzKJ4jAc_MAoeg7Vge7EQ",
    authDomain: "curiodiet-46dd0.firebaseapp.com",
    projectId: "curiodiet-46dd0",
    storageBucket: "curiodiet-46dd0.firebasestorage.app",
    messagingSenderId: "240863526753",
    appId: "1:240863526753:web:fc7e8aef02090433a2cf20",
    measurementId: "G-HGHT9YYKJB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancias de autenticación y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
