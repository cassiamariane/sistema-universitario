const express = require('express');
const rota = express.Router();
const controller = require('../controllers/disciplinaController')

rota.post('/disciplinas', controller.criarDisciplina);

rota.get('/disciplinas', controller.buscarDisciplinas)

rota.get('/disciplinas/:codigo?', controller.buscarDisciplina)

rota.put(`/disciplinas/:codigo`, controller.editarDisciplina)

rota.delete('/disciplinas/:codigo', controller.deletaDisciplina)

module.exports = rota;