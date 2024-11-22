const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crearCarrito', (req, res) => {
    const { id_usuario, fecha_creacion} = req.body;
    const sql = 'INSERT INTO Carrito (id_usuario, fecha_creacion) VALUES (?, ?)';
    pool.query(sql, [id_usuario, fecha_creacion], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Carrito creado', id: result.insertId });
    });
});


router.get('/llamarCarrito', (req, res) => {
    const sql = 'SELECT * FROM Carrito';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamarCarrito:id_carrito', (req, res) => {
    const { id_carrito } = req.params;
    const sql = 'SELECT * FROM Carrito WHERE id_carrito = ?';
    pool.query(sql, [id_carrito], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizarCarrito/:id_carrito', (req, res) => {
    const { id_carrito } = req.params;
    const { id_usuario, fecha_creacion } = req.body;
    const sql = 'UPDATE Carrito SET id_usuario = ?, fecha_creacion = ? WHERE id_carrito = ?';
    pool.query(sql, [id_usuario, fecha_creacion, id_carrito], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json({ message: 'Carrito actualizado' });
    });
});


router.delete('/borrarCarrito/:id_carrito', (req, res) => {
    const { id_carrito } = req.params;
    const sql = 'DELETE FROM Carrito WHERE id_carrito = ?';
    pool.query(sql, [id_carrito], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Carrito no encontrado' });
        res.status(200).json({ message: 'Carrito eliminado' });
    });
});

module.exports = router;