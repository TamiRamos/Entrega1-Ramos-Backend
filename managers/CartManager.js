import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class CartManager {
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

  async createCart() {
    const carts = await this.readFile();

    const newCart = {
      id: uuidv4(),
      products: []
    };

    carts.push(newCart);
    await this.writeFile(carts);

    return newCart;
  }

  async getCartById(id) {
    const carts = await this.readFile();
    return carts.find(c => c.id === id);
  }

  async addProductToCart(cid, pid) {
    const carts = await this.readFile();
    const cart = carts.find(c => c.id === cid);

    if (!cart) return null;

    const product = cart.products.find(p => p.product === pid);

    if (product) {
      product.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.writeFile(carts);
    return cart;
  }
}
