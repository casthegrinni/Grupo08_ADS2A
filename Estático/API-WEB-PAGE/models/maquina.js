'use strict';
module.exports = (sequelize, DataTypes) => {
    let Maquina = sequelize.define('Maquina',{
        id_maquina:{
            field: 'id_maquina',
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
		},
        ram: {
			field:'ram',
            type: DataTypes.INTEGER,
            
        },	
        tamanho_disco:{
            field:'tamanho_disco',
            type: DataTypes.INTEGER,
            

        },
        checada:{
            field:'checada',
            type: DataTypes.INTEGER,
            

        },
        want_ram:{
            field:'want_ram',
            type: DataTypes.INTEGER,
            allowNull: false

        },
        want_disco:{
            field:'want_disco',
            type: DataTypes.INTEGER,
            allowNull: false

        },
        want_cpu:{
            field:'want_cpu',
            type: DataTypes.INTEGER,
            allowNull: false

        },
        fk_estacao: {
			field: 'fk_estacao',
			type: DataTypes.INTEGER,
			allowNull: false
		},
        nome_maquina: {
            field: 'nome_maquina',
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    
        {
            tableName: 'maquina', 
            freezeTableName: true, 
            underscored: true,
            timestamps: false,
        });
    
        return Maquina;
    };

        
        

        