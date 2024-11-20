import { auth } from "./firebase.js"; // Importar la configuración de Firebase
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Obtener el formulario y los campos de entrada
const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Manejar el evento de envío del formulario
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar la recarga de la página al enviar el formulario

    // Obtener los valores de los campos
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Intentar iniciar sesión con el correo y la contraseña
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Verificar que el usuario ha iniciado sesión correctamente
        if (user) {
            alert("¡Inicio de sesión exitoso!");
            window.location.href = "../html/usuario.html"; // Redirigir al inicio o dashboard
        }
    } catch (error) {
        // Manejar errores de autenticación
        console.error("Error al iniciar sesión:", error);
        
        // Mostrar mensajes de error específicos
        if (error.code === 'auth/wrong-password') {
            alert("Contraseña incorrecta. Intenta nuevamente.");
        } else if (error.code === 'auth/user-not-found') {
            alert("No se encontró una cuenta con este correo electrónico.");
        } else {
            alert("Hubo un error al iniciar sesión: " + error.message);
        }
    }
});
