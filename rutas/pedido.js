const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crearPedido', (req, res) => {
    const { id_usuario, fecha_pedido, estado} = req.body;
    const sql = 'INSERT INTO Pedido (id_usuario, fecha_pedido, estado) VALUES (?, ?, ?)';
    pool.query(sql, [id_usuario, fecha_pedido, estado], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Pedido creado', id_pedido: result.insertId });
    });
});


router.get('/llamarPedido', (req, res) => {
    const sql = 'SELECT * FROM Pedido';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamarPedido/:id_pedido', (req, res) => {
    const { id_pedido } = req.params;
    const sql = 'SELECT * FROM Pedido WHERE id_pedido = ?';
    pool.query(sql, [id_pedido], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizarPedido/:id_pedido', (req, res) => {
    const { id_pedido } = req.params;
    const { id_usuario, fecha_pedido, estado} = req.body;
    const sql = 'UPDATE Pedido SET id_usuario = ?, fecha_pedido = ?, estado = ? WHERE id_pedido = ?';
    pool.query(sql, [id_usuario, fecha_pedido, estado, id_pedido], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.status(200).json({ message: 'Pedido actualizado' });
    });
});


router.delete('/borrarPedido/:id_pedido', (req, res) => {
    const { id_pedido } = req.params;
    const sql = 'DELETE FROM Pedido WHERE id_pedido = ?';
    pool.query(sql, [id_pedido], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Pedido no encontrado' });
        res.status(200).json({ message: 'Pedido eliminado' });
    });
});

module.exports = router;