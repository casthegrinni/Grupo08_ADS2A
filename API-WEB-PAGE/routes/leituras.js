var express = require("express");
var router = express.Router();
var sequelize = require("../models").sequelize;
var Leitura = require("../models").Leitura;
var status_maquina = require("../models").status_maquina;
var status_papel = require("../models").status_papel;
var env = process.env.NODE_ENV || "development";


router.get('/machines/:fk_estacao', function (req, res, next) {


	const instrucaoSql = req.params.fk_estacao== 0? ` select m.checada, m.id_maquina from maquina m` : `select m.checada, m.id_maquina from maquina m where m.fk_estacao = ${req.params.fk_estacao}`

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});

router.get('/getStation/:fk_estacao', function (req, res, next) {
	let estacao = req.params.fk_estacao

	const instrucaoSql = `SELECT nome_estacao FROM estacao WHERE id_estacao = ${estacao}`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});
router.get('/getMachineName/:fk_maquina', function (req, res, next) {
	let estacao = req.params.fk_maquina

	const instrucaoSql = `SELECT nome_maquina FROM maquina WHERE id_maquina = ${estacao}`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});
router.get('/machines_total/:fk_estacao/:tipo_usuario', function (req, res, next) {
	let estacao = req.params.fk_estacao
	let tipo = req.params.tipo_usuario

	let instrucaoSql = ``
	if (tipo == 1) {
		 instrucaoSql = `select count(*) as contagem from maquina`;
	} else {
		instrucaoSql = `select count(*) as contagem from maquina where fk_estacao = ${estacao}`;
	}

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
	const instrucaoSql = `
	SELECT COUNT(DISTINCT fk_maquina) as count from status_maquina s 
	RIGHT JOIN maquina m on id_maquina = fk_maquina 
	WHERE m.fk_estacao = ${req.params.fk_estacao} AND s.status_web = '${req.params.type}'
`

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
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
		MAX(estacao.id_estacao) AS "id_estacao",
		COUNT(mqn.fk_estacao) as "qtdMaquina",
		sum( coalesce(maquinas_criticas.contagem, 0) ) as "contagem_maquinas_criticas"
		from estacao 
		left join maquina as mqn on estacao.id_estacao = mqn.fk_estacao
		left join maquinas_criticas on maquinas_criticas.fk_maquina = mqn.id_maquina
		group by estacao.nome_estacao`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		})
});
router.get('/info_machines/:id_maquina', function (req, res, next) {


	const instrucaoSql = `select TOP 1 m.want_ram, m.want_disco,m.want_cpu, m.ram,m.tamanho_disco, m.nome_maquina,m.checada,m.id_maquina,
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

router.get("/getPaperMachine/:id_maquina", function (req, res, next) {
	var maquina = req.params.id_maquina;
	const instrucaoSql = `
	SELECT TOP 7 estoque_papel,
	FORMAT(data_e_hora,'HH:mm:ss') as captura
	FROM [dbo].[status_papel] where fk_maquina = ${maquina} ORDER BY id_captura desc`;
  sequelize
    .query(instrucaoSql, {
      model: status_papel,
      mapToModel: true,
    })
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

router.get("/getRamMachine/:id_maquina", function (req, res, next) {
	var maquina = req.params.id_maquina;
	const instrucaoSql = `
	SELECT TOP 7 ((uso_ram * 100)/ ram ) as porcentagem_ram,
	FORMAT(data_e_hora,'HH:mm:ss') as captura
	FROM [dbo].[maquina] m join [dbo].[status_maquina] sm ON m.id_maquina = sm.fk_maquina
	 WHERE id_maquina =  ${maquina}  order by id_captura desc;
	 `;

  sequelize
    .query(instrucaoSql, {
      model: status_maquina,
      mapToModel: true,
    })
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

router.get("/getCpuMachine/:id_maquina", function (req, res, next) {
	var maquina = req.params.id_maquina;
	const instrucaoSql = `
	SELECT TOP 7 (uso_processador) as porcentagem_processador,
	FORMAT(data_e_hora,'HH:mm:ss') as captura
	FROM [dbo].[maquina] m join [dbo].[status_maquina] sm ON m.id_maquina = sm.fk_maquina
	 WHERE id_maquina = ${maquina} order by id_captura desc;
	 ` ;

  sequelize
    .query(instrucaoSql, {
      model: status_maquina,
      mapToModel: true,
    })
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

router.get("/getDiskMachine/:id_maquina", function (req, res, next) {
	var maquina = req.params.id_maquina;
	const instrucaoSql = `
	SELECT TOP 7 ((sm.uso_disco * 100)/ m.tamanho_disco ) as porcentagem_memoria,
	FORMAT(data_e_hora,'HH:mm:ss') as captura
	FROM [dbo].[maquina] m join [dbo].[status_maquina] sm ON m.id_maquina = sm.fk_maquina
	WHERE id_maquina =  ${maquina}  order by id_captura desc;
	`;

  sequelize
    .query(instrucaoSql, {
      model: status_maquina,
      mapToModel: true,
    })
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

module.exports = router;
