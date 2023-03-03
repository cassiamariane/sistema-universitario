const alunoModel = require("../../models/alunoModel")

test("Recebendo a matrícula, deve retornar a média e o resultado respectivo em um objeto JSON", async () => {
    const objetoRes = {"media": 7.6, "resultados": [{"resultado": "AP", "turma": 3001}, {"resultado": "AP", "turma": 3002}]};

    expect(await alunoModel.iraTotalAluno('20230001')).toMatchObject(objetoRes)
})