const connection = require('../database/connection')

function verificaDias(dataI, dataF) {
    const dI = new Date(dataI).getTime();
    const dF = new Date(dataF).getTime();
    return (dF - dI) / (1000 * 60 * 60 * 24);
}

function criaPeriodo(periodo) {
    return new Promise((resolve, reject) => {
        if (verificaDias(periodo.datainicio, periodo.datafinal) < 90) {
            reject(new Error("O intervalo de dias entre a Data Inicial e a Data Final deve ser de pelo menos 90 dias úteis"));
        }
        const query = `INSERT INTO Periodo(Codigo, DataInicio, DataFinal) VALUES('${periodo.codigo}','${periodo.datainicio}','${periodo.datafinal}')`;
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
}

function buscaPeriodos() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Periodo';
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function buscaPeriodo(codigo) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Periodo WHERE Codigo = ${codigo}`;
        connection.query(query, function (error, results) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function editaPeriodo(codigo, periodo) {
    return new Promise((resolve, reject) => {
        const campos = {};
        if (periodo.datainicio) campos.datainicio = periodo.datainicio;
        if (periodo.datafinal) campos.datafinal = periodo.datafinal;
        if (periodo.codigo) campos.codigo = periodo.codigo;

        if (periodo.datainicio && periodo.datafinal) {
            if (verificaDias(periodo.datainicio, periodo.datafinal) < 90) {
                reject(new Error("O intervalo de dias entre a Data Inicial e a Data Final deve ser de pelo menos 90 dias úteis"));
            }

        }
        connection.query('UPDATE periodo SET ? WHERE codigo = ?', [campos, codigo], (error, results, fields) => {
          if (error) {
              reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function deletaPeriodo(codigo) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM Periodo WHERE Codigo = '${codigo}'`;
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
    criaPeriodo,
    buscaPeriodos,
    buscaPeriodo,
    editaPeriodo,
    deletaPeriodo
}