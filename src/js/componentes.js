import { registro } from '../class/registro.class';
import { registroList } from '..';

import '../css/componentes.css';

export const nombre   = document.querySelector('#txtnombre'),
             apellido = document.querySelector('#txtapellido'),
             email    = document.querySelector('#txtemail'),
             telefono = document.querySelector('#txttelefono'),
             folio    = document.querySelector('#txtfolio'),
             ulList   = document.querySelector('#lista');


export const btnGuardar = document.querySelector('#btnaceptar');
export const btnEditar  = document.querySelector('#btneditar');

//***Crea la fecha actual del registro del personal***
const nuevoRegistro = new registro( );

export const fecha = document.querySelector('#txtfecha');

fecha.value = `${nuevoRegistro.fecha.getDate()}/${nuevoRegistro.fecha.getMonth()+1}/${nuevoRegistro.fecha.getFullYear()}`;

fecha.disabled = true;

folio.disabled = true;

//***Creamos el evento 'click' guardar el cual se encargara de guardar los datos registrados y limpiar las cajas***

btnGuardar.addEventListener('click', ()=>{

    if(nombre.value || apellido.value || email.value || telefono.value >0){

    const nuevoRegistro = new registro(nombre.value, apellido.value,email.value,telefono.value);

    registroList.nuevoRegistro(nuevoRegistro);
  
    nombre.value   = '';
    apellido.value = '';
    email.value    = '';
    telefono.value = '';

    folio.value= nuevoRegistro.id;

   crearRegistroHtml(nuevoRegistro);

}else{

alert('Favor de llenar todos los campos');

}  

setTimeout(()=>{folio.value=''}, 10000);
});

export const crearRegistroHtml = ( id ) =>{

    const htmlId =`<li data-id="${id.id}">
    <div class="view" id="container">
    <label id="elemento">${id.id}</label>

        <div class="row icon-container" id='div-container'>

        <div class="icon-preview col s6 m3" id="icon-cont">
        <i class="large material-icons" id="icon-edit">edit</i>
        </div>

        <div class="icon-preview col s6 m3" id="icon-cont">
        <i class="large material-icons" id="icon-delete">delete</i>
        </div>
        
        <div class="icon-preview col s6 m3" id="icon-cont">
        <i class="large material-icons" id="icon-acces">accessibility</i>
        </div>
        
        </div>
    </div>
</li>`

const div = document.createElement( 'div' );
div.innerHTML = htmlId;

ulList.append(div.firstElementChild);
return div.firstElementChild;
};

//***Eventos de los iconos***
//***window.onload nos va a ayudar a que carge los elementos necesarios 'icono' y que los eventos no nos devuelva un null***

window.onload =()=>{ 

ulList.addEventListener('click', (event)=>{

        // console.log(event.target.id)
        const nombreElemento = event.target.id;
        const infoElemento = event.target.parentElement.parentElement.parentElement.parentElement;
        const infoId = infoElemento.getAttribute('data-id');

if(nombreElemento.includes('icon-edit')){

alert('editar');

}else if(nombreElemento.includes('icon-delete')){

    const aviso = confirm('¿Esta seguro de eliminar registro?');

if(aviso){

    registroList.eliminarRegistro( infoId );
    ulList.removeChild( infoElemento );

    nombre.value   = '';
    apellido.value = '';
    email.value    = '';
    telefono.value = '';
    

}


}else if(nombreElemento.includes('icon-acces')){

  registroList.mostrarInformacio( infoId );

}

    });
}