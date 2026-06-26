import inquirer from "inquirer";
import chalk from "chalk";
import Helper from "../helpers/helper.js";

// TODO: importar el modelo Repuesto cuando esté listo
// import Repuesto from "../models/repuesto.js";

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
    // TODO: this.repuesto = new Repuesto();
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

    console.log(payload);
    // TODO: validar duplicados y guardar usando this.repuesto.save(...)
    console.log(
      chalk.bgYellow.black(
        "Pendiente: conectar con el modelo para guardar el registro",
      ),
    );
    await Helper.esperar();
  }

  async read() {
    console.log(chalk.bgBlue.white("Mostrando repuestos..."));
    console.log();
    // TODO: cargar datos reales usando this.repuesto.load()
    console.log(
      chalk.bgYellow.black("Pendiente: conectar con el modelo para leer los registros"),
    );
    console.log();
    await Helper.esperar();
  }

  async update() {
    console.clear();
    console.log(chalk.bgYellow.black("Actualizando repuesto..."));
    console.log();
    // TODO: cargar lista con this.repuesto.load(), seleccionar registro,
    // pedir nuevos datos y guardar con this.repuesto.update(id, payload)
    console.log(
      chalk.bgYellow.black(
        "Pendiente: conectar con el modelo para actualizar un registro",
      ),
    );
    await Helper.esperar();
  }

  async delete() {
    console.clear();
    console.log(chalk.bgRed.white("Eliminando repuesto..."));
    console.log();
    // TODO: cargar lista con this.repuesto.load(), seleccionar registro,
    // confirmar y eliminar con this.repuesto.delete(id)
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
      opcion = await Helper.menu("Menú de Repuestos", this.opciones);
      await this.validarMenu(opcion);
    } while (opcion != 0);
  }
}
