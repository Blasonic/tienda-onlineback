const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rutaUsuarios = require('./rutas/usuarios');
const rutaProductos = require('./rutas/productos');
const rutaPedidos = require('./rutas/pedidos');
const rutaDetallesPedidos = require('./rutas/detallesPedidos');
const rutacarrito = require('./rutas/carritos');
const rutaCarritoProductos = require('./rutas/carritoProductos');
const rutaPagos = require('./rutas/pagos');
const rutaEnvios = require('./rutas/envios');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


app.use('/usuarios', rutaUsuarios);
app.use('/productos', rutaProductos);
app.use('/pedidos', rutaPedidos);
app.use('/detalles-pedidos', rutaDetallesPedidos);
app.use('/carritos', rutacarrito);
app.use('/carrito-productos', rutaCarritoProductos);
app.use('/pagos', rutaPagos);
app.use('/envios', rutaEnvios);


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

