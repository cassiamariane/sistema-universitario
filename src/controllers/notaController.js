const modelo = require('../models/notaModel')

module.exports = {
    criarNota: async (req, res) => {
        try {
            const nota = {
                matriculadoaluno: req.body.matriculadoaluno,
                codigodaturma: req.body.codigodaturma,
                nota: req.body.nota,
                resultado: req.body.resultado
            }
            const resultado = await modelo.criaNota(nota)
            res.json(resultado)
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: "Ocorreu um erro ao criar a nota" })
        }
    },
    buscarNotas: async (req, res) => {
        try {
            const resultado = await modelo.buscaNotas()
            res.json(resultado)
        } catch (error) {
            res.status(500).json({ mensagem: "Ocorreu um erro ao buscar as Notas" })
        }
    },
    buscarNota: async (req, res) => {
        try {
            const matriculadoaluno = req.params.matriculadoaluno
            const codigodaturma = req.params.codigodaturma
            const resultado = await modelo.buscaNota(matriculadoaluno, codigodaturma)
            if (!resultado) {
                res.status(404).json({ mensagem: "Nota não encontrada" })
            } else {
                res.json(resultado)
            }
        } catch (error) {
            res.status(500).json({ mensagem: "Ocorreu um erro ao buscar a nota" })
        }
    },
    editarNota: async (req, res) => {
        try {
            const matriculadoaluno = req.params.matriculadoaluno
            const codigodaturma = req.params.codigodaturma
            const nota = {
                matriculadoaluno: req.body.matriculadoaluno,
                codigodaturma: req.body.codigodaturma,
                nota: req.body.nota,
                resultado: req.body.resultado
            }
            const resultado = await modelo.editaNota(matriculadoaluno, codigodaturma, nota)
            if (!resultado) {
                res.status(404).json({ mensagem: "Nota não encontrada" })
            } else {
                res.json(resultado)
            }
        } catch (error) {
            res.status(500).json({ mensagem: "Ocorreu um erro ao editar a nota" })
        }
    },
    deletarNota: async (req, res) => {
        try {
            const matriculadoaluno = req.params.matriculadoaluno
            const codigodaturma = req.params.codigodaturma
            const resultado = await modelo.deletaNota(matriculadoaluno, codigodaturma)
            if (!resultado) {
                res.status(404).json({ mensagem: "Nota não encontrada" })
            } else {
                res.json(resultado)
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: "Ocorreu um erro ao deletar a nota" })
        }
    }
}