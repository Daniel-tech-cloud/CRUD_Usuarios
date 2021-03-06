window.addEventListener('DOMContentLoaded', (event) => {
    
    llenarTabla();
    modalNuevoUsuario();
    opciones();
    modalConsultarUsuario();
    modalActualizaDatosUsuario();      
});

function llenarTabla () {
    fetch("/CRUD_Usuarios/Consultar")
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const usuarios = data.querySelectorAll('usuario');usuarios
            
            //DOM Scripting
            usuarios.forEach( usuarioNode => {
                const id = usuarioNode.children[0].innerHTML;
                        
                let row = document.createElement('tr');
                
                //Usuario
                let tdUsuario = document.createElement('td');
                tdUsuario.innerText = usuarioNode.children[1].innerHTML; //Alex
                row.dataset.id = id;
               
                //Opciones
                let tdOpciones = document.createElement('td');
                tdOpciones.classList.add('opciones');
            
                const consultarReg = document.createElement('button');
                consultarReg.innerText = 'Consultar registro';
                consultarReg.classList.add('opcion');
                consultarReg.classList.add('opcion-consultar');

                const modificarReg = document.createElement('button');
                modificarReg.innerText = 'Modificar';
                modificarReg.setAttribute("id", "btnActualizar")

                modificarReg.classList.add('opcion');
                modificarReg.classList.add('opcion-modificar');                

                const eliminarReg = document.createElement('a');
                eliminarReg.href = '/CRUD_Usuarios/Eliminar?id=' + id;
                eliminarReg.innerText = 'Eliminar';
                eliminarReg.classList.add('opcion');
                eliminarReg.classList.add('opcion-eliminar');                
                
                tdOpciones.append(consultarReg, modificarReg, eliminarReg);
            
                row.append(tdUsuario, tdOpciones);
                
                const tBody = document.querySelector('.table tbody');
                
                tBody.append(row);
                
            });
        });
}


function modalActualizaDatosUsuario(){
    // Get the modal
    var modal = document.getElementById("modalActualizarUsuario");
   
   
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[2];
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
      limpiarModal(modal);
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        limpiarModal(modal);
      }
    }
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

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[1];
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        limpiarModal(modal);
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        limpiarModal(modal);
        modal.style.display = "none";
      }
    }
}


function limpiarModal(modal){
    const contenedor = modal.querySelector('.modal-content');
    
    contenedor.removeChild(contenedor.lastChild);


}

function opciones (){
    
    window.addEventListener('click', function (e) {
        
        //Dio click en consultar
        if(e.target.classList.contains('opcion-consultar')){
            //Obtenemos el id del usuario
            const id = e.target.parentNode.parentNode.dataset.id;
            
            //Hacemos la petici??n
            fetch("/CRUD_Usuarios/Consultar?id=" + id)
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    
                    let usuario = data.querySelector('usuario');
                    
                    let table = document.createElement('table');
                    table.classList.add('tabla-datos-usuario');
                    table.classList.add('table');
                    
                    let thead = document.createElement('thead');
                    let tbody = document.createElement('tbody'); 
                    let tr = document.createElement('tr');
                    let tr2 = document.createElement('tr');

                    //Va a ir indicando el index de id, nombre, etc...
                    ['ID', 'Nombre', 'Apellido paterno', 'Apellido materno'].forEach((titulo, index) => {

                        //thead
                        let th = document.createElement('th');
                        th.innerText = titulo;
                        tr.append(th);
                    
                        //tbody
                        let td = document.createElement('td');
                        td.innerText = usuario.childNodes[index].innerHTML;
                        tr2.append(td);
                    })
                    
                    thead.append(tr);
                    tbody.append(tr2);
                   
                    table.append(thead, tbody);
                    
                    //Mostramos el modal
                    let modalContent = document.querySelector('#modalConsultarUsuario .modal-content');
                    modalContent.append(table);
                    
                    modalContent.parentNode.style.display = "block";
                });
                
        }else if(e.target.classList.contains('opcion-modificar')){ //Dio click en modificar
                
                const id = e.target.parentNode.parentNode.dataset.id;
                //Hacemos la petici??n
                fetch("/CRUD_Usuarios/Consultar?id=" + id)
                    .then(response => response.text())
                    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                    .then(data => {

                        let usuario = data.querySelector('usuario');

                        let form = document.createElement('form');
                        form.method = 'GET';
                        form.action = '/CRUD_Usuarios/Actualizar';

                        //Va a ir indicando el index de id, nombre, etc...
                        ['ID', 'Nombre', 'Apellido paterno', 'Apellido materno'].forEach((titulo, index) => {

                            let div = document.createElement('div');
                            div.classList.add('campo');
                            let label = document.createElement('label'); 
                            let input = document.createElement('input');
                            input.type = 'text';

                            //label
                            label.innerText = titulo;
                            div.append(label);

                            //input
                            input.value = usuario.childNodes[index].innerHTML;

                            switch(titulo){
                                case 'ID':
                                    input.name = 'id';
                                    break;
                                case 'Nombre':
                                    input.name = 'nombre';
                                    break;
                                case 'Apellido paterno':
                                    input.name = 'apPaterno';
                                    break;
                                case 'Apellido materno':
                                    input.name = 'apMaterno';
                                    break;
                            }

                            div.append(input);


                            //Agregamos el div al form
                            form.append(div);
                        })

                    //sumbit
                    const submit = document.createElement('button');
                    submit.classList.add('btn');
                    submit.classList.add('btn-success');
                    submit.type = 'submit';
                    submit.innerHTML = 'Actualizar';
                    
                    //Agrego el submit al form
                    form.append(submit);
                    
                    //Mostramos el modal
                    let modalContent = document.querySelector('#modalActualizarUsuario .modal-content');
                    modalContent.append(form);
                    
                    modalContent.parentNode.style.display = "block";
                    

                });
                
                
               
                    
        }
    })
}

