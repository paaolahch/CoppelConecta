const express = require('express');
const router = express.Router();
const cobradoresController = require('../controllers/cobradores');

// Obtener todos los cobradores
router.get('/', cobradoresController.obtenerCobradores);

// Obtener un cobrador por su ID
router.get('/:id', cobradoresController.obtenerCobradorPorId);

// Crear un nuevo cobrador
router.post('/', cobradoresController.crearCobrador);

// Actualizar un cobrador existente
router.put('/:id', cobradoresController.actualizarCobrador);

// Eliminar un cobrador
router.delete('/:id', cobradoresController.eliminarCobrador);

module.exports = router;
