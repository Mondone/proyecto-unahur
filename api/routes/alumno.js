var express = require("express");
var router = express.Router();
var models = require("../models");


router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.alumno
    .findAll({
      attributes: ["id", "nombre"]
    })
    .then(alumnos => res.send(alumnos))
    .catch(() => res.sendStatus(500));
});

// Get materias que cursa un alumno
router.get("/alumnomateria/:id", (req, res, next) => {
  console.log("Esto es un mensaje para ver en consola");
  models.alumno
    .findAll({
      attributes: ["id", "nombre","apellido"],
      include: [{
          as: 'cursa',
          model:models.materia, attributes: ["id", "nombre"]}]
    })
    .then(materias => res.send(materias))
    .catch(error => { return next(error)})
});

router.post("/", (req, res) => {
  models.alumno
    .create({ 
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      mail: req.body.mail
    })
    .then(alumno => res.status(201).send({ id: alumno.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otro alumno con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ["id", "nombre", "alumno", "mail"],
      where: { id }
    })
    .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findAlumno(req.params.id, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .update({ nombre: req.body.nombre,
                  id: req.body.id 
              }, 
              { fields: ["nombre", "id"] }
              )
      .then(() => res.sendStatus(200))
      .catch(error => {
          if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra alumno con el mismo nombre')
          }
          else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
          }
      });
    findMateria(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
});

router.delete("/:id", (req, res) => {
    const onSuccess = alumno =>
      alumno
        .destroy()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
    findAlumno(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
});
  
module.exports = router;