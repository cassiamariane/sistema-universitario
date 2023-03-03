CREATE DATABASE sistema_universitario;
USE sistema_universitario;
CREATE TABLE Aluno (
    Nome VARCHAR(255) not null,
    Matricula VARCHAR(11) not null,
    DatadeNascimento date not null,
    Email VARCHAR(100),
    DatadeMatricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (Matricula)
);

CREATE TABLE Disciplina (
	Codigo int not null,
    Departamento varchar(255),
    Nome VARCHAR(255) not null,
    CargaHoraria float not null,
    primary key (Codigo)
);

CREATE TABLE Periodo (
    Codigo int not null,
    DataInicio date not null,
    DataFinal date not null,
    primary key (Codigo)
);

CREATE TABLE Turma (
    Codigo int not null,
    Professor VARCHAR(255) not null,
    CodigodaDisciplina int not null,
    CodigodoPeriodo int not null,
    Sala VARCHAR(255) not null,
    Horario VARCHAR(255) not null,
    primary key (Codigo),
    foreign key (CodigodaDisciplina) references Disciplina(Codigo),
    foreign key (CodigodoPeriodo) references Periodo(Codigo)
);

CREATE TABLE Nota (
    MatriculadoAluno VARCHAR(11) not null,
    CodigodaTurma int not null,
    Nota float not null,
    Resultado enum("AP", "RM", "RF") not null,
    primary key (MatriculadoAluno, CodigodaTurma),
    foreign key (MatriculadoAluno) references Aluno(Matricula),
    foreign key (CodigodaTurma) references Turma(Codigo)
);