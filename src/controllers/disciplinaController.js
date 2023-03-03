const modelo = require('../models/disciplinaModel')

module.exports = {
    criarDisciplina: async (req, res) => {
        const disciplina = {
            codigo: req.body.codigo,
            departamento: req.body.departamento,
            nome: req.body.nome,
            carga_horaria: req.body.carga_horaria
        };
        try {
            const resultado = await modelo.criaDisciplina(disciplina);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao criar disciplina");
        }
    },
    buscarDisciplinas: async (req, res) => {
        try {
            const resultado = await modelo.buscaDisciplinas();
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao buscar disciplinas");
        }
    },
    buscarDisciplina: async (req, res) => {
        const codigo = req.params.codigo;
        try {
            const resultado = await modelo.buscaDisciplina(codigo);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao buscar disciplina");
        }
    },
    editarDisciplina: async (req, res) => {
        const codigo = req.params.codigo;
        const disciplina = {
            codigo: req.body.codigo,
            departamento: req.body.departamento,
            nome: req.body.nome,
            carga_horaria: req.body.carga_horaria
        };
        try {
            const resultado = await modelo.editaDisciplina(codigo, disciplina);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao editar disciplina");
        }
    },
    deletaDisciplina: async (req, res) => {
        const codigo = req.params.codigo;
        try {
            const resultado = await modelo.deletaDisciplina(codigo);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao deletar disciplina");
        }
    }
}