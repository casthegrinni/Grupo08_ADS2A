'use strict';
module.exports = (sequelize, DataTypes) => {
    let Status_maquina = sequelize.define('Status_maquina',{
        id_captura:{
            field: 'id_captura',
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
		},
        uso_processador: {
			field:'uso_processador',            
            type: DataTypes.INTEGER, 
        },	
        temperatura_cpu:{
            field:'temperatura_cpu',
            type: DataTypes.DOUBLE,          
        },
        uso_disco:{
            field:'uso_disco',
            type: DataTypes.INTEGER,
        },
        data_e_hora:{
            field:'data_e_hora',
            type: DataTypes.DATE,
            allowNull: false
        },
        fk_maquina: {
			field: 'fk_maquina',
			type: DataTypes.INTEGER,
			allowNull: false
		},
        uso_ram: {
            field: 'uso_ram',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status_web:{
            field: 'status_web',
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    
    {
            tableName: 'status_maquina', 
            freezeTableName: true, 
            underscored: true,
            timestamps: false,
        });
    
        return Status_maquina;
    };
