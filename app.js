const express = require('express');
const app = express();

const rotasAluno = require('./src/routes/alunoRoutes')
const rotaDisciplina = require('./src/routes/disciplinaRoutes')
const rotasPeriodo = require('./src/routes/periodoRoutes')
const rotasTurma = require('./src/routes/turmaRoutes')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(rotasAluno)
app.use(rotaDisciplina)
app.use(rotasPeriodo)
app.use(rotasTurma)

module.exports = app