var express = require("express");
var router = express.Router();
const materiaController = require("../controllers/materiaController");
const { validarInput } = require("../middlewares/validator/materia");

router.post("/", validarInput, materiaController.addMateria);
router.get("/", materiaController.getAllMaterias);
router.get("/:id", materiaController.findMateriaById);
router.put("/:id", materiaController.updateMateria);
router.delete("/:cod_materia", materiaController.deleteMateria); // id o cod_materia para el borrado???

module.exports = router;
