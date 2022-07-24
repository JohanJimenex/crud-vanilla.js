const inputNombre = document.getElementById('inputNombre');

let arrayTareas = [];

let objTarea = {
    id: 0,
    nombre: ""
}

function agregarAlLocalStorage() {

    objTarea.nombre = inputNombre.value;

    if (objTarea.id == 0) {
        objTarea.id = arrayTareas.length + 1;
        arrayTareas.push(objTarea);

    } else {
        arrayTareas[objTarea.id - 1] = objTarea;
        console.log(objTarea);
    }


    localStorage.setItem('arrayTareas', JSON.stringify(arrayTareas));

    inputNombre.value = "";

    mandarTareaAlDOM();

}

function mandarTareaAlDOM() {

    let container = document.querySelector('.container');

    //limpiamos el contenedor
    container.innerHTML = "";


    for (const tarea of arrayTareas) {

        container.innerHTML += `
        <li> ${tarea.id} ${tarea.nombre}
            <button onclick="Seleccionar(${tarea.id}, '${tarea.nombre}' )" >Editar</button>
        </li>
        `
    }

    objTarea = {
        id: 0,
        nombre: ""
    }
}

function Seleccionar(id, nombre) {

    objTarea.id = id;
    objTarea.nombre = nombre;

    inputNombre.value = objTarea.nombre;

}


function recuperarDatosDelocalStorage() {
    
    //Recuperamos los datos del LS y lo convertimos a su array orignal
    let arrayDelLocalStorage = localStorage.getItem('arrayTareas');

    //si es diferente de null porque no hay nada la primera vez o se borraron entonces no lo agregamos, 
    if (arrayDelLocalStorage != null) {
        arrayTareas = JSON.parse(arrayDelLocalStorage);
    }

}

// //Este metodo se ejecuta cuando se actualiza la pagina o se abre el navegador
window.onload = function () {
    recuperarDatosDelocalStorage();
    mandarTareaAlDOM();
}

// //otra forma
document.addEventListener('load', recuperarDatosDelocalStorage());

