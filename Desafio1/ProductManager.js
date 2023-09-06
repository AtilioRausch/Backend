class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const existingProduct = this.products.find((p) => p.code === code);
    if (existingProduct) {
      console.error(`El producto con código '${code}' ya existe en el sistema.`);
    } else {
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
      console.log(`Producto '${title}/${code}' agregado con éxito.`);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductByID(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      console.error("Not found");
      return null;
    }
  }
}

//-------TEST--------
//Instancia
const manager = new ProductManager();
//GetProducts - out empty array
console.log(manager.getProducts());
//AddProduct
manager.addProduct(title = "producto prueba", description = "Este es un producto prueba", price = 200, thumbnail = "Sin imagen", code = "abc123", stock = 25);
//GetProducts
console.log(manager.getProducts());
//AddProduct
manager.addProduct(title = "producto prueba", description = "Este es un producto prueba", price = 200, thumbnail = "Sin imagen", scode = "abc123", stock = 25);
console.log(manager.getProducts());
//Id que se encuentra
let product = manager.getProductByID(1);
if (product) {
  console.log("Producto encontrado:", product);
}
//Id que no se encuentra
manager.getProductByID(4);