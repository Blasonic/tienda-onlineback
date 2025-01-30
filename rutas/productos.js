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


router.post('/crearProducto', async (req, res) => {
    const { src, alt, label, price } = req.body;
    try {
        const sql = 'INSERT INTO zapatillas (src, alt, label, price) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [src, alt, label, price]);
        res.status(201).json({ message: 'Producto creado', id_producto: result.insertId });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

router.get('/llamarProducto', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM zapatillas');
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


router.get('/llamarProducto/:id_producto', async (req, res) => {
    const { id } = req.params;  
    console.log(`Buscando producto con id: ${id}`);  
    try {
        const [result] = await db.query('SELECT * FROM zapatillas WHERE id = ?', [parseInt(id)]);
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


router.put('/actualizarProducto/:id_producto', async (req, res) => {
    const { id } = req.params;
    const { src, alt, label, price } = req.body;
    try {
        const sql = 'UPDATE zapatillas SET src = ?, alt = ?, label = ?, price = ? WHERE id = ?';
        const [result] = await db.query(sql, [src, alt, label, price, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


router.delete('/borrarProducto/:id_producto', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM zapatillas WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
