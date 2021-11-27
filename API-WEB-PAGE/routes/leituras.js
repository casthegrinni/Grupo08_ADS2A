var express = require("express");
var router = express.Router();
var sequelize = require("../models").sequelize;
var Leitura = require("../models").Leitura;
var status_maquina = require("../models").status_maquina;
var status_papel = require("../models").status_papel;
var env = process.env.NODE_ENV || "development";


router.get('/machines/:fk_estacao', function (req, res, next) {

	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select m.checada, m.id_maquina from maquina m where m.fk_estacao = ${req.params.fk_estacao}`

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


	const instrucaoSql = `SELECT TOP 1 id_maquina, FROM maquina where fk_estacao = ${req.params.fk_estacao}
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



router.get('/getDadosMachine/:fk_maquina', function (req, res, next) {
	const limite_linhas = 7;
	var fkMaquina = req.params.fk_maquina;

	const instrucaoSql = `SELECT top ${limite_linhas} uso_ram, temperatura_cpu, uso_processador FROM [dbo].[status_maquina] where fk_maquina = ${fkMaquina} order by id_captura desc`;

	sequelize.query(instrucaoSql, {
		model: status_maquina,
		mapToModel: true
	})
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
});

router.get('/getHardwarePerHour/:fk_estacao', function (req, res, next) {
	var estacao = req.params.fk_estacao;

	const instrucaoSql = `
	SELECT TOP 1
    (SELECT 
		 Count(*) FROM [status_maquina] 
		 WHERE DATEPART(HOUR ,data_e_hora) > 0
		 AND DATEPART(HOUR ,data_e_hora) < 4  
		 AND status_web = 'Perigo' OR status_web = 'Critico') 
		 as zero_a_quatro,
	(SELECT 
		 Count(*) FROM [status_maquina] 
		 WHERE DATEPART(HOUR ,data_e_hora) > 4
		 AND DATEPART(HOUR ,data_e_hora) < 8  
		 AND status_web = 'Perigo' OR status_web = 'Critico') 
		 as quatro_a_oito,
	(SELECT 
		 Count(*)  FROM [status_maquina] 
		 WHERE DATEPART(HOUR ,data_e_hora) < 8
		 AND DATEPART(HOUR ,data_e_hora) < 12  
		 AND status_web = 'Perigo' OR status_web = 'Critico') 
		 as oito_a_doze,
	(SELECT 
		 Count(*) FROM [status_maquina] 
		 WHERE DATEPART(HOUR ,data_e_hora) < 12
		 AND DATEPART(HOUR ,data_e_hora) < 16  
		 AND status_web = 'Perigo' OR status_web = 'Critico') 
		 as doze_a_dezesseis,
	(SELECT 
		 Count(*) FROM [status_maquina] 
		 WHERE DATEPART(HOUR ,data_e_hora) < 16
		 AND DATEPART(HOUR ,data_e_hora) < 20  
		 AND status_web = 'Perigo' OR status_web = 'Critico') 
		 as dezesseis_a_vinte,
	(SELECT 
		 Count(*) FROM [status_maquina]  
		 WHERE DATEPART(HOUR ,data_e_hora) < 20 
		 AND DATEPART(HOUR ,data_e_hora) < 24  
		 AND status_web = 'Perigo' OR status_web = 'Critico') 
		 as vinte_a_vintequatro  
FROM    [status_maquina]
WHERE    data_e_hora >= DATEADD(day, -7, GETDATE()) `;

	sequelize.query(instrucaoSql, {
		model: status_maquina,
		mapToModel: true
	})
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
});

router.get('/getPaperPerHour/:fk_estacao', function (req, res, next) {
	var estacao = req.params.fk_estacao;

	const instrucaoSql = `
	SELECT TOP 1
	(SELECT 
		 Count(*) FROM [status_papel] 
		 WHERE DATEPART(HOUR ,data_e_hora) > 0
		 AND DATEPART(HOUR ,data_e_hora) < 4  
		 AND estoque_papel = 0) 
		 as zero_a_quatro,
	(SELECT 
		 Count(*) FROM [status_papel] 
		 WHERE DATEPART(HOUR ,data_e_hora) > 4
		 AND DATEPART(HOUR ,data_e_hora) < 8  
		 AND estoque_papel = 0) 
		 as quatro_a_oito,
	(SELECT 
		 Count(*)  FROM [status_papel] 
		 WHERE DATEPART(HOUR ,data_e_hora) < 8
		 AND DATEPART(HOUR ,data_e_hora) < 12  
		 AND estoque_papel = 0) 
		 as oito_a_doze,
	(SELECT 
		 Count(*) FROM [status_papel] 
		 WHERE DATEPART(HOUR ,data_e_hora) < 12
		 AND DATEPART(HOUR ,data_e_hora) < 16  
		 AND estoque_papel = 0) 
		 as doze_a_dezesseis,
	(SELECT 
		 Count(*) FROM [status_papel] 
		 WHERE DATEPART(HOUR ,data_e_hora) < 16
		 AND DATEPART(HOUR ,data_e_hora) < 20  
		 AND estoque_papel = 0) 
		 as dezesseis_a_vinte,
	(SELECT 
		 Count(*) FROM [status_papel]  
		 WHERE DATEPART(HOUR ,data_e_hora) < 20 
		 AND DATEPART(HOUR ,data_e_hora) < 24  
		 AND estoque_papel = 0) 
		 as vinte_a_vintequatro  
FROM    [status_papel]
WHERE    data_e_hora >= DATEADD(day, -7, GETDATE()) 
			
`;

	sequelize.query(instrucaoSql, {
		model: status_papel,
		mapToModel: true
	})
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
});

router.get("/getPaperMachine/:fk_estacao", function (req, res, next) {
	var estacao = req.params.fk_estacao;
	const instrucaoSql = `
  SELECT TOP 1
  (SELECT 
	   Count(estoque_papel) FROM [dbo].[status_papel] 
	   WHERE fk_maquina = ${fk_estacao} AND DATEPART(HOUR ,data_e_hora) > 0
	   AND DATEPART(HOUR ,data_e_hora) < 4) as zero_a_quatro,
  (SELECT 
	   Count(estoque_papel) FROM [status_papel] 
	   WHERE fk_maquina = ${fk_estacao} AND DATEPART(HOUR ,data_e_hora) > 4
	   AND DATEPART(HOUR ,data_e_hora) < 8) as quatro_a_oito,
  (SELECT 
	   Count(estoque_papel)  FROM [status_papel] 
	   WHERE fk_maquina = ${fk_estacao} AND DATEPART(HOUR ,data_e_hora) < 8
	   AND DATEPART(HOUR ,data_e_hora) < 12) as oito_a_doze,
  (SELECT 
	   Count(estoque_papel) FROM [status_papel] 
	   WHERE fk_maquina = ${fk_estacao} AND DATEPART(HOUR ,data_e_hora) < 12
	   AND DATEPART(HOUR ,data_e_hora) < 16) as doze_a_dezesseis,
  (SELECT 
	   Count(estoque_papel) FROM [status_papel] 
	   WHERE fk_maquina = ${fk_estacao} AND DATEPART(HOUR ,data_e_hora) < 16
	   AND DATEPART(HOUR ,data_e_hora) < 20) as dezesseis_a_vinte,
  (SELECT 
	   Count(estoque_papel) FROM [status_papel] 
	   WHERE fk_maquina = ${fk_estacao} AND DATEPART(HOUR ,data_e_hora) < 20
	   AND DATEPART(HOUR ,data_e_hora) < 24) as vinte_a_vintequatro
FROM    [status_papel]
WHERE   fk_maquina = ${fk_estacao} AND data_e_hora >= DATEADD(day, -7, GETDATE());
`;

  sequelize
    .query(instrucaoSql, {
      model: status_papel,
      mapToModel: true,
    })
    .then((resultado) => {
      res.json(resultado[0]);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});
module.exports = router;
