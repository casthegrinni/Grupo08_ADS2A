CREATE DATABASE bd_pulsatrix;

use bd_pulsatrix;

CREATE TABLE tb_estacao (
	id_estacao int primary key not null auto_increment,
	nome_estacao varchar(50),
	cep char(9),
	cidade varchar(70),
	bairro varchar(70),
	logradouro varchar(80)
);

CREATE TABLE tb_administrador (
	id_administrador int primary key not null auto_increment,
	nome varchar(100),
	celular varchar(15),
	email varchar(50),
	senha varchar(50),
	fk_estacao int not null, 
	foreign key (fk_estacao) references tb_estacao (id_estacao)
);

CREATE TABLE tb_maquina (
	id_maquina int primary key not null auto_increment,
	meio_pagamento tinyint,
	fk_estacao int not null,
	foreign key (fk_estacao) references tb_estacao (id_estacao)
);

CREATE TABLE tb_status (
	id_status int primary key not null auto_increment,
	uso_processador double,
	nome_disco varchar(45),
	uso_memoria double,
	temperatura_cpu double,
	data_hora datetime,
	fk_maquina int not null,
	foreign key (fk_maquina) references tb_maquina (id_maquina)
);

CREATE TABLE tb_status_papel (
	id_status_papel int primary key not null auto_increment,
	estoque_papel tinyint(1),
	fk_maquina int not null,
	foreign key (fk_maquina) references tb_maquina (id_maquina)
);
