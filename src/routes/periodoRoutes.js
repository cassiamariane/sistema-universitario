const express = require('express');
const rota = express.Router();
const controller = require('../controllers/periodoController')

rota.post('/periodos', controller.criarPeriodo);

rota.get('/periodos', controller.buscarPeriodos)

rota.get('/periodos/:codigo?', controller.buscarPeriodo)

rota.put(`/periodos/:codigo`, controller.editarPeriodo)

rota.delete('/periodos/:codigo', controller.deletarPeriodo)

module.exports = rota;