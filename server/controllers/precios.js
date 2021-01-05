import model from '../models';
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const { precios } = model;

class Precios {
    static async create(req,res){
        const { precio_entrada, precio_salida } = req.body;
        const validation = await validar(precio_entrada, precio_salida);
        if(validation.success == false) return res.status(400).json({msg:validation.msg})
        try {
            const data = await precios.create({
                precio_entrada, precio_salida
            });
            return res.status(200).json({
                msg:"Se crearon los datos",
                data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg:"No se puede crear los datos"
            })            
        }
    }
    static async list(req,res){
        try {
            const data = await precios.findAll();
            res.status(200).json({
                msg:"Lista de precios",
                data
            })            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"No se puede mostrar nada"
            })
            
        }
    }
    
}

export default Precios

async function validar(precio_entrada,precio_salida){
    try {
        const data = await precios.findOne({
            where: {
                [op.and]: [{precio_entrada}, {precio_salida}]
            }
        });
        //console.log(data, " esto es lo que queiro ver ")

        if(data){
            return { msg:"Ya esta registrado esos precios", success:false }
        }else{
            return { msg:"No hay ese precios continuar", success:true }
        }
    } catch (error) {
        console.log(error);
        return { msg:"No se puede sacar los datos de precios", success:false }
    }
}