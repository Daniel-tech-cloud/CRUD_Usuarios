window.addEventListener('DOMContentLoaded', (event) => {
    
    llenarTabla();
    modalNuevoUsuario();
    
});

function llenarTabla () {
    fetch("/CRUD_Usuarios/Consultar")
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const usuarios = data.querySelectorAll('usuario');
            console.log(usuarios);
            
            //DOM Scripting
            usuarios.forEach( usuarioNode => {
                let row = document.createElement('tr');
                
                //Usuario
                let tdUsuario = document.createElement('td');
                tdUsuario.innerText = usuarioNode.children[1].innerHTML; //Alex
                row.dataset.id = usuarioNode.children[0].innerHTML;
               
                //Opciones
                let tdOpciones = document.createElement('td');
                tdOpciones.classList.add('opciones');
            
                const consultarReg = document.createElement('button');
                consultarReg.innerText = 'Consultar registro';

                const modificarReg = document.createElement('a');
                modificarReg.innerText = 'Modificar';
                modificarReg.href = '/Modificar';

                const eliminarReg = document.createElement('a');
                eliminarReg.innerText = 'Eliminar';
                eliminarReg.href = '/Eliminar?';
                
                tdOpciones.append(consultarReg, modificarReg, eliminarReg);
            
                row.append(tdUsuario, tdOpciones);
                
                const tBody = document.querySelector('.table tbody');
                
                tBody.append(row);
                
            });
        });
}

function modalNuevoUsuario(){
    // Get the modal
    var modal = document.getElementById("modalNuevoUsuario");

    // Get the button that opens the modal
    var btn = document.getElementById("btnAdd");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}

function modalConsultarUsuario(){
    // Get the modal
    var modal = document.getElementById("modalConsultarUsuario");

    // Get the button that opens the modal
    var btn = document.getElementById("btnConsultarUsuario");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}