// Se importa el módulo fs para poder leer y escribir archivos.
const fs = require('fs');

// Se crea la clase ProductManager.
class ProductManager {

      // Se crea un constructor para inicializar el array de productos y el path del archivo JSON.
      constructor() {

            this.products = [];
            this.path = '../data/products.json';

      }

      // Se crea un método para retornar los productos.
      getProducts = async () => {

            // Se intenta ejecutar el método getProducts.
            try {

                  // Si el archivo existe, se lee, se parsea y el resultado se retorna.
                  if (fs.existsSync(this.path)) {

                        const productData = await fs.promises.readFile(this.path, 'utf-8');
                        const products = JSON.parse(productData);
                        return products;

                        // Si el archivo no existe, se retorna un array vacío.
                  } else {

                        return [];

                  }

            } catch (error) {

                  // Si hubo un error, se muestra un mensaje de error y se lanza el error.
                  console.error("Error al ejectuar el método getProducts:", error);
                  throw error;

            }

      };

      // Se crea un método para agregar un producto.
      addProduct = async (title, description, price, thumbnail, code, stock) => {

            // Se intenta ejecutar el método addProduct.
            try {

                  // Se crea un objeto con los datos del producto.
                  const newProduct = {
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock,
                        id: this.products.length + 1,
                  };

                  // Se verifica que el producto no tenga campos vacíos.
                  if (
                        newProduct.title == null ||
                        newProduct.description == null ||
                        newProduct.price == null ||
                        newProduct.thumbnail == null ||
                        newProduct.code == null ||
                        newProduct.stock == null
                  ) {

                        console.log('El producto ingresado no puede tener campos vacíos.');
                        return;

                  }

                  // Se verifica que el código del producto no exista.
                  if (this.products.some((product) => product.code === code)) {

                        console.log(`El código: ${code} ingresado, ya pertenece a otro producto.`);
                        return;

                  }

                  // Se pushea el producto al array.
                  this.products.push(newProduct);

                  // Se escribe el array en el archivo JSON.
                  await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'), 'utf-8');

            } catch (error) {

                  // Si hubo un error, se muestra un mensaje de error y se lanza el error.
                  console.error("Error al ejectuar el método addProduct:", error);
                  throw error;

            };

      };

      // Se crea un método para retornar un producto por su id.
      getProductById = async (id) => {

            // Se intenta ejecutar el método getProductById.
            try {

                  // Se verifica que exista el archivo JSON.
                  if (fs.existsSync(this.path)) {

                        const productData = await fs.promises.readFile(this.path, 'utf-8');
                        this.products = JSON.parse(productData);
                        const product = this.products.find((product) => product.id === id);

                        // Se verifica que el producto exista.
                        if (product) {

                              // Si el producto existe, se retorna.
                              return product;

                        } else {

                              // Si el producto no existe, se muestra un mensaje de error y retorna.
                              console.log(`El id: ${id} ingresado, no pertenece a ningún producto.`);
                              return;

                        };

                        // Si el archivo no existe, se muestra un mensaje de error y retorna.
                  } else {

                        return "No existe ningún producto creado.";

                  };

            } catch (error) {

                  // Si hubo un error, se muestra un mensaje de error y se lanza el error.
                  console.error("Error al ejectuar el método getProductById:", error);
                  throw error;

            };

      };

      // Se crea un método para modificar un producto.
      updateProduct = async (id, title, description, price, thumbnail, code, stock) => {

            // Se intenta ejecutar el método updateProduct.
            try {

                  // Se verifica que exista el archivo JSON.
                  if (fs.existsSync(this.path)) {

                        const productData = await fs.promises.readFile(this.path, 'utf-8');
                        this.products = JSON.parse(productData);

                        // Utilizando el método getProductById, se obtiene el producto a modificar.
                        const product = await this.getProductById(id);

                        // Se verifica que el producto exista.
                        if (product) {

                              // Se crea un objeto con los datos del producto actualizado.
                              const updatedProduct = {
                                    ...product,
                                    title: title || product.title,
                                    description: description || product.description,
                                    price: price || product.price,
                                    thumbnail: thumbnail || product.thumbnail,
                                    code: code || product.code,
                                    stock: stock || product.stock,
                              };

                              // Se verifica que el producto no tenga campos vacíos.
                              if (
                                    updatedProduct.title == null ||
                                    updatedProduct.description == null ||
                                    updatedProduct.price == null ||
                                    updatedProduct.thumbnail == null ||
                                    updatedProduct.code == null ||
                                    updatedProduct.stock == null
                              ) {

                                    console.log('El producto ingresado no puede tener campos vacíos.');
                                    return;

                              };

                              // Se verifica que el código del producto no exista.
                              if (code && this.products.some((p) => p.id !== id && p.code === code)) {

                                    console.log(`El código: ${code} ingresado, ya pertenece a otro producto.`);
                                    return;

                              };

                              // Se reemplaza el producto en el array.
                              this.products = this.products.map((p) => (p.id === id ? updatedProduct : p));

                              // Se escribe el array en el archivo JSON.
                              await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'), 'utf-8');

                              console.log('Producto actualizado correctamente.');

                        } else {

                              console.log(`El id: ${id} ingresado, no pertenece a ningún producto.`);
                              return;

                        };

                  } else {

                        console.log('No existe ningún producto creado.');
                        return;

                  };

            } catch (error) {

                  // Si hubo un error, se muestra un mensaje de error y se lanza el error.
                  console.error("Error al ejectuar el método updateProduct:", error);
                  throw error;

            };

      };

      // Se crea un método para eliminar todos los productos.
      deleteAllProducts = async () => {

            // Se intenta ejecutar el método deleteAllProducts.
            try {

                  // Se verifica que exista el archivo JSON.
                  if (fs.existsSync(this.path)) {

                        // Se vacía el array de productos y se elimina el archivo JSON.
                        this.products = [];
                        await fs.promises.unlink(this.path);

                        console.log("Todos los productos han sido eliminados.");


                  } else {

                        console.log("No existe ningún producto creado.");
                        return;

                  };

            } catch (error) {

                  // Si hubo un error, se muestra un mensaje de error y se lanza el error.
                  console.error("Error al ejectuar el método deleteAllProducts:", error);
                  throw error;

            };

      };

      // Se crea un método para eliminar un producto según su id.
      deleteProduct = async (id) => {

            // Se intenta ejecutar el método deleteProduct.
            try {

                  // Se verifica que exista el archivo JSON.
                  if (fs.existsSync(this.path)) {

                        const productData = await fs.promises.readFile(this.path, 'utf-8');
                        this.products = JSON.parse(productData);

                        // Se utiliza el método getProductById para obtener el producto a eliminar.
                        const productToDelete = await this.getProductById(id);

                        // Se verifica que el producto exista.
                        if (productToDelete) {

                              // Se reemplaza el array sin el producto eliminado.
                              this.products = this.products.filter((product) => product.id !== id);

                              // Se verifica que el array no quede vacío.
                              if (this.products.length === 0) {

                                    console.log("No existen más productos.");

                                    // Si el array queda vacío, se elimina el archivo JSON.
                                    await fs.promises.unlink(this.path);

                                    return;

                                    // Si el array no queda vacío, se escribe el array en el archivo JSON.
                              } else {

                                    // Se escribe el array en el archivo JSON.
                                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'), 'utf-8');

                              };


                        } else {

                              console.log(`El id: ${id} ingresado, no pertenece a ningún producto.`);
                              return;

                        };

                  } else {

                        console.log("No existe ningún producto creado.");
                        return;

                  };

            } catch (error) {

                  // Si hubo un error, se muestra un mensaje de error y se lanza el error.
                  console.error("Error al ejectuar el método deleteProduct:", error);
                  throw error;

            };

      };



};

// Se exporta la clase ProductManager.
module.exports = ProductManager;