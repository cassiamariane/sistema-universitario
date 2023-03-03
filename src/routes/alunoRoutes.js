const express = require('express');
const rota = express.Router();
const controller = require('../controllers/alunoController')

rota.post('/alunos', controller.criarAluno);

rota.get('/alunos', controller.buscarAlunos)

rota.get('/alunos/:matricula', controller.buscarAluno)

rota.put('/alunos/:matricula', controller.editarAluno)

rota.delete('/alunos/:matricula', controller.deletarAluno)

rota.get('/alunos/:matricula/ira', controller.iraTotal)

rota.get('/alunos/:matricula/:periodo/ira', controller.iraAlunoPeriodo)

module.exports = rota;