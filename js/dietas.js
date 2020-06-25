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

if(window.sessionStorage.getItem("UID") == null){
    // document.getElementById('login').innerHTML = "<a href='login.html' id='login'>Iniciar Sesión</a>"
    document.getElementById('login').innerHTML = "Iniciar Sesión"
    document.getElementById('perfil').innerHTML = "Registro";
    document.getElementById('perfil').setAttribute("href", 'registro.html');
}

function cerrarSesionDietas(){
    sessionStorage.removeItem("UID");
    location.href="login.html";
}

function editarDieta(numero){
    console.log(numero);
    var uidS = sessionStorage.getItem("UID");
    console.log(uidS);
    db.collection("usuarios").doc(uidS).update({
        "dieta": numero
    }).then(function() {
        console.log("Document successfully updated!");
    });
}