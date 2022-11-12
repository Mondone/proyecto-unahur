const jwt = require("jsonwebtoken");
const key = require("./keys");

const autorizarAdmin = (req,res,next) => {
    const tokenHeader = req.headers["authorization"];

    if(!tokenHeader){
        res.status(400).json({message: "No hay token: No Autorizado"})
    }else{
        const token = tokenHeader.split(" ")[1];
      
        try {
            const data = jwt.verify(token, key.ACCESS_TOKEN_SECRET);
            console.log(data)
            if(data.rol !== "Admin"){
                res.status(400).json({message: "No autorizado: Debe ser Administrador para esta operación"});
            }else{
                next()
            }
        } catch (error) {
            res.status(500).json({error})
        }
    }
}

const obtenerToken = async(data) => {

    const token = jwt.sign({
        usuario: data.usuario,
        rol: data.rol
    },
    key.ACCESS_TOKEN_SECRET,{expiresIn: '1d'}
    );
    return token;
}

module.exports = {
    autorizarAdmin,
    obtenerToken
}