import model from '../models';

const { Vendedor } = model;

var jwt = require('jsonwebtoken');
const config = require('../../dataConfig');

module.exports = async function (req, res, next){
    var ruta = req.path
    var method = req.method
    const permisos = await noToken(ruta,method); 
    console.log(permisos," dddddddddddddddddddddfff") 
    //console.log(ruta, method, "esto es lo que quiero ver ttttttttttttttt")
    if (req.headers.tienda_token){
        var token = req.headers.tienda_token.split(' ')[1];
        const tokenVerify  = await verifyToken(token);
        
        if (tokenVerify.success == false) return res.status(403).json(tokenVerify);
        
        //console.log("si esta el token", tokenVerify, " esto es zzzzzssadasd")
        next();
    }else{    
          
        if (permisos.success == false) return res.status(400).json(permisos);
        
        next();
        
    }
}

function noToken(ruta, method){
        const rutaC = ruta.split("/")[1]
        console.log(rutaC,method, " esto es lo que quiero ver")
        var msg = [
            { success:false, msg:"No tienes permiso" },
            { success:true, msg:"Tiene permiso" },
            { success:false, msg:"Rest tipe OPTIONS no se puede procesar" }

        ]
        if (method == "OPTIONS") return msg[0]
        if (rutaC == 'login') {
            if (method == 'GET') return msg[0];
            if (method == 'POST') return msg[1];
        }else if(rutaC == 'vendedor'){
            if (method == 'GET') return msg[0];
            if(method == 'POST') return msg[1];
        }else{
            return msg[0];
        }
    
    
}

async function verifyToken(token){
    
    try {
        const verify = await jwt.verify(token, config.secret);
        return { success:true, msg:"Token valido", verify }
    } catch (error) {
        console.log("token expirado o no valido");
        return { success:false, msg:"El token expiro o no permitido" }
    }
}