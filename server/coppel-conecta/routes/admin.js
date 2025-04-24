const express = require('express');
const router = express.Router();
const {
  getCobradoresBySucursal,
  getEmprendimientosByCobrador,
  getStatsCobrador,
  getEmprendedorDetail
} = require('../controllers/adminController');

// Middleware de autenticación para admin
const isAdmin = (req, res, next) => {
  if (req.user.rol === 'admin') next();
  else res.status(403).send('Acceso denegado');
};

router.use(isAdmin);

// Endpoints
router.get('/cobradores/:sucursal', async (req, res) => {
  const cobradores = await getCobradoresBySucursal(req.params.sucursal);
  res.json(cobradores);
});

router.get('/cobrador/:id', async (req, res) => {
  const stats = await getStatsCobrador(req.params.id);
  const emprendimientos = await getEmprendimientosByCobrador(req.params.id);
  res.json({ ...stats, emprendimientos });
});

router.get('/emprendedor/:id', async (req, res) => {
  const data = await getEmprendedorDetail(req.params.id);
  res.json(data);
});

module.exports = router;