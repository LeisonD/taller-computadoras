import inquirer from "inquirer";
import chalk from "chalk";

import Repuesto from "../models/repuesto.js";
import Helper from "../helpers/helper.js";

export default class RepuestoController {
  opcion = 0;
  opciones = [
    {
      name: "Menu anterior",
      value: 0,
    },
    {
      name: "Mostrar Repuestos",
      value: 1,
    },
    {
      name: "Registrar Repuesto",
      value: 2,
    },
    {
      name: "Actualizar Repuesto",
      value: 3,
    },
    {
      name: "Eliminar Repuesto",
      value: 4,
    },
  ];

  constructor(opcion) {
    this.opcion = opcion;
    this.repuesto = new Repuesto();
  }

  async validarMenu(opcion) {
    if (opcion == 0) {
      return;
    } else if (opcion == 1) {
      await this.read();
    } else if (opcion == 2) {
      await this.create();
    } else if (opcion == 3) {
      await this.update();
    } else if (opcion == 4) {
      await this.delete();
    } else {
      console.log(chalk.bgRed.white("Opción no válida"));
    }
  }

  async create() {
    console.clear();
    console.log(chalk.bgGreen.white("Registrando repuesto..."));

    let payload = await inquirer.prompt([
      {
        type: "input",
        name: "nombre",
        message: "Ingrese el nombre del repuesto:",
        validate: (input) => {
          if (input.trim() === "") {
            return "El nombre no puede estar vacío.";
          }
          return true;
        },
      },
      {
        type: "select",
        name: "categoria",
        message: "Seleccione la categoría del repuesto:",
        choices: [
          { name: "RAM", value: "RAM" },
          { name: "Disco Duro / SSD", value: "Almacenamiento" },
          { name: "Fuente de poder", value: "Fuente de poder" },
          { name: "Placa madre", value: "Placa madre" },
          { name: "Procesador", value: "Procesador" },
          { name: "Tarjeta de video", value: "Tarjeta de video" },
          { name: "Cooler / Ventilador", value: "Cooler" },
          { name: "Otro", value: "Otro" },
        ],
      },
      {
        type: "input",
        name: "cantidad",
        message: "Ingrese la cantidad disponible:",
        validate: (input) => {
          const cantidad = parseInt(input);
          if (isNaN(cantidad) || cantidad < 0) {
            return "La cantidad debe ser un número válido (0 o más).";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "precio",
        message: "Ingrese el precio unitario:",
        validate: (input) => {
          const precio = parseFloat(input);
          if (isNaN(precio) || precio < 0) {
            return "El precio debe ser un número válido (0 o más).";
          }
          return true;
        },
      },
    ]);

    const existe = await this.validateRepuesto(payload.nombre);
    if (existe) {
      console.log(
        chalk.bgRed.white("No se puede registrar, ya existe ese repuesto"),
      );
      console.log();
      await Helper.esperar();
      return;
    }

    const { confirmar } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmar",
        message: `¿Confirma registrar "${payload.nombre}" (${payload.categoria}) con cantidad ${payload.cantidad} y precio $${payload.precio}?`,
        default: true,
      },
    ]);

    if (!confirmar) {
      console.log(chalk.bgYellow.black("Registro cancelado"));
      await Helper.esperar();
      return;
    }

    await this.repuesto.save({
      table: this.repuesto.getTable(),
      id: Date.now(),
      nombre: payload.nombre,
      categoria: payload.categoria,
      cantidad: parseInt(payload.cantidad),
      precio: parseFloat(payload.precio),
    });

    console.log();
    console.log(chalk.bgGreen.white("Repuesto registrado exitosamente"));
    await Helper.esperar();
  }

  async read() {
    console.log(chalk.bgBlue.white("Mostrando repuestos..."));
    console.log();
    const repuestos = await this.repuesto.load();
    console.table(repuestos);
    console.log();
    await Helper.esperar();
  }

  async update() {
    console.clear();
    console.log(chalk.bgYellow.black("Actualizando repuesto..."));
    console.log();

    const repuestos = await this.repuesto.load();

    if (repuestos.length === 0) {
      console.log(chalk.bgRed.white("No hay repuestos registrados"));
      await Helper.esperar();
      return;
    }

    const { seleccionado } = await inquirer.prompt([
      {
        type: "select",
        name: "seleccionado",
        message: "Seleccione el repuesto a actualizar:",
        choices: repuestos.map((r) => ({
          name: `${r.nombre} (${r.categoria}) - cant: ${r.cantidad} - $${r.precio}`,
          value: r,
        })),
      },
    ]);

    let payload = await inquirer.prompt([
      {
        type: "input",
        name: "nombre",
        message: "Nuevo nombre:",
        default: seleccionado.nombre,
        validate: (input) => {
          if (input.trim() === "") {
            return "El nombre no puede estar vacío.";
          }
          return true;
        },
      },
      {
        type: "select",
        name: "categoria",
        message: "Nueva categoría:",
        default: seleccionado.categoria,
        choices: [
          { name: "RAM", value: "RAM" },
          { name: "Disco Duro / SSD", value: "Almacenamiento" },
          { name: "Fuente de poder", value: "Fuente de poder" },
          { name: "Placa madre", value: "Placa madre" },
          { name: "Procesador", value: "Procesador" },
          { name: "Tarjeta de video", value: "Tarjeta de video" },
          { name: "Cooler / Ventilador", value: "Cooler" },
          { name: "Otro", value: "Otro" },
        ],
      },
      {
        type: "input",
        name: "cantidad",
        message: "Nueva cantidad:",
        default: String(seleccionado.cantidad),
        validate: (input) => {
          const cantidad = parseInt(input);
          if (isNaN(cantidad) || cantidad < 0) {
            return "La cantidad debe ser un número válido (0 o más).";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "precio",
        message: "Nuevo precio:",
        default: String(seleccionado.precio),
        validate: (input) => {
          const precio = parseFloat(input);
          if (isNaN(precio) || precio < 0) {
            return "El precio debe ser un número válido (0 o más).";
          }
          return true;
        },
      },
    ]);

    await this.repuesto.update(seleccionado.id, {
      nombre: payload.nombre,
      categoria: payload.categoria,
      cantidad: parseInt(payload.cantidad),
      precio: parseFloat(payload.precio),
    });

    console.log();
    console.log(chalk.bgGreen.white("Repuesto actualizado exitosamente"));
    await Helper.esperar();
  }

  async delete() {
    console.clear();
    console.log(chalk.bgRed.white("Eliminando repuesto..."));
    console.log();

    const repuestos = await this.repuesto.load();

    if (repuestos.length === 0) {
      console.log(chalk.bgRed.white("No hay repuestos registrados"));
      await Helper.esperar();
      return;
    }

    const { seleccionado } = await inquirer.prompt([
      {
        type: "select",
        name: "seleccionado",
        message: "Seleccione el repuesto a eliminar:",
        choices: repuestos.map((r) => ({
          name: `${r.nombre} (${r.categoria}) - cant: ${r.cantidad} - $${r.precio}`,
          value: r,
        })),
      },
    ]);

    const { confirmar } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmar",
        message: `¿Confirma eliminar "${seleccionado.nombre}"?`,
        default: false,
      },
    ]);

    if (!confirmar) {
      console.log(chalk.bgYellow.black("Eliminación cancelada"));
      await Helper.esperar();
      return;
    }

    await this.repuesto.delete(seleccionado.id);

    console.log();
    console.log(chalk.bgGreen.white("Repuesto eliminado exitosamente"));
    await Helper.esperar();
  }

  async validateRepuesto(nombre) {
    const repuestos = await this.repuesto.load();
    const repuesto = repuestos.find(
      (r) => r.nombre.toLowerCase().trim() === nombre.toLowerCase().trim(),
    );
    return repuesto;
  }

  async init() {
    let opcion;
    do {
      console.clear();
      opcion = await Helper.menu("Menú de Repuestos", this.opciones);
      await this.validarMenu(opcion);
    } while (opcion != 0);
  }
}
