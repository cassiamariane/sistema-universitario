const connection = require('../database/connection')

function verificaDataNasc(data_nasc) {
    data_nasc = new Date(data_nasc);
    const dAtual = new Date();
    return dAtual.getFullYear() - data_nasc.getFullYear();
}

function verificaMatricula(matricula, data_matricula) {
    const ano_matricula = matricula.substr(0, 4)
    data_matricula = new Date(data_matricula).getFullYear()
    return ano_matricula == data_matricula.toString()
}

function criaAluno(aluno) {
    return new Promise((resolve, reject) => {
        let dif = verificaDataNasc(aluno.data_nasc);
        let mat = verificaMatricula(aluno.matricula, aluno.data_matricula);
        if (dif >= 16) {
            if (mat == true) {
                connection.query(`INSERT INTO Aluno(Nome, Matricula, DatadeNascimento, Email) VALUES('${aluno.nome}','${aluno.matricula}','${aluno.data_nasc}','${aluno.email}')`, function (error, results) {
                    if (error)
                        reject(error);
                    console.log(results);
                    resolve(results);
                });
            } else {
                reject("Matrícula deve corresponder ao ano em que a matrícula foi realizada");
            }
        } else {
            reject("Precisa ter pelo menos 16 anos");
        }
    });
}

function buscaAlunos() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Aluno', function (error, results) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

function buscaAluno(matricula) {
    console.log(matricula);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Aluno WHERE matricula = ${matricula};`, function (error, results) {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    });
}

function editaAluno(matricula, aluno) {
    return new Promise((resolve, reject) => {
        if (aluno.data_nasc && verificaDataNasc(aluno.data_nasc) < 16) {
            reject("Precisa ter pelo menos 16 anos");
        }
        if (aluno.matricula && aluno.data_matricula && !verificaMatricula(aluno.matricula, aluno.data_matricula)) {
            reject("Matrícula deve corresponder ao ano em que a matrícula foi realizada");
        }
          // Verifica quais campos foram enviados para serem editados
        const campos = {};
        if (aluno.nome) campos.nome = aluno.nome;
        if (aluno.data_nasc) campos.data_nasc = aluno.data_nasc;
        if (aluno.data_matricula) campos.data_matricula = aluno.data_matricula;
        if (aluno.matricula) campos.matricula = aluno.matricula;
        if (aluno.email) campos.email = aluno.email;
        connection.query('UPDATE aluno SET ? WHERE matricula = ?', [campos, matricula], (error, results, fields) => {
          if (error) {
              reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function deletaAluno(matricula) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM Aluno WHERE Matricula=${matricula}`;
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function iraAlunoPeriodo(matricula, periodo) {
    return new Promise((resolve, reject)=> {
        connection.query(`SELECT Nota, Resultado, Aluno.Matricula, Periodo.Codigo, Disciplina.CargaHoraria FROM Nota INNER JOIN Turma ON Nota.CodigodaTurma = Turma.Codigo
        INNER JOIN Disciplina ON Turma.CodigodaDisciplina = Disciplina.Codigo INNER JOIN Periodo ON Turma.CodigodoPeriodo = Periodo.Codigo INNER JOIN Aluno ON Nota.MatriculadoAluno = Aluno.Matricula WHERE Aluno.Matricula='${matricula}' AND Periodo.Codigo = '${periodo}'`, (error, results) => {
            if (error) {
                reject(error);
              } else {
                console.log(results);
                const notas = results.map(r => r.Nota);
                const cargasHorarias = results.map(r => r.CargaHoraria);
                let soma = 0;
                const somaCargasHorarias = cargasHorarias.reduce((acumulador, curr) => acumulador + curr, 0);
                for (let i = 0; i < notas.length; i++) {
                    soma += (notas[i] * cargasHorarias[i]);
                }
                const media = +(soma / somaCargasHorarias).toFixed(1);
                
                resolve(media);
              }
          });
    })
    
}

function iraTotalAluno(matricula) {
    return new Promise((resolve, reject)=> {
        connection.query(`SELECT Nota, Resultado, Aluno.Matricula, Periodo.Codigo, Disciplina.CargaHoraria FROM Nota INNER JOIN Turma ON Nota.CodigodaTurma = Turma.Codigo
        INNER JOIN Disciplina ON Turma.CodigodaDisciplina = Disciplina.Codigo INNER JOIN Periodo ON Turma.CodigodoPeriodo = Periodo.Codigo INNER JOIN Aluno ON Nota.MatriculadoAluno = Aluno.Matricula WHERE Aluno.Matricula='${matricula}'`, (error, results) => {
            if (error) {
                reject(error);
              } else {
                const notas = results.map(r => r.Nota);
                const cargasHorarias = results.map(r => r.CargaHoraria);
                let soma = 0;
                const somaCargasHorarias = cargasHorarias.reduce((acumulador, curr) => acumulador + curr, 0);
                for (let i = 0; i < notas.length; i++) {
                    soma += (notas[i] * cargasHorarias[i]);
                }
                const media = +(soma / somaCargasHorarias).toFixed(1);
                
                const resultados = results.map(r => {
                    return {
                        turma: r.Codigo, 
                        resultado: r.Resultado
                    };
                });
                console.log(media, resultados);
                
                resolve({
                    media,
                    resultados,
                });
              }
          });
    })
}

module.exports = {
    criaAluno,
    buscaAlunos,
    buscaAluno,
    editaAluno,
    deletaAluno,
    iraTotalAluno,
    iraAlunoPeriodo
}