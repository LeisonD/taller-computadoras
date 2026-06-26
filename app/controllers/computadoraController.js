import inquirer from "inquirer";
import chalk from "chalk";

import Computadora from "../models/computadora.js";
import Helper from "../helpers/helper.js";

export default class ComputadoraController {
  opcion = 0;
  opciones = [
    {
      name: "Menu anterior",
      value: 0,
    },
    {
      name: "Mostrar Computadoras",
      value: 1,
    },
    {
      name: "Registrar Computadora",
      value: 2,
    },
    {
      name: "Actualizar Computadora",
      value: 3,
    },
    {
      name: "Eliminar Computadora",
      value: 4,
    },
  ];

  constructor(opcion) {
    this.opcion = opcion;
    this.computadora = new Computadora();
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
    console.log(chalk.bgGreen.white("Registrando computadora..."));

    let payload = await inquirer.prompt([
      {
        type: "input",
        name: "marca",
        message: "Ingrese la marca de la computadora:",
        validate: (input) => {
          if (input.trim() === "") {
            return "La marca no puede estar vacía.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "modelo",
        message: "Ingrese el modelo de la computadora:",
        validate: (input) => {
          if (input.trim() === "") {
            return "El modelo no puede estar vacío.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "numeroSerie",
        message: "Ingrese el número de serie:",
        validate: (input) => {
          if (input.trim() === "") {
            return "El número de serie no puede estar vacío.";
          }
          return true;
        },
      },
      {
        type: "select",
        name: "estado",
        message: "Seleccione el estado de la computadora:",
        choices: [
          { name: "Nueva", value: "Nueva" },
          { name: "En mantenimiento", value: "En mantenimiento" },
          { name: "Reparada", value: "Reparada" },
        ],
      },
    ]);

    const existe = await this.validateComputadora(payload.numeroSerie);
    if (existe) {
      console.log(
        chalk.bgRed.white(
          "No se puede registrar, ya existe una computadora con ese número de serie",
        ),
      );
      console.log();
      await Helper.esperar();
      return;
    }

    await this.computadora.save({
      table: this.computadora.getTable(),
      id: Date.now(),
      marca: payload.marca,
      modelo: payload.modelo,
      numeroSerie: payload.numeroSerie,
      estado: payload.estado,
    });

    console.log();
    console.log(chalk.bgGreen.white("Computadora registrada exitosamente"));
    await Helper.esperar();
  }

  async read() {
    console.log(chalk.bgBlue.white("Mostrando computadoras..."));
    console.log();
    const computadoras = await this.computadora.load();
    console.table(computadoras);
    console.log();
    await Helper.esperar();
  }

  async update() {
    console.clear();
    console.log(chalk.bgYellow.black("Actualizando computadora..."));
    console.log();

    const computadoras = await this.computadora.load();

    if (computadoras.length === 0) {
      console.log(chalk.bgRed.white("No hay computadoras registradas"));
      await Helper.esperar();
      return;
    }

    const { seleccionada } = await inquirer.prompt([
      {
        type: "select",
        name: "seleccionada",
        message: "Seleccione la computadora a actualizar:",
        choices: computadoras.map((c) => ({
          name: `${c.marca} ${c.modelo} (${c.numeroSerie}) - ${c.estado}`,
          value: c,
        })),
      },
    ]);

    let payload = await inquirer.prompt([
      {
        type: "input",
        name: "marca",
        message: "Nueva marca:",
        default: seleccionada.marca,
        validate: (input) => {
          if (input.trim() === "") {
            return "La marca no puede estar vacía.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "modelo",
        message: "Nuevo modelo:",
        default: seleccionada.modelo,
        validate: (input) => {
          if (input.trim() === "") {
            return "El modelo no puede estar vacío.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "numeroSerie",
        message: "Nuevo número de serie:",
        default: seleccionada.numeroSerie,
        validate: (input) => {
          if (input.trim() === "") {
            return "El número de serie no puede estar vacío.";
          }
          return true;
        },
      },
      {
        type: "select",
        name: "estado",
        message: "Nuevo estado:",
        default: seleccionada.estado,
        choices: [
          { name: "Nueva", value: "Nueva" },
          { name: "En mantenimiento", value: "En mantenimiento" },
          { name: "Reparada", value: "Reparada" },
        ],
      },
    ]);

    await this.computadora.update(seleccionada.id, payload);

    console.log();
    console.log(chalk.bgGreen.white("Computadora actualizada exitosamente"));
    await Helper.esperar();
  }

  async delete() {
    console.clear();
    console.log(chalk.bgRed.white("Eliminando computadora..."));
    console.log();

    const computadoras = await this.computadora.load();

    if (computadoras.length === 0) {
      console.log(chalk.bgRed.white("No hay computadoras registradas"));
      await Helper.esperar();
      return;
    }

    const { seleccionada } = await inquirer.prompt([
      {
        type: "select",
        name: "seleccionada",
        message: "Seleccione la computadora a eliminar:",
        choices: computadoras.map((c) => ({
          name: `${c.marca} ${c.modelo} (${c.numeroSerie}) - ${c.estado}`,
          value: c,
        })),
      },
    ]);

    const { confirmar } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmar",
        message: `¿Confirma eliminar "${seleccionada.marca} ${seleccionada.modelo}" (${seleccionada.numeroSerie})?`,
        default: false,
      },
    ]);

    if (!confirmar) {
      console.log(chalk.bgYellow.black("Eliminación cancelada"));
      await Helper.esperar();
      return;
    }

    await this.computadora.delete(seleccionada.id);

    console.log();
    console.log(chalk.bgGreen.white("Computadora eliminada exitosamente"));
    await Helper.esperar();
  }

  async validateComputadora(numeroSerie) {
    const computadoras = await this.computadora.load();
    const computadora = computadoras.find(
      (c) =>
        c.numeroSerie.toLowerCase().trim() ===
        numeroSerie.toLowerCase().trim(),
    );
    return computadora;
  }

  async init() {
    let opcion;
    do {
      console.clear();
      opcion = await Helper.menu("Menú de Computadoras", this.opciones);
      await this.validarMenu(opcion);
    } while (opcion != 0);
  }
}
