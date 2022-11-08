'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    cod_materia: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});
  materia.associate = function(models) {
    // associations can be defined here
    materia.belongsTo(models.carrera,{
      as: 'pertenece-a-car',
      foreignKey: 'id_carrera'
    })
    /*materia.hasMany(models.cursa,{
      as: 'tiene-curs',
      foreignKey: 'cod_materia'
    })*/
  };
  return materia;
};