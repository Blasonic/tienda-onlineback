const express = require('express');
const router = express.Router();
const db = require('../bd');  
router.get('/', async (req, res) => {
    try {
        const [accesorios] = await db.query('SELECT * FROM accesorios');
        res.json(accesorios);
    } catch (error) {
        console.error('Error al obtener accesorios:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;