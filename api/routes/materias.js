var express = require("express");
var router = express.Router();
const materiaController = require("../controllers/materiaController");
const { validarInput } = require("../middlewares/validator/materia");

router.post("/", validarInput, materiaController.addMateria);
router.get("/", materiaController.getAllMaterias);
router.get("/:cod_materia", materiaController.findMateriaByCodigo);
router.put("/:cod_materia", materiaController.updateMateria);
router.delete("/:cod_materia", materiaController.deleteMateria); 

module.exports = router;
