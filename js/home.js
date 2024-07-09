const token = localStorage.getItem('token');

if (token == null) {

    alert('No hay token almacenado. Inicie sesión primero.');
    window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión si no hay token
}

const user = localStorage.getItem('nombre');

// Comprobar si hay un usuario guardado
if (user) {
    // Obtener el elemento del DOM donde se mostrará el nombre
    var nombre = document.getElementById("NombreUsuario");

    // Asignar el nombre de usuario al contenido del elemento
    nombre.innerText = user;

    // Opcional: Mostrar en la consola para verificar
    console.log(user);
} else {
    console.log("No hay un usuario guardado en localStorage");
}

/*listar todos los datos*/
function ShowFolderLengfh() {
    const id = localStorage.getItem('usuarioId');
    fetch("http://dmjg.somee.com/api/Carpetas/" + id, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        var contadorCarpetas = (document.getElementById(
          "contadorCarpetas"
        ).innerText = data.length);
        console.log(contadorCarpetas);
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
}
/*listar todos los datos*/
function ShowFileLength() {
    const carpetaId = localStorage.getItem('carpetaId');
    fetch("http://dmjg.somee.com/api/ObtenerArchivosCarpetaId/" + carpetaId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        var contadorArchivos = (document.getElementById(
          "contadorArchivos"
        ).innerText = data.length);
        console.log(contadorArchivos);
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
}
ShowFolderLengfh();
ShowFileLength();