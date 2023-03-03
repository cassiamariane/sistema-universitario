USE sistema_universitario;

INSERT INTO Aluno (Nome, Matricula, DatadeNascimento, Email) VALUES
('Ana Silva', '20230001', '1999-03-10', 'ana.silva@example.com'),
('João Santos', '20230002', '2000-07-22', 'joao.santos@example.com'),
('Maria Souza', '20230003', '1998-01-05', 'maria.souza@example.com'),
('Pedro Costa', '20230004', '1999-11-15', 'pedro.costa@example.com'),
('Camila Oliveira', '20230005', '2001-05-31', 'camila.oliveira@example.com');

INSERT INTO Disciplina (Codigo, Departamento, Nome, CargaHoraria) VALUES
(1001, 'Ciência da Computação', 'Introdução à Programação', 60),
(1002, 'Engenharia Civil', 'Mecânica dos Solos', 90);

INSERT INTO Periodo (Codigo, DataInicio, DataFinal) VALUES
(3001, '2023-02-01', '2023-06-30'),
(3002, '2023-08-01', '2023-12-15');

INSERT INTO Turma (Codigo, Professor, CodigodaDisciplina, CodigodoPeriodo, Sala, Horario) VALUES
(2001, 'Joana Oliveira', 1001, 3001, 'Sala 101', 'Seg 10:00 - 12:00'),
(2002, 'José Silva', 1001, 3001, 'Sala 202', 'Qua 14:00 - 17:00'),
(2003, 'Mariana Santos', 1002, 3002, 'Sala 305', 'Ter 08:00 - 11:00'),
(2004, 'Pedro Almeida', 1002, 3002, 'Sala 404', 'Sex 13:00 - 15:00');

INSERT INTO Nota (MatriculadoAluno, CodigodaTurma, Nota, Resultado) VALUES
('20230001', 2001, 8.5, 'AP'),
('20230001', 2004, 7.0, 'AP'),
('20230002', 2002, 4.0, 'RM'),
('20230002', 2003, 9.0, 'AP'),
('20230003', 2004, 6.0, 'RF'),
('20230004', 2002, 8.3, 'AP'),
('20230005', 2001, 10.0, 'AP');