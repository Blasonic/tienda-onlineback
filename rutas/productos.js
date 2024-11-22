const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crearProducto', (req, res) => {
    const { nombre, descripcion, precio, stock} = req.body;
    const sql = 'INSERT INTO Producto (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)';
    pool.query(sql, [nombre, descripcion, precio, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Producto creado', id_producto: result.insertId });
    });
});


router.get('/llamarProducto', (req, res) => {
    const sql = 'SELECT * FROM Producto';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamar:id_producto', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Producto WHERE id_producto = ?';
    pool.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizarProducto/:id_producto', (req, res) => {
    const { id_producto } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;
    const sql = 'UPDATE Producto SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?';
    pool.query(sql, [nombre, descripcion, precio, stock, id_producto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto actualizado' });
    });
});


router.delete('/borrarProducto/:id_producto', (req, res) => {
    const { id_producto } = req.params;
    const sql = 'DELETE FROM Producto WHERE id_producto = ?';
    pool.query(sql, [id_producto], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto eliminado' });
    });
});

module.exports = router;