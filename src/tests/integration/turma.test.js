const request = require('supertest');
const app = require('../../../app');

it('Deve retornar o status 200 para tentativa de inserção', async ()=> {
    return request(app)

    .post('/turmas')
    .send({
            codigo: '01',
            professor:'Kinder',
            codigodadisciplina:'1002',
            codigodoperiodo:'3002',
            sala:'Sala 101',
            horario:'Seg 10:00 - 12:00'})

    .then(response => {
        expect(response.status).toEqual(200)
    })
});

it('Deve retornar o status 200 para listagem de turmas', async () => {
    return request(app)

    .get('/turmas')
    .expect('Content-Type', /json/)
    .expect(200)
})

it('Deve retornar o status 200 para busca de uma turma', async () => {
    return request(app)

    .get('/turmas/2001')
    .expect('Content-Type', /json/)
    .expect(200)
})

it('Deve retornar o status 200 para tentativa de update', async ()=> {
    return request(app)

    .put('/turmas/01')
    .send({sala:'Sala 103',
        horario:'Seg 13:00 - 15:00'})
    .then(response => {
            expect(response.status).toEqual(200)
    })
});

it('Deve retornar o status 200 para deleção', async ()=> {
    return request(app)

    .delete('/turmas/01')

    .then(response => {
        expect(response.status).toEqual(200)
    })
});
