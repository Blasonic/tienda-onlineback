const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crearDetalle_pedido', (req, res) => {
    const { id_pedido, id_producto, cantidad, precio} = req.body;
    const sql = 'INSERT INTO Detalle_Pedido (id_pedido, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)';
    pool.query(sql, [id_pedido, id_producto, cantidad, precio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Detalle creado', id_detalle_producto: result.insertId });
    });
});


router.get('/llamarDetalle_pedido', (req, res) => {
    const sql = 'SELECT * FROM Detalle_Pedido';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamarDetalle:id_detalle', (req, res) => {
    const { id_detalle } = req.params;
    const sql = 'SELECT * FROM Detalle_Pedido WHERE id_detalle = ?';
    pool.query(sql, [id_detalle], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizarDetalle_Pedido/:id_detalle', (req, res) => {
    const { id_detalle } = req.params;
    const { id_pedido, id_producto, cantidad, precio} = req.body;
    const sql = 'UPDATE Detalle_Pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio = ? WHERE id_detalle = ?';
    pool.query(sql, [id_pedido, id_producto, cantidad, precio, id_detalle], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
        res.status(200).json({ message: 'Detalle actualizado' });
    });
});


router.delete('/borrarDetalle_pedido/:id_detalle', (req, res) => {
    const { id_detalle } = req.params;
    const sql = 'DELETE FROM Detalle_Pedido WHERE id_detalle = ?';
    pool.query(sql, [id_detalle], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle no encontrado' });
        res.status(200).json({ message: 'Detalle eliminado' });
    });
});

module.exports = router;