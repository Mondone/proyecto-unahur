const { check, validationResult } = require('express-validator');

const validarInput = [
    check('dni').exists().isNumeric().isLength({min:8,max:8}), // al poner isLength ya no es necessario el no es vacio???
    check('nombre').exists().not().isEmpty(),
    check('apellido').exists().not().isEmpty(),
    check('mail').exists().isEmail(),
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