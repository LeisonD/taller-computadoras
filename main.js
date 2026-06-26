import inquirer from "inquirer";
import chalk from "chalk";

import ComputadoraController from "./app/controllers/computadoraController.js";
import RepuestoController from "./app/controllers/repuestoController.js";

async function init() {
  const setup = await inquirer.prompt([
    {
      type: "select",
      name: "opcion",
      message: `¿Qué deseas hacer?`,
      choices: [
        {
          name: "Computadoras",
          value: "1",
        },
        {
          name: "Repuestos",
          value: "2",
        },
        {
          name: "Salir",
          value: "3",
        },
      ],
    },
  ]);

  console.log(chalk.bgGray.black("Opción seleccionada: " + setup.opcion));
  return setup.opcion;
}

async function MainMenu(opcion) {
  if (opcion === "1") {
    const computadora = new ComputadoraController(opcion);
    await computadora.init();
  } else if (opcion === "2") {
    const repuesto = new RepuestoController(opcion);
    await repuesto.init();
  } else if (opcion === "3") {
    // Lógica para salir
  } else {
    console.log(
      chalk.bgRed.white(
        "Opción no válida. Por favor, selecciona una opción válida.",
      ),
    );
  }
}

let opcion;
do {
  console.clear();
  opcion = await init();
  await MainMenu(opcion);
} while (opcion !== "3");
