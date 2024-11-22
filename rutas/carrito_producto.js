const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crearCarrito_producto', (req, res) => {
    const { id_carrito, id_producto, cantidad} = req.body;
    const sql = 'INSERT INTO Carrito_Producto (id_carrito, id_producto, cantidad) VALUES (?, ?, ?)';
    pool.query(sql, [id_carrito, id_producto, cantidad], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Carrito de producto creado', id: result.insertId });
    });
});


router.get('/llamarCarrito_producto', (req, res) => {
    const sql = 'SELECT * FROM Carrito';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamarCarrito_producto:id_carrito', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Carrito WHERE id_carrito = ?';
    pool.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizarCarrito_producto/:id_carrito_producto', (req, res) => {
    const { id_carrito_producto } = req.params;
    const { id_carrito, id_producto, cantidad } = req.body;
    const sql = 'UPDATE Carrito_Producto SET id_carrito = ?, id_producto = ?, cantidad = ? WHERE id_carrito_producto = ?';
    pool.query(sql, [id_carrito, id_producto, cantidad, id_carrito_producto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Carrito de producto no encontrado' });
        res.status(200).json({ message: 'Carrito de producto actualizado' });
    });
});


router.delete('/borrarCarrito_producto/:id_carrito_producto', (req, res) => {
    const { id_carrito_producto } = req.params;
    const sql = 'DELETE FROM Carrito_Producto WHERE id_carrito_producto = ?';
    pool.query(sql, [id_carrito_producto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Carrito del producto no encontrado' });
        res.status(200).json({ message: 'Carrito del producto eliminado' });
    });
});

module.exports = router;