const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const rutaUsuarios = require('./rutas/usuarios');
const rutaProductos = require('./rutas/productos');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


app.use('/usuarios', rutaUsuarios);
app.use('/productos', rutaProductos);



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

