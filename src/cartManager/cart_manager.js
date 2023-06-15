// Se importa el módulo fs para poder leer y escribir archivos.
import fs, {
      existsSync
} from 'fs';

// Se crea la clase CartManager.
class CartManager {

      // Se crea un constructor para inicializar el array del carrito y el path del archivo JSON.
      constructor() {

            this.carts = [];
            this.path = '../data/carts.json';

      }

      // Se crea el método createCart para crear un nuevo carrito.
      createCart = async () => {

            // Se intenta ejecutar la consulta.
            try {

                  const newCart = {
                        id: this.carts.length + 1,
                        products: []
                  };

                  this.carts.push(newCart);

                  await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'), 'utf-8');

            } catch (error) {

                  // Si hubo un error al ejecutar la consulta, se envía un mensaje de error.
                  console.log('Error al ejecutar el método createCart:', error);
                  throw error;

            };

      };

      // Se crea el método getCart para obtener el carrito por su id.
      getCartById = async (id) => {

            // Se intenta ejecutar la consulta.
            try {

                  // Se verifica si existe el archivo JSON.
                  if (fs.existsSync(this.path)) {

                        const cartData = await fs.promises.readFile(this.path, 'utf-8');
                        this.cart = JSON.parse(cartData);
                        const cart = this.cart.find((cart) => cart.id === id);

                        // Se verifica si existe el carrito.
                        if (!cart) return console.log(`El id: ${id} ingresado, no pertenece a ningún producto.`);

                        // Si existe el carrito, se retorna el array de productos dentro del carrito.
                        return cart.products;

                  }

            } catch (error) {

                  // Si hubo un error al ejecutar la consulta, se envía un mensaje de error.
                  console.log(`Error al ejecutar la consulta: ${error}`);

            };

      };

};

// Se exporta la clase ProductManager.
export default CartManager;