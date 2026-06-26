import inquirer from "inquirer";
import chalk from "chalk";
import Helper from "../helpers/helper.js";

// TODO: importar el modelo Computadora cuando esté listo
// import Computadora from "../models/computadora.js";

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
    // TODO: this.computadora = new Computadora();
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

    console.log(payload);
    // TODO: validar duplicados y guardar usando this.computadora.save(...)
    console.log(
      chalk.bgYellow.black(
        "Pendiente: conectar con el modelo para guardar el registro",
      ),
    );
    await Helper.esperar();
  }

  async read() {
    console.log(chalk.bgBlue.white("Mostrando computadoras..."));
    console.log();
    // TODO: cargar datos reales usando this.computadora.load()
    console.log(
      chalk.bgYellow.black("Pendiente: conectar con el modelo para leer los registros"),
    );
    console.log();
    await Helper.esperar();
  }

  async update() {
    console.clear();
    console.log(chalk.bgYellow.black("Actualizando computadora..."));
    console.log();
    // TODO: cargar lista con this.computadora.load(), seleccionar registro,
    // pedir nuevos datos y guardar con this.computadora.update(id, payload)
    console.log(
      chalk.bgYellow.black(
        "Pendiente: conectar con el modelo para actualizar un registro",
      ),
    );
    await Helper.esperar();
  }

  async delete() {
    console.clear();
    console.log(chalk.bgRed.white("Eliminando computadora..."));
    console.log();
    // TODO: cargar lista con this.computadora.load(), seleccionar registro,
    // confirmar y eliminar con this.computadora.delete(id)
    console.log(
      chalk.bgYellow.black(
        "Pendiente: conectar con el modelo para eliminar un registro",
      ),
    );
    await Helper.esperar();
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
