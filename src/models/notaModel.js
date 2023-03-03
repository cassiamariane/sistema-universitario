const connection = require('../database/connection')

function criaNota(nota) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO Nota(MatriculadoAluno, CodigodaTurma, Nota, Resultado) VALUES('${nota.matriculadoaluno}','${nota.codigodaturma}','${nota.nota}','${nota.resultado}')`,
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

function buscaNotas() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM Nota", function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function buscaNota(matriculadoaluno, codigodaturma) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM Nota WHERE MatriculadoAluno = ${matriculadoaluno} AND CodigodaTurma = ${codigodaturma}`,
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

function editaNota(matriculadoaluno, codigodaturma) {
    return new Promise((resolve, reject) => {
        const campos = {};
        if (nota.matriculadoaluno) campos.matriculadoaluno = nota.matriculadoaluno;
        if (nota.codigodaturma) campos.codigodaturma = nota.codigodaturma;
        if (nota.nota) campos.nota = nota.nota;
        if (nota.resultado) campos.resultado = nota.resultado;
        connection.query('UPDATE Nota SET ? WHERE MatriculadoAluno = ?', [campos, matriculadoaluno],'AND CodigodaTurma = ?', [campos, codigodaturma], (error, results, fields) => {
          if (error) {
              reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function deletaNota(matriculadoaluno, codigodaturma) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM Nota WHERE MatriculadoAluno = ${matriculadoaluno} AND CodigodaTurma = ${codigodaturma}`, function (
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
    criaNota,
    buscaNotas,
    buscaNota,
    editaNota,
    deletaNota
}