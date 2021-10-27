import { registro } from "../class/registro.class";
import { registroList } from "..";

import "../css/componentes.css";

export const nombre = document.querySelector("#txtnombre"),
  apellido = document.querySelector("#txtapellido"),
  email = document.querySelector("#txtemail"),
  telefono = document.querySelector("#txttelefono"),
  folio = document.querySelector("#txtfolio"),
  ulList = document.querySelector("#lista"),
  btnGuardar = document.querySelector("#btnaceptar"),
  btnEditar = document.querySelector("#btneditar"),
  fecha = document.querySelector("#txtfecha");

//***Crea la fecha actual del registro del personal***

const nuevoRegistro = new registro();

//***Funciones *//
const bloquear = () => {
  nombre.disabled = true;
  apellido.disabled = true;
  email.disabled = true;
  telefono.disabled = true;
};

const limpiar = () => {
  nombre.value = "";
  apellido.value = "";
  email.value = "";
  telefono.value = "";
};

const fechas = () => {
  fecha.value = `${nuevoRegistro.fecha.getDate()}/${
    nuevoRegistro.fecha.getMonth() + 1
  }/${nuevoRegistro.fecha.getFullYear()}`;
};
//***********************************************************/

fechas();

fecha.disabled = true;

folio.disabled = true;

//***Creamos el evento 'click' guardar el cual se encargara de guardar los datos registrados y limpiar las cajas***

btnGuardar.addEventListener("click", () => {
  if (nombre.value || apellido.value || email.value || telefono.value > 0) {
    const nuevoRegistro = new registro(
      nombre.value,
      apellido.value,
      email.value,
      telefono.value
    );

    registroList.nuevoRegistro(nuevoRegistro);

    limpiar();

    folio.value = nuevoRegistro.id;

    crearRegistroHtml(nuevoRegistro);
  } else {
    alert("Favor de llenar todos los campos");
  }

  setTimeout(() => {
    folio.value = "";
  }, 10000);
});

//***Funcion que nos ayuda a crear nuestros elementos HTML de los clientes registrados con sus respectivos iconos***
export const crearRegistroHtml = (id) => {
  const htmlId = `<li data-id="${id.id}">
    <div class="view" id="container">
    <label id="elemento">${id.id}</label>

        <div class="row icon-container" id='div-container'>

        <div class="icon-preview col s6 m3" id="icon-cont">
        <i class="large material-icons" id="icon-edit" title='Editar informacion'>edit</i>
        </div>

        <div class="icon-preview col s6 m3" id="icon-cont">
        <i class="large material-icons" id="icon-delete" title='Borrar'>delete</i>
        </div>
        
        <div class="icon-preview col s6 m3" id="icon-cont">
        <i class="large material-icons" id="icon-acces" title='Ver informacion'>accessibility</i>
        </div>
        
        </div>
    </div>
</li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlId;

  ulList.append(div.firstElementChild);
  return div.firstElementChild;
};

//***Eventos de los iconos***
//***window.onload nos va a ayudar a que carge los elementos necesarios 'icono' y que los eventos no nos devuelva un null***
window.onload = () => {
  ulList.addEventListener("click", (event) => {
    // console.log(event.target.id)
    const nombreElemento = event.target.id,
      infoElemento =
        event.target.parentElement.parentElement.parentElement.parentElement,
      infoId = infoElemento.getAttribute("data-id");

    if (nombreElemento.includes("icon-edit")) {
      registroList.actualizarRegistro(infoId);
    } else if (nombreElemento.includes("icon-delete")) {
      const aviso = confirm("¿Esta seguro de eliminar registro?");

      if (aviso) {
        registroList.eliminarRegistro(infoId);
        ulList.removeChild(infoElemento);

        limpiar();
        fechas();
      }
    } else if (nombreElemento.includes("icon-acces")) {
      registroList.mostrarInformacio(infoId);

      bloquear();
    }
  });
};
