var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */
router.get('/ultimas/:idcaminhao', function(req, res, next) {
	
	// quantas são as últimas leituras que quer? 7 está bom?
	const limite_linhas = 7;

	var idcaminhao = req.params.idcaminhao;

	console.log(`Recuperando as ultimas ${limite_linhas} leituras`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		temperatura, 
		umidade, 
		momento,
		DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
		from leitura
		where fkcaminhao = ${idcaminhao}
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		temperatura, 
		umidade, 
		momento,
		FORMAT(momento,'HH:mm:ss') as momento_grafico
		from leitura
		where fkcaminhao = ${idcaminhao}
		order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/tempo-real/:idcaminhao', function(req, res, next) {
	console.log('Recuperando caminhões');
	
	//var idcaminhao = req.body.idcaminhao; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idcaminhao = req.params.idcaminhao;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select temperatura, umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, fkcaminhao from leitura where fkcaminhao = ${idcaminhao} order by id desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 1 temperatura, umidade, FORMAT(momento,'HH:mm:ss') as momento_grafico, fkcaminhao from leitura where fkcaminhao = ${idcaminhao} order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select 
							max(temperatura) as temp_maxima, 
							min(temperatura) as temp_minima, 
							avg(temperatura) as temp_media,
							max(umidade) as umidade_maxima, 
							min(umidade) as umidade_minima, 
							avg(umidade) as umidade_media 
						from leitura`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});
router.get('/machines/:fk_estacao', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

 const instrucaoSql= `select m.nome_maquina, m.id_maquina from maquina m where m.fk_estacao = ${req.params.fk_estacao}`					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});

router.get('/machines_total/:fk_estacao', function (req, res, next) {
	
	
	const instrucaoSql = `select count (id_maquina) as contagem from maquina where fk_estacao = ${req.params.fk_estacao}`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});
router.get('/stations_total/', function (req, res, next) {
	
	
	const instrucaoSql = `select count (id_estacao) as contagem from estacao`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});
router.get('/getRandom/:fk_estacao', function (req, res, next) {
	
	
	const instrucaoSql = `SELECT TOP 1 id_maquina FROM maquina where fk_estacao = ${req.params.fk_estacao}
	ORDER BY NEWID() `;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
	});
	router.get('/getStatusCounter/:fk_estacao/:type', function (req, res, next) {
	
	
		const instrucaoSql = `select COUNT(s.status_web) as count from status_maquina s right JOIN maquina m on id_maquina = fk_maquina WHERE m.fk_estacao = ${req.params.fk_estacao} AND s.status_web = '${req.params.type}'`
						
	
		sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
			.then(resultado => {
				res.json(resultado);
			}).catch(erro => {
				console.error(erro);
				res.status(500).send(erro.message);
			})
		});
		router.get('/getAllStations/', function (req, res, next) {
	
	
			const instrucaoSql = `with maquinas_criticas as (
				select stts.fk_maquina,
				count(stts.status_web) as contagem
				from [dbo].[status_maquina] as stts
				inner join [dbo].[maquina] as mqn on mqn.id_maquina = stts.fk_maquina and stts.status_web = 'Crí­tico'
				group by stts.fk_maquina 
			)
			SELECT 
				estacao.nome_estacao,
				COUNT(mqn.fk_estacao) as "qtdMaquina",
				sum( coalesce(maquinas_criticas.contagem, 0) ) as "contagem_maquinas_criticas"
				from estacao 
				left join maquina as mqn on estacao.id_estacao = mqn.fk_estacao
				left join maquinas_criticas on maquinas_criticas.fk_maquina = mqn.id_maquina
				group by estacao.nome_estacao;`;
							
		
			sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
				.then(resultado => {
					res.json(resultado);
				}).catch(erro => {
					console.error(erro);
					res.status(500).send(erro.message);
				})
			});
			router.get('/info_machines/:id_maquina', function (req, res, next) {
	
	
				const instrucaoSql = `select TOP 1 m.want_ram, m.want_disco,m.want_cpu, m.ram,m.tamanho_disco, m.nome_maquina,m.checada,
				sm.uso_processador,sm.uso_disco, sm.uso_ram,sm.status_web, 
				sp.estoque_papel 
				from [dbo].[maquina] m join [dbo].[status_maquina] sm on m.id_maquina = sm.fk_maquina join 
				[dbo].[status_papel] sp on m.id_maquina = sp.fk_maquina
				 where id_maquina = ${req.params.id_maquina};`
								
			
				sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
					.then(resultado => {
						res.json(resultado[0]);
					}).catch(erro => {
						console.error(erro);
						res.status(500).send(erro.message);
					})
				});


  

module.exports = router;
