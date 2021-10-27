export class registro {
  constructor(nombre, apellido, email, telefono) {
    this.id = new Date().getTime();
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
    this.fecha = new Date();
  }
}
