const express = require('express');
const router = express.Router();
const db = require('../bd'); 

router.get('/', async (req, res) => {
    try {
        const [productos] = await db.query('SELECT * FROM zapatillas');
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [producto] = await db.query('SELECT * FROM zapatillas WHERE id = ?', [id]);

        if (producto.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto[0]);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
module.exports = router; // 
