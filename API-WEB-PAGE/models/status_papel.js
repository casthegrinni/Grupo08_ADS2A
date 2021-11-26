'use strict';
module.exports = (sequelize, DataTypes) => {
    let status_papel = sequelize.define('status_papel',{
        id_captura:{
            field: 'id_captura',
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
		},
        estoque_papel: {
			field:'estoque_papel',            
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
    },
    
    {
            tableName: 'status_papel', 
            freezeTableName: true, 
            underscored: true,
            timestamps: false,
        });
    
        return status_papel;
    };
