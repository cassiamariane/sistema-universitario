const connection = require('../database/connection')

function criaTurma(turma) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO Turma(Codigo, Professor, CodigodaDisciplina, CodigodoPeriodo, Sala, Horario) VALUES('${turma.codigo}','${turma.professor}','${turma.codigodadisciplina}','${turma.codigodoperiodo}','${turma.sala}','${turma.horario}')`,
            function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

function buscaTurmas() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM Turma", function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function buscaTurma(codigo) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM Turma WHERE Codigo = ${codigo}`,
            function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
}

function editaTurma(codigo, turma) {
    return new Promise((resolve, reject) => {
        const campos = {};
        if (turma.codigo) campos.codigo = turma.codigo;
        if (turma.professor) campos.professor = turma.professor;
        if (turma.codigodadisciplina) campos.codigodadisciplina = turma.codigodadisciplina;
        if (turma.codigodoperiodo) campos.codigodoperiodo = turma.codigodoperiodo;
        if (turma.sala) campos.sala = turma.sala;
        if (turma.horario) campos.horario = turma.horario;
        connection.query('UPDATE turma SET ? WHERE codigo = ?', [campos, codigo], (error, results, fields) => {
          if (error) {
              reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function deletaTurma(codigo) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM Turma WHERE Codigo = ${codigo}`, function (
            error,
            results
        ) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function inserirAluno(codigo, dadosNota) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO Nota (MatriculadoAluno, CodigodaTurma, Nota, Resultado) VALUES ('${dadosNota.matricula}','${codigo}','${dadosNota.nota}','${dadosNota.resultado}')`, function (
            error,
            results
        ) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    criaTurma,
    buscaTurmas,
    buscaTurma,
    editaTurma,
    deletaTurma,
    inserirAluno,
}