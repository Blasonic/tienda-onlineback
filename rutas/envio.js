const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crearEnvio', (req, res) => {
    const { id_pedido, direccion_envio, fecha_envio, estado_envio} = req.body;
    const sql = 'INSERT INTO Envio (id_pedido, direccion_envio, fecha_envio, estado_envio) VALUES (?, ?, ?, ?)';
    pool.query(sql, [id_pedido, direccion_envio, fecha_envio, estado_envio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Envio creado', id_envio: result.insertId });
    });
});


router.get('/llamarEnvio', (req, res) => {
    const sql = 'SELECT * FROM Envio';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamarEnvio:id_envio', (req, res) => {
    const { id_envio } = req.params;
    const sql = 'SELECT * FROM Envio WHERE id_envio = ?';
    pool.query(sql, [id_envio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Envio no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizarEnvio/:id_envio', (req, res) => {
    const { id_envio } = req.params;
    const { id_pedido, direccion_envio, fecha_envio, estado_envio} = req.body;
    const sql = 'UPDATE Envio SET id_pedido = ?,direccion_envio = ?, fecha_envio = ?, estado_envio = ? WHERE id_envio = ?';
    pool.query(sql, [id_pedido, direccion_envio, fecha_envio, estado_envio, id_envio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Envio no encontrado' });
        res.status(200).json({ message: 'Envio actualizado' });
    });
});


router.delete('/borrarEnvio/:id_envio', (req, res) => {
    const { id_envio } = req.params;
    const sql = 'DELETE FROM Envio WHERE id_envio = ?';
    pool.query(sql, [id_envio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Envio no encontrado' });
        res.status(200).json({ message: 'Envio eliminado' });
    });
});

module.exports = router;