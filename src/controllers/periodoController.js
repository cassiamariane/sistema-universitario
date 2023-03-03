const modelo = require('../models/periodoModel')

module.exports = {
    criarPeriodo: async (req, res) => {
        try {
            const periodo = {
                codigo: req.body.codigo,
                datainicio: req.body.datainicio,
                datafinal: req.body.datafinal,
            };
            const resultado = await modelo.criaPeriodo(periodo);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao criar período' });
        }
    },

    buscarPeriodos: async (req, res) => {
        try {
            const resultado = await modelo.buscaPeriodos();
            res.json(resultado);
        } catch (err) {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro ao buscar períodos' });
        }
    },

    buscarPeriodo: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const resultado = await modelo.buscaPeriodo(codigo);
            if (!resultado) {
                res.status(404).json({ mensagem: 'Período não encontrado' });
            } else {
                res.json(resultado);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro ao buscar período' });
        }
    },

    editarPeriodo: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const periodo = {
                codigo: req.body.codigo,
                datainicio: req.body.datainicio,
                datafinal: req.body.datafinal,
            };
            const resultado = await modelo.editaPeriodo(codigo, periodo);
            res.json(resultado);
        } catch (err) {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro ao editar período' });
        }
    },

    deletarPeriodo: async (req, res) => {
        try {
            const codigo = req.params.codigo;
            const resultado = await modelo.deletaPeriodo(codigo);
            res.json(resultado);
        } catch (err) {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro ao deletar período' });
        }
    },
};