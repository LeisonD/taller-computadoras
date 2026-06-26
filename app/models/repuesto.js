import Model from "./model.js";

export default class Repuesto extends Model {
  table = "repuestos";

  constructor(nombre, categoria, cantidad, precio) {
    super();
    this.id = Date.now();
    this.nombre = nombre;
    this.categoria = categoria; // ej: RAM, Disco, Fuente de poder...
    this.cantidad = cantidad;
    this.precio = precio;
  }
}
