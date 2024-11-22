const express = require('express');
const router = express.Router();
const pool = require('../bd');


router.post('/crearResena', (req, res) => {
    const {  id_producto,id_usuario, contenido} = req.body;
    const sql = 'INSERT INTO Reseña_Producto ( id_producto, id_usuario, contenido) VALUES (?, ?, ?)';
    pool.query(sql, [ id_producto, id_usuario, contenido], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Reseña creada', id_resena: result.insertId });
    });
});


router.get('/llamarResena', (req, res) => {
    const sql = 'SELECT * FROM Reseña_Producto';
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});


router.get('/llamarResena/:id_resena', (req, res) => {
    const { id_resena } = req.params;
    const sql = 'SELECT * FROM Reseña_Producto WHERE id_resena = ?';
    pool.query(sql, [id_resena], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json(result[0]);
    });
});

router.put('/actualizarResena/:id_resena', (req, res) => {
    const { id_resena } = req.params;
    const {  id_producto, id_usuario, contenido} = req.body;
    const sql = 'UPDATE Reseña_Producto SET id_producto = ?, id_usuario = ?, contenido = ? WHERE id_resena = ?';
    pool.query(sql, [ id_producto, id_usuario, contenido, id_resena], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Resena no encontrada' });
        res.status(200).json({ message: 'Resena actualizada' });
    });
});


router.delete('/borrarResena/:id_resena', (req, res) => {
    const { id_resena } = req.params;
    const sql = 'DELETE FROM Reseña_Producto WHERE id_resena = ?';
    pool.query(sql, [id_resena], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Resena no encontrada' });
        res.status(200).json({ message: 'Resena eliminada' });
    });
});

module.exports = router;