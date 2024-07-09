
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

function UpdateSubFolder() {
    const user = localStorage.getItem('usuarioId');
    const NameFolder = document.getElementById("NameFolderUpdate").value;
    const IdFolder = document.getElementById("IdFolderEdit").value;
    var carpeta = {
        Id: IdFolder,
        Nombre: NameFolder,
        FechaCreacion: "2024-06-26T18:13:14",
        FechaModificacion: "2024-06-26T18:13:14",
        Ruta: "string",
        Estado: "activo",
        UsuarioId: null
    };

    fetch("http://dmjg.somee.com/api/ActualizarCarpeta/" + IdFolder, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carpeta),
    }).then((resultado) => {
      window.location.href = "contentFolder.html";
    });
}


document.getElementById("uploadForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    const carpetaId = localStorage.getItem('carpetaId');
    const nombre = document.getElementById("nameFile").value;
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if (!file) {
        alert("Por favor, selecciona un archivo.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("Nombre", nombre);

    
    fetch(`http://dmjg.somee.com/api/Archivos/SubirArchivo/${carpetaId}?NombreArchivo=` + nombre, {
        method: "POST",
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al subir el archivo.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Archivo subido con éxito:", data);
            alert("Archivo subido con éxito.");
            location.reload();

        })
        .catch(error => {
            console.error("Error al subir el archivo:", error);
            alert("Error al subir el archivo.");
        });
});
/*crear carpeta*/
function CreateSubFolder() {

    const usuarioId = localStorage.getItem('usuarioId');
    const carpetaId = localStorage.getItem('carpetaId');
    const NameFolder = document.getElementById("NameSubFolder").value;
    var carpeta = {
        Nombre: NameFolder,
        FechaCreacion: Date.now,
        FechaModificacion: Date.now,
        Ruta: "string",
        Estado: "activo",
        carpetaId: carpetaId,
        UsuarioId: null
        
    };

    fetch("http://dmjg.somee.com/api/CrearCarpeta/" + carpetaId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carpeta),
    }).then((resultado) => {
      console.log("error" + resultado);
      alert("Carpeta creada correctamente.");
      location.reload();
    });
    

}



/*listar todos los datos*/
function ShowArchivos() {
    const carpetaId = localStorage.getItem('carpetaId');
    let file = document.getElementById("listArchivo");

    fetch("http://dmjg.somee.com/api/ObtenerArchivosCarpetaId/" + carpetaId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == null || data.length === 0) {
          file.innerHTML = `
            <div class="col-md-12">
                <div class="alert alert-info" role="alert">
                        Sin Archivos!!
                </div>
            </div>`;
        } else {
          data.forEach((result) => {
            file.innerHTML += `                        <div class="col-md-6">
                    <div class="mdl-list__item mdl-list__item--two-line bg">
                        <span class="mdl-list__item-primary-content">
                            <i class="zmdi zmdi-file  zmdi-hc-2x"></i>
                            <span>${result.nombre}</span>
                        </span>
                        <button type="button" class="btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="zmdi zmdi-more-vert"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#editarcarpeta" onclick="GetFolder(${result.id})">Cambiar Nombre</button></li>
                            <li><button class="dropdown-item" type="button">Descargar</button></li>
                            <li><button class="dropdown-item" type="button">Detalles</button></li>
                        </ul>
                    </div>
                </div>`;
          });
        }
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch: " + error.message);
      });
}

/*obtener para actualizar carpeta*/
function GetFolder(id) {

    fetch("http://dmjg.somee.com/api/ObtenerIdCarpeta/" + id, { method: "GET" })
      .then((response) => response.json())
      .then((resultado) => {
        const NameFolder = (document.getElementById("NameFolderUpdate").value =
          resultado.nombre);
        const IdFolder = (document.getElementById("IdFolderEdit").value =
          resultado.id);
        console.log("creado" + resultado);
      });
}

/*listar todos los datos*/
function ShowCarpetas() {
    const carpetaId = localStorage.getItem('carpetaId');
    let folder = document.getElementById("listCarpetas");

    fetch("http://dmjg.somee.com/api/carpetas&subcarpetas/" + carpetaId, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == null || data.length === 0) {
          folder.innerHTML = `
            <div class="col-md-12">
                <div class="alert alert-info" role="alert">
                        Carpeta vacía!!
                </div>
            </div>`;
        } else {
          data.forEach((result) => {
            folder.innerHTML += `                        <div class="col-md-6">
                    <div class="mdl-list__item mdl-list__item--two-line bg">
                        <span class="mdl-list__item-primary-content">
                            <i class="zmdi zmdi-account  zmdi-folder zmdi-hc-2x" ></i>
                            <span>${result.nombre}</span>
                        </span>
                        <button type="button" class="btn btn-secondary" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="zmdi zmdi-more-vert"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#editarcarpeta" onclick="GetFolder(${result.id})">Cambiar Nombre</button></li>
                            <li><button class="dropdown-item" type="button">Descargar</button></li>
                            <li><button class="dropdown-item" type="button">Detalles</button></li>
                        </ul>
                    </div>
                </div>`;
          });
        }
      })
      .catch(function (error) {
        console.log("Hubo un problema con la petición Fetch: " + error.message);
      });
}
ShowCarpetas();
ShowArchivos();

