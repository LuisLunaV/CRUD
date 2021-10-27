import {
  apellido,
  email,
  fecha,
  folio,
  nombre,
  telefono,
} from "../js/componentes";

import { registro } from "./registro.class";

export class RegistroList {
  constructor() {
    this.cargarLocalStorage();
  }

  nuevoRegistro(datos) {
    this.persona.push(datos);
    this.guardarLocalStorage();
  }

  actualizarRegistro(id) {
    this.persona.filter((element) => {
      if (element.id == id) {
        folio.value = element.id;
        nombre.value = element.nombre;
        apellido.value = element.apellido;
        email.value = element.email;
        telefono.value = element.telefono;
        fecha.value = element.fecha;
      }
    });

    this.guardarLocalStorage();
  }

  eliminarRegistro(id) {
    this.persona = this.persona.filter((person) => person.id != id);

    this.guardarLocalStorage();
  }

  mostrarInformacio(id) {
    this.persona.find((element) => {
      if (element.id == id) {
        folio.value = element.id;
        nombre.value = element.nombre;
        apellido.value = element.apellido;
        email.value = element.email;
        telefono.value = element.telefono;
        fecha.value = element.fecha;
      }
    });
  }

  guardarLocalStorage() {
    localStorage.setItem("datos", JSON.stringify(this.persona));
  }

  cargarLocalStorage() {
    this.persona = localStorage.getItem("datos")
      ? JSON.parse(localStorage.getItem("datos"))
      : [];
  }
}
