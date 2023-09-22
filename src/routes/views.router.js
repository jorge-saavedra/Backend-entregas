import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const viewsRouter = Router();

const pm = new ProductManager();

viewsRouter.get("/", async (req, res) => {
  const products = pm.getProducts();
  res.render("index", { products });
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
  const products = pm.getProducts();
  res.render("realTimeProducts", { products });
});

viewsRouter.get("/home", async (req, res) => {
  res.render("home", {});
});

export default viewsRouter;
