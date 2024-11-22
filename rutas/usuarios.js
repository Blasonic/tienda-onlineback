const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crear', (req, res) => {
    const { nombre, apellido, correo, telefono} = req.body;
    const sql = 'INSERT INTO Usuario (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)';
    pool.query(sql, [nombre, apellido, correo, telefono], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    });
});


router.get('/llamar', (req, res) => {
    const sql = 'SELECT * FROM Usuario';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamar/:id_usuario', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Usuario WHERE id_usuario = ?';
    pool.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizar/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, apellido, correo, telefono } = req.body;
    const sql = 'UPDATE Usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id_usuario = ?';
    pool.query(sql, [nombre, apellido, correo, telefono, id_usuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario actualizado' });
    });
});


router.delete('/borrar/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const sql = 'DELETE FROM Usuario WHERE id_usuario = ?';
    pool.query(sql, [id_usuario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    });
});

module.exports = router;
