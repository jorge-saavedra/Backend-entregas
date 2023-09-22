import fs from "node:fs";

if (!fs.existsSync("src/filesPath/products.json")) {
  fs.writeFileSync("src/filesPath/products.json", "[]");
}

export class ProductManager {
  constructor() {
    this.path = "src/filesPath/products.json";

    this.products = JSON.parse(fs.readFileSync(this.path));
  }
  static #lastProductId;

  /**
   * Devuelve el que será el próximo id de producto.
   */
  get nextProductId() {
    return ProductManager.#lastProductId + 1;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    try {
      const product = this.getProducts().find((element) => element.id == id);

      if (!product) {
        throw new Error("Not Found");
      } else {
        return product;
      }
    } catch (err) {
      throw err;
    }
  }

  deleteProduct = async (productId) => {
    const existingProduct = this.getProductById(productId);

    if (existingProduct) {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );

      this.save();

      return { status: true, message: "deleted product" };
    } else {
      return { status: false, message: "not deleted product" };
      // throw new Error(
      //   `No product was deleted. Product with id ${product.id} was not found.`
      // );
    }
  };

  addProduct = (newProduct) => {
    const existingProduct = this.getProductByCode(newProduct.code);

    if (existingProduct) {
      throw new Error(
        `There is already a product with code ${newProduct.code}.`
      );
    }

    newProduct.id = ProductManager.#generateNextProductId();

    this.products.push(newProduct);

    this.save();

    // Devuelve el id del nuevo producto como indicador que la
    // operación fue exitosa.
    return newProduct.id;
  };
  static #generateNextProductId = () => ++ProductManager.#lastProductId;
}
