// app.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const negociosRouter = require('./routes/negocios');
const iaRouter = require('./routes/ia');

const cobradoresRouter = require('./routes/cobradores');
const trackingRouter = require('./routes/tracking');

// Endpoints
app.use('/api/negocios', negociosRouter);
app.use('/api/ia', iaRouter);
app.use('/api/cobradores', cobradoresRouter);
app.use('/api/tracking', trackingRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
