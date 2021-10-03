CREATE TABLE estacao (
    id_estacao INT IDENTITY(1, 1) PRIMARY KEY,
    nome_estacao VARCHAR(50),
    CEP CHAR(8),
    cidade VARCHAR(50),
    bairro VARCHAR(50),
    logradouro VARCHAR(80)
);

CREATE TABLE usuario(
    id_usuario INT IDENTITY(1000, 1),
    nome VARCHAR(100),
    celular CHAR(11),
    email VARCHAR(50),
    senha VARCHAR(50),
    fk_estacao INT,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (fk_estacao) references estacao(id_estacao)
);

CREATE TABLE maquina (
    id_maquina INT IDENTITY(7000, 1) PRIMARY KEY,
    fk_estacao INT,
    FOREIGN KEY(fk_estacao) REFERENCES estacao(id_estacao)
);

CREATE TABLE status_maquina(
    id_captura INT IDENTITY(1,1) PRIMARY KEY,
    uso_processador DECIMAL,
    temperatura_cpu DECIMAL,
    nome_disco VARCHAR(10),
    uso_disco DECIMAL,
    data_e_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_maquina INT,
    FOREIGN KEY(fk_maquina) REFERENCES maquina(id_maquina)
);

CREATE TABLE status_papel(
    id_captura INT IDENTITY(1,1) PRIMARY KEY,
    estoque_papel INT,
    fk_maquina INT,
    FOREIGN KEY(fk_maquina) REFERENCES maquina(id_maquina)
)

ALTER TABLE estacao
ADD numero VARCHAR(8);

ALTER TABLE usuario
ADD tipo_usuario INT;

SELECT * FROM estacao;
SELECT * FROM usuario;
SELECT * FROM maquina;
SELECT * FROM status_maquina;

INSERT INTO estacao (nome_estacao, CEP, cidade, bairro, logradouro, numero) VALUES
       ('Consolação','01301100','São Paulo','Consolação','Rua da consolação', '2406');

INSERT INTO usuario (nome, celular, email, senha, fk_estacao, tipo_usuario) VALUES
        ('Thayná Martins', '11948274590', 'thayna.martins@metrosp.com.br', 'yonlu', 1 , 1),
        ('Ian Curtis', '11920933928', 'ian.curtis@metrosp.com.br', 'joy123', 1, 2);

INSERT INTO maquina(fk_estacao) VALUES
        (1),
        (1);

INSERT INTO status_papel (estoque_papel, fk_maquina) VALUES(0, 7000);

SELECT * FROM status_papel;
