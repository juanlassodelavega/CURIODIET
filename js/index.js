import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const navItems = document.getElementById("nav-items");
const loginLink = document.getElementById("login-link");
const logoutLink = document.getElementById("logout-link");

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario autenticado: Mostrar enlace de perfil y ocultar enlace de login
        const profileLink = document.createElement("li");
        profileLink.classList.add("nav-item");
        profileLink.innerHTML = `
            <a class="nav-link" href="usuario.html">Perfil</a>
        `;
        navItems.appendChild(profileLink);
        loginLink.classList.add("d-none");
        logoutLink.classList.remove("d-none");
    } else {
        // Usuario no autenticado: Asegurar que el enlace de perfil no esté visible
        const profileLink = document.querySelector("a[href='usuario.html']");
        if (profileLink) {
            profileLink.parentElement.remove();
        }
        loginLink.classList.remove("d-none");
        logoutLink.classList.add("d-none");
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
