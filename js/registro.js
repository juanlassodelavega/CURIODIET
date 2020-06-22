// Initialize Cloud Firestore through Firebase

      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyB-4WFZvWgwERa6DTPv67QOhYqembJeUJ0",
        authDomain: "curiodiet.firebaseapp.com",
        databaseURL: "https://curiodiet.firebaseio.com/",
        projectId: "curiodiet",
        storageBucket: "curiodiet.appspot.com",
        messagingSenderId: "234764771665",
        appId: "1:234764771665:web:645ab1aca681c20d64b370",
        measurementId: "G-0NY4XKXQDH"
         };
        // Initialize Firebase
         firebase.initializeApp(firebaseConfig);
        
  
var db = firebase.firestore();

// Agregar documentos
function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = document.getElementById('edad').value;
    var telefono = document.getElementById('telefono').value;
    var peso = document.getElementById('peso').value;
    var estatura = document.getElementById('estatura').value;
    var pais = document.getElementById('pais').value;
    var sexo = document.getElementById('sexo').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data){
        console.log(data.user.uid);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    db.collection("usuarios").add({
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        telefono: telefono,
        peso: peso,
        estatura: estatura,
        pais: pais,
        sexo: sexo,
        email: email
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('peso').value = '';
        document.getElementById('estatura').value = '';
        document.getElementById('pais').value = '';
        document.getElementById('sexo').value = '';
        document.getElementById('email').value = '';

        location.href="login.html";
    })
    
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}