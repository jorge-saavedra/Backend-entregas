import { urlencoded, Router, json } from "express";
import { ProductManager } from "../ProductManager.js";
// import router from "./views.router.js";
// import { Server } from "../../app.js";

const productRouter = Router();
const pm = new ProductManager();

// productRouter.use("/:pid", (req, res, next) => {});
// productRouter.use("/", (req, res) => {});

productRouter.get("/", (req, res) => {});
// productRouter.get("/:pid", (req, res, next) => {});
productRouter.delete("/:pid", async (req, res) => {
  console.log("llegue");
  try {
    const product = await pm.getProductById(req.params.pid);
    const response = await pm.deleteProduct(req.params.pid);
    if (response.status) {
      res.status(200).json({ message: "Deleted product", product: product.id });
    } else
      return res
        .status(500)
        .json({ message: "Not Deleted product", product: product.id });
  } catch (error) {
    console.log(error);
  }
});

productRouter.use(json());
productRouter.use(urlencoded({ extended: true }));

productRouter.post("/products", (req, res, next) => {
  console.log(req, "req");
  console.log(res, "res");
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

    // Server.emit("add-product", req.body);
  } catch (error) {
    next(error);
  }
});

export default productRouter;
