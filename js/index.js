if(window.sessionStorage.getItem("UID") == null){
    document.getElementById('login').innerHTML = "Iniciar Sesión";
    document.getElementById('perfil').innerHTML = "Registro";
    document.getElementById('perfil').setAttribute("href", 'registro.html');
}

function cerrarSesionIndex(){
    sessionStorage.removeItem("UID");
    location.href="login.html";
}