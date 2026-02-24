import CartManager from "../managers/CartManager.js";

const manager = new CartManager("./data/carts.json");

export const createCart = async (req, res, next) => {
  try {
    const cart = await manager.createCart();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await manager.getCartById(req.params.cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const cart = await manager.addProductToCart(
      req.params.cid,
      req.params.pid
    );

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    next(error);
  }
};
