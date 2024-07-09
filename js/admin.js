
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


function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const carpetaId = localStorage.getItem('carpetaId');

    fetch(`http://dmjg.somee.com/api/SubirArchivo/${carpetaId}`, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al subir el archivo.');
            }
            return response.json();
        })
        .then(data => {
            alert('Archivo subido correctamente.');
            window.location.href = "admin.html";
        })
        .catch(error => {
            console.error('Error al subir el archivo:', error);
        });
}


localStorage.removeItem('carpetaId');
/*listar todos los datos*/
function ShowFolder() {
    
    const id = localStorage.getItem('usuarioId');
    let folder = document.getElementById("listFolder");
    fetch("http://dmjg.somee.com/api/Carpetas/" + id, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((result) => {
          folder.innerHTML += `
        <div class="col-md-6" id="doubleClickDiv">
                <div   class="mdl-list__item mdl-list__item--two-line bg " id="doubleClickButton">
                    <span class="mdl-list__item-primary-content">
                      <i class="zmdi zmdi-account  zmdi-folder zmdi-hc-2x" ></i>
                    <span>${result.nombre}</span>
                </span>
                <button  type="button" class="btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="zmdi zmdi-more-vert"></i>
            </button>
            <ul class="dropdown-menu">
                <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#editarcarpeta" onclick="GetFolder(${result.id})">Cambiar Nombre</button></li>
                <li><button class="dropdown-item" type="button">Descargar</button></li>
                <li><button class="dropdown-item" type="button" onclick="GetFolderContent(${result.id})">Detalles</button></li>
                <li><button class="dropdown-item" type="button" onclick="confirmarEliminar(${result.id})">Eliminar</button></li>
            </ul>

            </div>
        </div>
        `;

          // Obtener el token de localStorage
        });
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });
}

ShowFolder();

/*crear carpeta*/
function CreateFolder() {

    const usuarioId = localStorage.getItem('usuarioId');

    const NameFolder = document.getElementById("name-folder").value;
    var usuario = {
        Nombre: NameFolder,
        FechaCreacion: Date.now,
        FechaModificacion: "2024-06-29T20:39:20.290Z",
        Ruta: "string",
        Estado: "activo",
        UsuarioId: usuarioId,
        carpeta: null
    };

    fetch("http://dmjg.somee.com/api/CrearCarpeta/" + usuarioId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    }).then((resultado) => {
      console.log("creado" + resultado);

      window.location.href = "admin.html";
    });
    

}
/*actualizar carpeta*/
function UpdateFolder() {
    const user = localStorage.getItem('usuarioId');
    const NameFolder = document.getElementById("name-folder-edit").value;
    const IdFolder = document.getElementById("id-folder-edit").value;
    var carpeta = {
        Id: IdFolder,
        Nombre: NameFolder,
        FechaCreacion: "2024-06-26T18:13:14",
        FechaModificacion: "2024-06-26T18:13:14",
        Ruta: "string",
        Estado: "activo",
        UsuarioId: user
    };

    fetch("http://dmjg.somee.com/api/ActualizarCarpeta/" + IdFolder, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carpeta),
    }).then((resultado) => {
      window.location.href = "admin.html";
    });
}
/*obtener para actualizar carpeta*/
function GetFolder(id) {

    fetch("http://dmjg.somee.com/api/ObtenerIdCarpeta/" + id, { method: "GET" })
      .then((response) => response.json())
      .then((resultado) => {
        const NameFolder = (document.getElementById("name-folder-edit").value =
          resultado.nombre);
        const IdFolder = (document.getElementById("id-folder-edit").value =
          resultado.id);
        console.log("creado" + resultado);
      });
}

function confirmarEliminar(id) {
    if (confirm('¿Estás seguro de eliminar esta carpeta?')) {
        eliminarCarpeta(id);
    }
}

function eliminarCarpeta(id) {
    fetch(`http://dmjg.somee.com/api/EliminarCarpeta/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          location.reload(); // Actualizar la lista de carpetas después de eliminar
        } else {
          throw new Error(`Error al eliminar carpeta: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error("Hubo un problema al eliminar la carpeta:", error);
        alert("Hubo un error al eliminar la carpeta.");
      });
}

/*content carpeta*/
function GetFolderContent(id) {

    fetch("http://dmjg.somee.com/api/ObtenerIdCarpeta/" + id, { method: "GET" })
      .then((response) => response.json())
      .then((resultado) => {
        localStorage.setItem("carpetaId", resultado.id);
        window.location.href = "./contentFolder.html";
        console.log("carpeta" + resultado);
      });
}