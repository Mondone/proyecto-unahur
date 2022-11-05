const { check, validationResult } = require('express-validator');

const validarInput = [
    check('dni').exists().not().isEmpty().custom((value, {req}) => {
        throw new Error("Verificar DNI")
    }),
    check('nombre').exists().not().isEmpty().custom((value, {req}) => {
        throw new Error("Verificar Nombre")
    }),
    check('apellido').exists().not().isEmpty().custom((value, {req}) => {
        throw new Error("Verificar Apellido")
    }),
    check('mail').exists().isEmail().custom((value, {req}) => {
        throw new Error("Verificar Mail")
    }),
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