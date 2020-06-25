
if(sessionStorage.getItem("UID") == null){
    // document.getElementById('login').innerHTML = "<a href='login.html' id='login'>Iniciar Sesión</a>"
    document.getElementById('login').innerHTML = "Iniciar Sesión";
    document.getElementById('perfil').innerHTML = "Registro";
    document.getElementById('perfil').setAttribute("href", 'registro.html');
}

function cerrarSesionContacto(){
    sessionStorage.removeItem("UID");
    location.href="login.html";
}