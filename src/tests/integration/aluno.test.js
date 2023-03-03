const request = require('supertest');
const app = require('../../../app');

it('Deve retornar o status 200 para tentativa de inserção', async ()=> {
    return request(app)

    .post('/alunos')
    .send({
        nome: 'Rafael',
        matricula:'20230010',
        data_nasc:'2001-01-01',
        email:'rafael@gmail.com',
        data_matricula:'2023-02-28'
    })
    .then(response => {
        expect(response.status).toEqual(200)
    })
});

it('Deve retornar o status 200 para listagem de alunos', async () => {
    return request(app)

    .get('/alunos').then(response => {
        expect(response.status).toEqual(200)
})
})

it('Deve retornar o status 200 para busca de um aluno', async () => {
    return request(app)

    .get('/alunos/20230001').then(response => {
            expect(response.body[0].Nome).toEqual('Ana Silva');
            expect(response.body[0].Matricula).toEqual('20230001');
            expect(response.body[0].DatadeNascimento).toEqual('1999-03-10T03:00:00.000Z');
    })
})

it('Deve retornar o status 404 para aluno não encontrado', async () => {
    return request(app)

    .get('/alunos/2023000').then(response => {
        expect(response.body).toHaveLength(0)
    })
})

it('Deve retornar o status 200 para edição de um aluno', async ()=> {
    return request(app)

    .put('/alunos/20230010')
    .send({email:'novoemaildoaluno@gmail.com'})

    .expect(200)
});

it('Deve retornar o status 404 para edição de um aluno não encontrado', async ()=> {
    return request(app)

    .put('/alunos/12')
    .send({email:'novoemaildoaluno@gmail.com'})

    .expect(404)
});

it('Deve retornar o status 200 para deleção de um aluno', async ()=> {
    return request(app)

    .delete('/alunos/20230010')
    .then(response => {
        expect(response.status).toEqual(200)
    })
});

it('Deve retornar o status 404 para deleção de um aluno não encontrado', async ()=> {
    return request(app)

    .delete('/alunos/0')

    .expect(404)
});

it('Deve retornar o status 200 para ira do aluno', async ()=> {
    return request(app)

    .get('/alunos/20230001/ira').then(response => {
        expect(response.status).toEqual(200)
    })
});

it('Deve retornar o status 404 para ira do aluno não encontrado', async ()=> {
    return request(app)

    .get('/alunos/3/ira').then(response => {
        expect(response.body.resultado.media).toEqual(null)
    })
});

it('Deve retornar o status 200 para ira do aluno pelo periodo', async ()=> {
    return request(app)

    .get('/alunos/20230001/3001/ira').then(response => {
        expect(response.status).toEqual(200)
    })
});

it('Deve retornar o status 404 para ira do aluno pelo periodo não encontrado', async ()=> {
    return request(app)

    .get('/alunos/5/5/ira').then(response => {
        expect(response.body.resultado).toEqual(null)
    })
});