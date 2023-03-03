const express = require('express');
const rota = express.Router();
const controller = require('../controllers/notaController')

rota.post('/notas', controller.criarNota);

rota.get('/notas', controller.buscarNotas)

rota.get('/notas/:matriculadoaluno?/:codigodaturma', controller.buscarNota)

rota.put(`/notas/:matriculadoaluno?/:codigodaturma`, controller.editarNota)

rota.delete('/notas/:matriculadoaluno?/:codigodaturma', controller.deletarNota)

module.exports = rota;