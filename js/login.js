// Initialize Cloud Firestore through Firebase

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

// Hacer login
function login(){
    console.log('hola')

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    console.log(email)
    console.log(password)

    sessionStorage.setItem('correo', email);
    sessionStorage.setItem('contra', password);

    var email2 = sessionStorage.getItem("correo");
    var pass2 = sessionStorage.getItem("contra");

    console.log(email2)
    console.log(pass2)

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
    } else {
     alert(errorMessage);
    }
    console.log(error);
    });

    console.log('hola otra ves')
    
    observar();
}

function observar(){

    var user = firebase.auth().currentUser;
    if (user) {
        // console.log('estas dentro prro')
        var iduser = firebase.auth().currentUser.uid;
        console.log(iduser);

        var usuario = db.ref('/usuarios/' + userId).once('value').then(function(snapshot){
            var nUsuario = snapshot.val().nombre;
        });
        console.log(nUsuario);
        // location.href="index.html";
    } else {
        console.log('tu aqui no eta')
    }

}