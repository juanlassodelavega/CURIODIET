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
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      currentUser = user.uid;
      console.log(currentUser); //this returns my user object 
      window.localStorage.setItem("UID",currentUser);
  } else {
      currentUser = "Error"
      console.log(currentUser); //this returns my user object 
      window.localStorage.setItem("UID",currentUser);
       alert(" Error in your login code");
    // No user is signed in.
  }
});

window.onload = function() {
    // var aaaaaa = sessionStorage.getItem("correo");
    // console.log(aaaaaa);
    entrada();
  }

function entrada(){
    var docRef = db.collection('usuarios').doc(currentUser.uid);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    // const collection = db.collection('usuarios');
    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) { var userId = firebase.auth().currentUser.uid; }
    //     else {var userId = null;
    //     console.log("nope")}
    // });
    // var usuario = db.ref('/usuarios/' + userId).once('value').then(function(snapshot){
    //     var nUsuario = snapshot.val().nombre;
    // });

    

    document.getElementById('saludo').innerHTML = "<h3>Bienvenido" + nUsuario + "</h3>"
    "<h6>Aquí podrás ver tus datos y tus dietas.</h6>";
    console.log("eeeeeee");
}