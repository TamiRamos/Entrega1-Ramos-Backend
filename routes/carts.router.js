import { Router } from "express";
import {
  createCart,
  getCart,
  addProduct
} from "../controllers/carts.controller.js";

const router = Router();

router.post("/", createCart);
router.get("/:cid", getCart);
router.post("/:cid/product/:pid", addProduct);

export default router;
