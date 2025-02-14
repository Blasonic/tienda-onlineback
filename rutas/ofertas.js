// rutas/ofertas.js
const express = require('express');
const router = express.Router();
const db = require('../bd');  
router.get('/', async (req, res) => {
    try {
        const [ofertas] = await db.query('SELECT * FROM ofertas_zapatillas');
        res.json(ofertas);
    } catch (error) {
        console.error('Error al obtener ofertas:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
