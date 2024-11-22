const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rutaUsuarios = require('./rutas/usuarios');
const rutaProductos = require('./rutas/productos');
const rutacarrito = require('./rutas/carrito');
const rutaCarritoProductos = require('./rutas/carrito_producto');
const rutaPedidos = require('./rutas/pedido');
const rutaDetallesPedidos = require('./rutas/detalle_pedido');
const rutaEnvios = require('./rutas/envio');
const rutaPagos = require('./rutas/pago');
const rutaResena = require('./rutas/resena_producto');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


app.use('/usuarios', rutaUsuarios);
app.use('/productos', rutaProductos);
app.use('/carrito', rutacarrito);
app.use('/carrito_producto', rutaCarritoProductos);
app.use('/pedido', rutaPedidos);
app.use('/detalle_pedido', rutaDetallesPedidos);
app.use('/envio', rutaEnvios);
app.use('/pago', rutaPagos);
app.use('/resena_producto', rutaResena);


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

