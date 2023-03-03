const modelo = require('../models/alunoModel')

module.exports = {
    criarAluno: async (req, res) => {
        const aluno = {
            nome: req.body.nome,
            matricula: req.body.matricula,
            data_nasc: req.body.data_nasc,
            email: req.body.email,
            data_matricula: req.body.data_matricula,
        };

        try {
            console.log(aluno);
            const resultado = await modelo.criaAluno(aluno);
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao criar aluno' });
        }
    },

    buscarAlunos: async (req, res) => {
        try {
            const resultado = await modelo.buscaAlunos();
            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar alunos' });
        }
    },

    buscarAluno: async (req, res) => {
        const matricula = req.params.matricula;

        try {
            const resultado = await modelo.buscaAluno(matricula);
            console.log(resultado);
            if (!resultado) {
                return res.status(404).json({ mensagem: 'Aluno não encontrado' });
            }

            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao buscar aluno' });
        }
    },

    editarAluno: async (req, res) => {
        const matricula = req.params.matricula;
        const aluno = {
            nome: req.body.nome,
            matricula: req.body.matricula,
            data_nasc: req.body.data_nasc,
            email: req.body.email,
            data_matricula: req.body.data_matricula,
        };

        try {
            const resultado = await modelo.editaAluno(matricula, aluno);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Aluno não encontrado' });
            }

            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao editar aluno' });
        }
    },

    deletarAluno: async (req, res) => {
        const matricula = req.params.matricula;

        try {
            const resultado = await modelo.deletaAluno(matricula);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Aluno não encontrado' });
            }

            res.json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao deletar aluno' });
        }
    },

    iraTotal: async (req, res) => {
        try {
            const matricula = req.params.matricula;
            const resultado = await modelo.iraTotalAluno(matricula);
            console.log(resultado);
            res.json({resultado});
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao calcular IRA total dos alunos' });
        }
    },

    iraAlunoPeriodo: async (req, res) => {
        const periodo = req.params.periodo;
        const matricula = req.params.matricula
        try {
            const resultado = await modelo.iraAlunoPeriodo(matricula, periodo);
            console.log(resultado);
            res.json({resultado});
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao calcular IRA total dos alunos no período especificado' });
        }
    },
};