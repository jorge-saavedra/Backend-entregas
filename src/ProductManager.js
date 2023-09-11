import fs from "node:fs";

if (!fs.existsSync("src/filesPath/products.json")) {
  fs.writeFileSync("src/filesPath/products.json", "[]");
}

export class ProductManager {
  constructor() {
    this.path = "src/filesPath/products.json";

    this.products = JSON.parse(fs.readFileSync(this.path));
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
}
