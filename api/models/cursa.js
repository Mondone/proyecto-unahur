'use strict';

// const { ForeignKeyConstraintError } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const cursa = sequelize.define('cursa', {
    nota1: DataTypes.INTEGER,
    nota2: DataTypes.INTEGER,
    id_alumno: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});
  cursa.associate = function(models){
    
    cursa.belongsTo(models.materia,{
      as: 'materia-cursa',
      foreignKey: 'id_materia' //id_materia
    })
/*
    cursa.belongsTo(models.alumno,{
      as: 'alumno-cursa',
      foreignKey: 'id_alumno'
    })

    
    cursa.hasMany(models.alumno,{
      as: 'cursa-en',
      foreignKey: 'id_alumno' //id_alumno
    })
*/
  }
  return cursa;
};