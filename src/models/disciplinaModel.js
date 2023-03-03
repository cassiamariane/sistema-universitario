const connection = require('../database/connection')

function criaDisciplina(disciplina) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Disciplina(Codigo, Departamento, Nome, CargaHoraria) VALUES('${disciplina.codigo}', '${disciplina.departamento}', '${disciplina.nome}', '${disciplina.carga_horaria}')`;
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function buscaDisciplinas() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Disciplina';
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function buscaDisciplina(codigo) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Disciplina WHERE Codigo = ${codigo}`;
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function editaDisciplina(codigo, disciplina) {
    return new Promise((resolve, reject) => {
        const campos = {};
        if (disciplina.nome) campos.nome = disciplina.nome;
        if (disciplina.departamento) campos.departamento = disciplina.departamento;
        if (disciplina.carga_horaria) campos.carga_horaria = disciplina.carga_horaria;
        if (disciplina.codigo) campos.codigo = disciplina.codigo;
        connection.query('UPDATE disciplina SET ? WHERE codigo = ?', [campos, codigo], (error, results, fields) => {
          if (error) {
              reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function deletaDisciplina(codigo) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM Disciplina WHERE Codigo='${codigo}'`;
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    criaDisciplina,
    buscaDisciplinas,
    buscaDisciplina,
    editaDisciplina,
    deletaDisciplina
}