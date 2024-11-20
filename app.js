const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usuariosRoutes = require('./rutas/usuarios');
const productosRoutes = require('./rutas/productos');
const pedidosRoutes = require('./rutas/pedidos');
const detallesPedidosRoutes = require('./rutas/detallesPedidos');
const carritosRoutes = require('./rutas/carritos');
const carritoProductosRoutes = require('./rutas/carritoProductos');
const pagosRoutes = require('./rutas/pagos');
const enviosRoutes = require('./rutas/envios');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/detalles-pedidos', detallesPedidosRoutes);
app.use('/carritos', carritosRoutes);
app.use('/carrito-productos', carritoProductosRoutes);
app.use('/pagos', pagosRoutes);
app.use('/envios', enviosRoutes);

// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

