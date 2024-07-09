/*document.getElementById('registerButton').addEventListener('click', () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {

            var usuario =  {
            nombres: firstName,
            apellidos: lastName,
            correo: email,
            contrasena: password
            }
        fetch("http://localhost:5070/api/CrearUsuario", { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        alert('Error al registrar usuario');
    }
});*/


function CreateUser() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
   var usuario = {
     nombres: firstName,
     apellidos: lastName,
     correo: email,
     contrasena: password,
   };

  fetch("http://dmjg.somee.com/api/CrearUsuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  }).then((resultado) => {
    console.log("creado" + resultado);
    alert("Usuario registrado correctamente.");
    window.location.href = "index.html";
  });
}




document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    const email = document.getElementById("userName").value;
    const password = document.getElementById("pass").value;

    const user = {
      correo: email,
      contrasena: password,
    };

    fetch("http://dmjg.somee.com/api/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Credenciales incorrectas. Por favor, inténtelo de nuevo."
          );
        }

        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token); // Almacena el token en localStorage
        localStorage.setItem("usuarioId", data.user.id); //almacena el nombre del usuario
        localStorage.setItem("nombre", data.user.nombres); //almacena el nombre del usuario

        // Redirigir a la página home.html
        window.location.href = "home.html";
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión. Credenciales incorrectas.");
      });
     
  });

