// Se importa el módulo express para poder crear el servidor.
import express from 'express';

// Se crea el servidor.
const app = express();

// Se designa el puerto en el que se va a ejecutar el servidor.
const port = 8080;

// Se configura el servidor para que pueda recibir y enviar datos en formato json.
app.use(express.json());

// Se configura el servidor para que pueda recibir y enviar datos en formato urlencoded.
app.use(express.urlencoded({
      extended: true
}));

// Se importa el enrutador de productos.
import productsRouter from './routes/products.router.js';

// Se importa el enrutador de carritos.
import cartsRouter from './routes/carts.router.js';

// Se utiliza el enrutador de productos.
app.use('/api/products', productsRouter);

// Se utiliza el enrutador de carritos.
app.use('/api/carts', cartsRouter);

// Se inicia el servidor.
app.listen(port, () => {

      console.log(`Servidor iniciado en el puerto ${port}`);

});