import { auth } from "./firebase.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Inicializa Firestore
const db = getFirestore();

// Referencias a los elementos del DOM
const navItems = document.getElementById("nav-items");
const loginLink = document.getElementById("login-link");
const logoutLink = document.getElementById("logout-link");
const welcomeMessage = document.querySelector(".card-title"); // Título de bienvenida
const userDataList = document.getElementById("user-data-list"); // Lista de datos del usuario
const dietDataList = document.getElementById("diet-list"); // Lista donde se mostrará la dieta

// Verifica si hay un usuario autenticado
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            // Recupera datos del usuario desde Firestore
            const userDoc = doc(db, "users", user.uid); // Asume que los datos del usuario están en la colección 'users'
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                const { name, weight, height, sex, dietaId } = userData;

                // Actualiza el título de bienvenida
                welcomeMessage.textContent = `Bienvenido, ${name}`;

                // Llena la lista de datos del usuario
                userDataList.innerHTML = `
                    <li class="list-group-item"><strong>Peso:</strong> ${weight} kg</li>
                    <li class="list-group-item"><strong>Estatura:</strong> ${height} m</li>
                    <li class="list-group-item"><strong>Sexo:</strong> ${sex}</li>
                `;

                // Si el usuario tiene una dieta asignada (dietaId existe)
                if (dietaId) {
                    const dietDoc = doc(db, "diets", dietaId); // Obtenemos el documento de la dieta usando dietaId
                    const dietSnap = await getDoc(dietDoc);

                    if (dietSnap.exists()) {
                        const dietData = dietSnap.data();

                        // Actualizamos la sección de la dieta en la página
                        dietDataList.innerHTML = `
                            <li class="list-group-item"><strong>Desayuno:</strong> ${dietData.desayuno}</li>
                            <li class="list-group-item"><strong>Media mañana:</strong> ${dietData.media_mañana}</li>
                            <li class="list-group-item"><strong>Comida:</strong> ${dietData.comida}</li>
                            <li class="list-group-item"><strong>Media tarde:</strong> ${dietData.media_tarde}</li>
                            <li class="list-group-item"><strong>Cena:</strong> ${dietData.cena}</li>
                        `;
                    } else {
                        console.log("No se encontró la dieta asociada.");
                    }
                } else {
                    console.log("El usuario no tiene una dieta asignada.");
                }
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
