const express = require('express');
const router = express.Router();
const db = require('../bd');  
router.get('/', async (req, res) => {
    try {
        const [hombres] = await db.query('SELECT * FROM zapatillas_hombres');
        res.json(hombres);
    } catch (error) {
        console.error('Error al obtener zapatillas de hombres:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
