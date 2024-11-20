import { auth, db } from "./firebase.js";  // Asegúrate de que la ruta sea correcta
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Cargar países desde archivo
async function cargarPaises() {
    try {
        const response = await fetch('../data/paises.txt');
        const data = await response.text();
        const paises = data.split('\n').map(pais => pais.trim()).filter(pais => pais);
        const selectPais = document.getElementById('country');

        paises.forEach(pais => {
            const option = document.createElement('option');
            option.value = pais.toLowerCase().replace(/\s+/g, '_');
            option.textContent = pais;
            selectPais.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los países:', error);
    }
}

// Verificar si los campos están completos
function verificarCampos() {
    const inputs = document.querySelectorAll('input[required], select[required]');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert(`Por favor, complete el campo: ${input.previousElementSibling.innerText}`);
            return false;
        }
    }
    return true;
}

// Registrar usuario y guardar información
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!verificarCampos()) return; // Si hay campos vacíos, no continuar

    // Capturar datos del formulario
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('last_name').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const country = document.getElementById('country').value;
    const sex = document.getElementById('sex').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Crear usuario con email y contraseña
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, "users", user.uid), {
            name,
            lastName,
            age,
            phone,
            weight,
            height,
            country,
            sex,
            email,
            uid: user.uid, // ID único generado por Firebase Auth
        });

        alert("Usuario registrado exitosamente");
        window.location.href = "../html/login.html"; // Redirigir al login si es necesario
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        
        // Manejo de errores específicos
        if (error.code === 'auth/email-already-in-use') {
            alert("El correo electrónico ya está en uso. Intenta con otro.");
        } else if (error.code === 'auth/weak-password') {
            alert("La contraseña es demasiado débil. Usa al menos 6 caracteres.");
        } else {
            alert("Hubo un error al registrar el usuario: " + error.message);
        }
    }
});

// Cargar países al cargar la página
window.onload = cargarPaises;
