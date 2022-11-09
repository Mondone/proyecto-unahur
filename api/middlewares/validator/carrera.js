const { check, validationResult } = require('express-validator');

const validarInput = [
    check('nombre').exists().not().isEmpty(),
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