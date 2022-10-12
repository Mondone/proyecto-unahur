'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    id_carrera: DataTypes.INTEGER
  }, {});
  materia.associate = function(models) {
    
    materia.belongsTo(models.carrera,{
      as: 'pertenece-a',
      foreignKey: 'id_carrera'
    })

    materia.hayMany(models.cursa,{
      as: 'cursa',
      foreignKey: 'id_materia'
    })
    
  };
  return materia;
};

