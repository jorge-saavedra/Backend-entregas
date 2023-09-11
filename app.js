import express from "express";
import { ProductManager } from "./src/ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

//Get para recuperar los productos
app.get("/products", (req, res) => {
  const { limit } = req.query;

  if (!limit) {
    const pm = new ProductManager();
    res.status(200).json(pm.getProducts());
  } else {
    const quantity = parseInt(limit);

    if (isNaN(quantity)) {
      res.status(404).json({ error: "La query debe ser un número" });
    } else {
      const pm = new ProductManager();
      res.status(200).json(pm.getProducts().slice(0, quantity));
    }
  }
});

app.get("/products/:pid", (req, res) => {
  const id = parseInt(req.params.pid);

  try {
    const product = new ProductManager().getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.listen(8080, () => {
  console.log("Escuchando en puerto 8080");
});
