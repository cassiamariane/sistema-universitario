const modelo = require('../models/turmaModel')

module.exports = {
    criarTurma: async (req, res) => {
        try {
            const turma = {
                codigo: req.body.codigo,
                professor: req.body.professor,
                codigodadisciplina: req.body.codigodadisciplina,
                codigodoperiodo: req.body.codigodoperiodo,
                sala: req.body.sala,
                horario: req.body.horario
            }
            const resultado = await modelo.criaTurma(turma)
            res.json(resultado)
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: "Ocorreu um erro ao criar a turma" })
        }
    },
    buscarTurmas: async (req, res) => {
        try {
            const resultado = await modelo.buscaTurmas()
            res.json(resultado)
        } catch (error) {
            res.status(500).json({ mensagem: "Ocorreu um erro ao buscar as turmas" })
        }
    },
    buscarTurma: async (req, res) => {
        try {
            const codigo = req.params.codigo
            const resultado = await modelo.buscaTurma(codigo)
            if (!resultado) {
                res.status(404).json({ mensagem: "Turma não encontrada" })
            } else {
                res.json(resultado)
            }
        } catch (error) {
            res.status(500).json({ mensagem: "Ocorreu um erro ao buscar a turma" })
        }
    },
    editarTurma: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const turma = {
                codigo: req.body.codigo,
                professor: req.body.professor,
                codigodadisciplina: req.body.codigodadisciplina,
                codigodoperiodo: req.body.codigodoperiodo,
                sala: req.body.sala,
                horario: req.body.horario
            }
            const resultado = await modelo.editaTurma(codigo, turma)
            if (!resultado) {
                res.status(404).json({ mensagem: "Turma não encontrada" })
            } else {
                res.json(resultado)
            }
        } catch (error) {
            res.status(500).json({ mensagem: "Ocorreu um erro ao editar a turma" })
        }
    },
    deletarTurma: async (req, res) => {
        try {
            const codigo = req.params.codigo
            const resultado = await modelo.deletaTurma(codigo)
            if (!resultado) {
                res.status(404).json({ mensagem: "Turma não encontrada" })
            } else {
                res.json(resultado)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: "Ocorreu um erro ao deletar a turma" })
        }
    },
    inserirAluno: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const dadosNota = req.body;
            const resultado = await modelo.inserirAluno(codigo, dadosNota)
            if (!resultado) {
                res.status(404).json({ mensagem: "Turma não encontrada" })
            } else {
                res.json(resultado)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: "Ocorreu um erro ao inserir o aluno" })
        }
    }
}