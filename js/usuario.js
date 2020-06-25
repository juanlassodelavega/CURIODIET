  
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
var currentUser;
var nUsuario;


window.onload = function() {
    entrada();
  }

function entrada(){
    var logUser = sessionStorage.getItem("UID");
    var docRef = db.collection('usuarios').doc(logUser);
    var dieta;
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            // console.log(doc.data().nombre);
            // console.log(doc.get("nombre"));
            nUsuario = doc.get("nombre");
            console.log(nUsuario);
            dieta = doc.get("dieta");
            console.log(dieta);
            document.getElementById('saludo').innerHTML = "<h3>Bienvenido, " + nUsuario + "</h3>"
            document.getElementById('datos').innerHTML = "<h3>Mis datos</h3>" +
            "<br>" +
            "<h4>Peso: " + doc.get("peso") + "</h4>" +
            "<h4>Estatura: " + doc.get("estatura") +  "</h4>" +
            "<h4>Sexo: " + doc.get("sexo") + "</h4>" +
            "<h4>Dieta actual: " + dieta + "</h4>"
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    }).then(function(){
        var docRefDieta = db.collection('dietas').doc(dieta);
        docRefDieta.get().then(function(doc){
            console.log(doc.get("cena"));
            document.getElementById('dietas').innerHTML = "<h3>Dieta que sigo</h3>"+
            "<br>"+
            "<h4> Desayuno: " + doc.get("desayuno") + "</h4>" +
            "<h4> Media mañana: " + doc.get("media_manana") + "</h4>" +
            "<h4> Comida: " + doc.get("comida") + "</h4>" +
            "<h4> Media tarde: " + doc.get("media_tarde") + "</h4>" +
            "<h4> Cena: " + doc.get("cena") + "</h4>"
        })
    });

    "<h6>Aquí podrás ver tus datos y tus dietas.</h6>";
    console.log("eeeeeee");
}

function cerrarSesion(){
    sessionStorage.removeItem("UID");
    firebase.auth().signOut().then(function(){
        location.href="login.html";
    }, function(error) {
        // An error happened.
      });
    
}