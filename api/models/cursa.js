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
      as: 'cursando',
      foreignKey: 'id_materia'
    })
    cursa.hasMany(models.alumno,{
      as: 'cursa-en',
      foreignKey: 'id_alumno'
    })

  }
  return cursa;
};