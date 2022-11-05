var express = require("express");
var router = express.Router();
var models = require("../models");
const carreraController = require("../controllers/carreraController");

router.post("/", carreraController.addCarrera);
router.get("/", carreraController.getAllCarreras);
router.get("/materiascarrera/:id", carreraController.materiasPorCarrera);
router.put("/:id", carreraController.updateCarrera);
router.delete("/:id", carreraController.deleteCarrera);
/*
router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.carrera
    .findAll({
      attributes: ["id", "nombre"]
    })
    .then(carreras => res.send(carreras))
    .catch(() => res.sendStatus(500));
});*/

//obtener carrera+materias
/*
router.get("/", (req, res,next) => {

  models.materia.findAll({attributes: ["id","nombre","id_carrera"],
      
      /////////se agrega la asociacion 
      include:[{as:'Carrera-Relacionada', model:models.carrera, attributes: ["id","nombre"]}]
      ////////////////////////////////

    }).then(materias => res.send(materias)).catch(error => { return next(error)});
});*/
/*
router.get("/carreramaterias/:id", (req, res, next) => {
  console.log("Esto es un mensaje para ver en consola");
  models.carrera
    .findAll({
      attributes: ["id", "nombre"],
      include: [{
          as: 'tiene',
          model:models.materia, attributes: ["id", "nombre"]}]
    })
    .then(materias => res.send(materias))
    .catch(error => { return next(error)})
});*/
/*
router.post("/", (req, res) => {
  models.carrera
    .create({ nombre: req.body.nombre })
    .then(carrera => res.status(201).send({ id: carrera.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});*/
/*
const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
  models.carrera
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(carrera => (carrera ? onSuccess(carrera) : onNotFound()))
    .catch(() => onError());
};*/

router.get("/:id", (req, res) => {
  findCarrera(req.params.id, {
    onSuccess: carrera => res.send(carrera),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});
/*
router.put("/:id", (req, res) => {
  const onSuccess = carrera =>
    carrera
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});*/
/*
router.delete("/:id", (req, res) => {
  const onSuccess = carrera =>
    carrera
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});*/

module.exports = router;
