'use strict';

const { ForeignKeyConstraintError } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const cursa = sequelize.define('cursa', {
    nota1: DataTypes.INTEGER,
    nota2: DataTypes.INTEGER,
    id_alumno: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});
  
  cursa.associate = function(models) {
    
    cursa.belongsTo(models.alumno,{
      as: 'cursa en',
      foreignKey: 'id_alumno'
    })

    cursa.belongsTo(models.materia,{
      as: 'cursa en',
      foreignKey: 'id_materia'
    })

  };
  return cursa;
};