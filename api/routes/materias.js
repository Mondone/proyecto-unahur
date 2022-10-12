var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  let { page, see } = req.query; //obtengo valores que vienen en la ruta.
  if(page){
    models.materia
    .findAll(
      {
        attributes: ["id", "nombre", "id_carrera"],
        offset: parseInt(page),
        limit: parseInt(see),
        
      })
    .then(materias => res.send(materias))
    .catch(() => res.sendStatus(500));
  }else{
    models.materia
    .findAll({
      attributes: ["id", "nombre", "id_carrera"],
    })
    .then(materias => res.send(materias))
    .catch(() => res.sendStatus(500));
  }

});


router.post("/", (req, res) => {
  
  models.materia
    .create({ 
              nombre: req.body.nombre,
              id_carrera: req.body.id_carrera
           })
    .then(materia => res.status(201).send({ nombre: materia.nombre }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(materia => (materia ? onSuccess(materia) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findMateria(req.params.id, {
    onSuccess: materia => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .update({ nombre: req.body.nombre,
                id_carrera: req.body.id_carrera 
              }, 
              { fields: ["nombre", "id_carrera"] }
              )
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
    findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
