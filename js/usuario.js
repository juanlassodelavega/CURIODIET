import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Inicializa Firestore
const db = getFirestore();

// Referencias a los elementos del DOM
const navItems = document.getElementById("nav-items");
const loginLink = document.getElementById("login-link");
const logoutLink = document.getElementById("logout-link");
const welcomeMessage = document.querySelector(".card-title"); // Título de bienvenida
const userDataList = document.querySelector(".card-body ul"); // Lista de datos del usuario

// Verifica si hay un usuario autenticado
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Recupera datos del usuario desde Firestore
            const userDoc = doc(db, "users", user.uid); // Asume que los datos del usuario están en la colección 'users'
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                const { name, weight, height, sex } = userData;

                // Actualiza el título de bienvenida
                welcomeMessage.textContent = `Bienvenido, ${name}`;

                // Llena la lista de datos del usuario
                userDataList.innerHTML = `
                    <li class="list-group-item"><strong>Peso:</strong> ${weight} kg</li>
                    <li class="list-group-item"><strong>Estatura:</strong> ${height} m</li>
                    <li class="list-group-item"><strong>Sexo:</strong> ${sex}</li>
                `;
            } else {
                console.error("No se encontraron datos del usuario en Firestore");
            }

            // Mostrar enlace de perfil y ocultar enlace de login
            const profileLink = document.createElement("li");
            profileLink.classList.add("nav-item");
            profileLink.innerHTML = `
                <a class="nav-link active" href="usuario.html">Perfil</a>
            `;
            navItems.appendChild(profileLink);
            loginLink.classList.add("d-none");
            logoutLink.classList.remove("d-none");
        } catch (error) {
            console.error("Error al recuperar datos del usuario:", error);
        }
    } else {
        // Usuario no autenticado: Asegurar que el enlace de perfil no esté visible
        const profileLink = document.querySelector("a[href='usuario.html']");
        if (profileLink) {
            profileLink.parentElement.remove();
        }
        loginLink.classList.remove("d-none");
        logoutLink.classList.add("d-none");
        welcomeMessage.textContent = "Bienvenido, visitante"; // Mensaje por defecto
    }
});

// Cerrar sesión
logoutLink.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Sesión cerrada exitosamente");
        window.location.reload();
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un error al cerrar la sesión.");
    }
});
