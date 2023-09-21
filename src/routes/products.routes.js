import { urlencoded, Router, json } from "express";
import { ProductManager } from "../ProductManager.js";
import router from "./views.router.js";
import { Server } from "../../app.js";

const router = Router();
const pm = new ProductManager();

router.use("/:pid", (req, res, next) => {});
router.use("/", (req, res) => {});
router.get("/", (req, res) => {});
router.get("/:pid", (req, res, next) => {});
router.delete("/:pid", (req, res, next) => {
  try {
    const product = req.pm.getProductById(req.params.pid);
    req.pm.deleteProduct(req.params.pid);
    res.status(200).json({ message: "Deleted product", product: product });

    Server.emit("deleted-product", req.params.pid);
  } catch (error) {
    next(error);
  }
});

router.use(json());
router.use(urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  const { title, description, code, stock, price, category } = req.body;

  try {
    req.ProductManager.addProduct(
      title,
      description,
      code,
      stock,
      price,
      category
    );

    res.status(200).json({ message: "product add", product: req.body });

    Server.emit("add-product", req.body);
  } catch (error) {
    next(error);
  }
});
