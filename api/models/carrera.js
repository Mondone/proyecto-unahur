'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  //asociacion una carrera tiene muchas materias
  carrera.associate = function(models){
    carrera.hasMany(models.materia,{
      as: 'tiene',
      foreignKey: 'id_carrera'
    })
  }
  return carrera;
};