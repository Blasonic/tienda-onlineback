const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crearPago', (req, res) => {
    const { id_pedido, fecha_pago, metodo_pago, estado} = req.body;
    const sql = 'INSERT INTO Pago (id_pedido, fecha_pago,metodo_pago, estado) VALUES (?, ?, ?, ?)';
    pool.query(sql, [id_pedido, fecha_pago, metodo_pago, estado], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Pago creado', id_pago: result.insertId });
    });
});


router.get('/llamarPago', (req, res) => {
    const sql = 'SELECT * FROM Pago';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamarPago/:id_pago', (req, res) => {
    const { id_pago } = req.params;
    const sql = 'SELECT * FROM Pago WHERE id_pago = ?';
    pool.query(sql, [id_pago], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Pago no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizarPago/:id_pago', (req, res) => {
    const { id_pago } = req.params;
    const { id_pedido, fecha_pago, metodo_pago, estado} = req.body;
    const sql = 'UPDATE Pago SET id_pedido = ?, fecha_pago = ?, metodo_pago = ?, estado = ? WHERE id_pago = ?';
    pool.query(sql, [id_pedido, fecha_pago, metodo_pago, estado, id_pago], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Pago no encontrado' });
        res.status(200).json({ message: 'Pago actualizado' });
    });
});


router.delete('/borrarPago/:id_pago', (req, res) => {
    const { id_pago } = req.params;
    const sql = 'DELETE FROM Pago WHERE id_pago = ?';
    pool.query(sql, [id_pago], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Pago no encontrado' });
        res.status(200).json({ message: 'Pago eliminado' });
    });
});

module.exports = router;