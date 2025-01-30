const express = require('express');
const router = express.Router();
const db = require('../bd');  
router.get('/', async (req, res) => {
    try {
        const [mujeres] = await db.query('SELECT * FROM zapatillas_mujer');
        res.json(mujeres);
    } catch (error) {
        console.error('Error al obtener zapatillas de mujeres:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
