import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Manejo de la barra de navegación según el estado del usuario
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

// Función para obtener dietas desde Firestore
async function fetchDiets() {
    const dietsCollection = collection(db, "diets");
    const snapshot = await getDocs(dietsCollection);
    const diets = snapshot.docs.map(doc => doc.data());
    return diets;
}

// Función para renderizar dietas en el DOM
async function displayDiets() {
    const diets = await fetchDiets();
    const container = document.getElementById("diet-container");
    // container.innerHTML = ""; // Limpia las dietas predeterminadas

    if (diets.length === 0) {
        container.innerHTML = `
            <p class="text-center">No hay dietas disponibles por ahora. Vuelve más tarde.</p>
        `;
        return;
    }

    diets.forEach(diet => {
        const dietHTML = `
        <div class="col-md-4 mb-4 d-flex">
            <div class="border p-3 rounded flex-grow-1 d-flex flex-column justify-content-between">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Desayuno:</strong> ${diet.desayuno || "No especificado"}</li>
                    <li class="list-group-item"><strong>Media mañana:</strong> ${diet.media_mañana || "No especificado"}</li>
                    <li class="list-group-item"><strong>Comida:</strong> ${diet.comida || "No especificado"}</li>
                    <li class="list-group-item"><strong>Media tarde:</strong> ${diet.media_tarde || "No especificado"}</li>
                    <li class="list-group-item"><strong>Cena:</strong> ${diet.cena || "No especificado"}</li>
                </ul>
                <div class="text-center">
                    <br>
                    <button class="btn btn-secondary">Apuntarme a esta dieta</button>
                </div>
            </div>
        </div>`;
        container.insertAdjacentHTML('beforeend', dietHTML);
    });
}

// Llama a la función para mostrar las dietas al cargar la página
displayDiets();
