import { apellido, email, folio, nombre, telefono } from '../js/componentes';
import { registro } from './registro.class';

export class RegistroList{

    constructor(){
        this.cargarLocalStorage();
        // this.persona = [];
    }
    
    nuevoRegistro( datos ){
  
        this.persona.push( datos );
        this.guardarLocalStorage();

    }

    actualizarRegistro(){

    }

    eliminarRegistro( id ){

      this.persona = this.persona.filter(person => person.id != id);

      this.guardarLocalStorage(); 
 
    }

    mostrarInformacio( id ){

        for(let i=0; i<this.persona.length;i++){

          if( this.persona[i].id == id ){

             folio.value       = this.persona[i].id;
             nombre.value   = this.persona[i].nombre;
             apellido.value = this.persona[i].apellido;
             email.value    = this.persona[i].email;
             telefono.value = this.persona[i].telefono;
            //  fecha.value    = this.persona[i].fecha;

          }
        
           
        }
    }

    guardarLocalStorage(){

        localStorage.setItem('datos', JSON.stringify(this.persona));
    
    }

    cargarLocalStorage(){

        this.persona = (localStorage.getItem('datos'))?
        JSON.parse(localStorage.getItem('datos'))
        :[];

    }
}