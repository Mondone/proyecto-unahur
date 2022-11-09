const { check, validationResult } = require('express-validator');

const validarInput = [
    check('cod_materia').exists().isNumeric().not().isEmpty(),
    check('nombre').exists().not().isEmpty(),
    check('id_carrera').exists().isNumeric().not().isEmpty(),
    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){
            res.status(403).json({errors: err})
        }
    }
]

module.exports = { validarInput }