// Se importa el módulo express y se crea el router.
import express from 'express';
const router = express.Router();

// Se importa la clase CartManager.
import CartManager from '../cartManager/cart_manager.js';

// Se crea una instancia de la clase CartManager.
const cartManager = new CartManager();

// Se crea un endpoint POST para crear un nuevo carrito.
router.post('/', async (req, res) => {

      // Se intenta ejecutar la consulta.
      try {

            // Se crea el carrito utilizando el método createCart de la clase CartManager.
            const cart = await cartManager.createCart();

            // Se envía el carrito.
            res.send(cart);

      } catch (error) {

            // Si hubo un error al ejecutar la consulta, se envía un mensaje de error.
            res.status(500).send({
                  status: "error",
                  error: "Error al ejecutar la consulta."
            });

      };

});

// Se exporta el router.
export default router;