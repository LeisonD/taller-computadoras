import fs from "fs/promises";

export default class Model {
  table = "models";

  getTable() {
    return this.table;
  }

  async save(payload) {
    let datos = await this.load();
    datos.push(payload);

    await fs.writeFile(
      `db/${this.getTable()}.json`,
      JSON.stringify(datos, null, 2),
    );
    return payload;
  }

  async load() {
    try {
      const data = await fs.readFile(`db/${this.getTable()}.json`, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async update(id, payload) {
    let datos = await this.load();
    const index = datos.findIndex((registro) => registro.id === id);

    if (index === -1) {
      return null;
    }

    datos[index] = { ...datos[index], ...payload };

    await fs.writeFile(
      `db/${this.getTable()}.json`,
      JSON.stringify(datos, null, 2),
    );

    return datos[index];
  }

  async delete(id) {
    let datos = await this.load();
    const existe = datos.some((registro) => registro.id === id);

    if (!existe) {
      return false;
    }

    datos = datos.filter((registro) => registro.id !== id);

    await fs.writeFile(
      `db/${this.getTable()}.json`,
      JSON.stringify(datos, null, 2),
    );

    return true;
  }
}
