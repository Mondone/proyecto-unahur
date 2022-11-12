var express = require("express");
var router = express.Router();
const usuarioController = require("../controllers/usuarioController");
//const { validarInput } = require("../middlewares/validator/alumno");
const { autorizarAdmin } = require("../middlewares/jwt/jwt");

router.post("/", usuarioController.addUsuario);
router.post("/login", usuarioController.loginUsr);
router.put("/adminnotas", autorizarAdmin, usuarioController.actualizarNotas)
router.get("/", usuarioController.getAllUsuarios);
router.put("/:usuario", usuarioController.updateUsuario);
router.delete("/:usuario", usuarioController.deleteUsuario);

module.exports = router;