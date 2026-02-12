import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async writeFile(data) {
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getAll() {
    return await this.readFile();
  }

  async getById(id) {
    const products = await this.readFile();
    return products.find(p => p.id === id);
  }

  async create(product) {
    const products = await this.readFile();

    const newProduct = {
      id: uuidv4(),
      status: true,
      ...product
    };

    products.push(newProduct);
    await this.writeFile(products);

    return newProduct;
  }

  async update(id, data) {
    const products = await this.readFile();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...data, id };

    await this.writeFile(products);
    return products[index];
  }

  async delete(id) {
    const products = await this.readFile();
    const filtered = products.filter(p => p.id !== id);

    if (filtered.length === products.length) return false;

    await this.writeFile(filtered);
    return true;
  }
}
