const express = require('express');
const rota = express.Router();
const controller = require('../controllers/turmaController')

rota.post('/turmas', controller.criarTurma);

rota.get('/turmas', controller.buscarTurmas)

rota.get('/turmas/:codigo?', controller.buscarTurma)

rota.put(`/turmas/:codigo`, controller.editarTurma)

rota.delete('/turmas/:codigo', controller.deletarTurma)

rota.post('/turmas/aluno/:codigo', controller.inserirAluno)

module.exports = rota;