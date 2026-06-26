import Model from "./model.js";

export default class Computadora extends Model {
  table = "computadoras";

  constructor(marca, modelo, numeroSerie, estado) {
    super();
    this.id = Date.now();
    this.marca = marca;
    this.modelo = modelo;
    this.numeroSerie = numeroSerie;
    this.estado = estado; // "Nueva" | "En mantenimiento" | "Reparada"
  }
}
