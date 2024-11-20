const express = require('express');
const router = express.Router();
const pool = require('../db');


router.post('/', (req, res) => {
    const { nombre, apellido, correo, telefono, tipo_usuario } = req.body;
    const sql = 'INSERT INTO Usuario (nombre, apellido, correo, telefono, tipo_usuario) VALUES (?, ?, ?, ?, ?)';
    pool.query(sql, [nombre, apellido, correo, telefono, tipo_usuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    });
});


router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Usuario';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Usuario WHERE id_usuario = ?';
    pool.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono, tipo_usuario } = req.body;
    const sql = 'UPDATE Usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ?, tipo_usuario = ? WHERE id_usuario = ?';
    pool.query(sql, [nombre, apellido, correo, telefono, tipo_usuario, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario actualizado' });
    });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Usuario WHERE id_usuario = ?';
    pool.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    });
});

module.exports = router;
