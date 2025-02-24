const express = require('express');
const router = express.Router();
const db = require('../bd');  
router.get('/', async (req, res) => {
    try {
        const [colaboraciones] = await db.query('SELECT * FROM colaboraciones');
        res.json(colaboraciones);
    } catch (error) {
        console.error('Error al obtener zapatillas de colaboraciones:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
