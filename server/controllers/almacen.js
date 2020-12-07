import model from '../models';

const { Almacen } = model;
 async function verificarCodigo(codigo){
    try {
        const data = await Almacen.findOne({
            where:{codigo},
            attributes:['codigo']
        });
        if (data) return true;        
        return false;        
    } catch (error) {
        console.log(error);
        return 'No se puede mostrar los datos'
    }
}
class Almacens {
    static async createAlmacen(req,res){
        try {
            const { codigo,tamanio,descripcion } = req.body;
            const { id_tienda } = req.params; 
            if(await verificarCodigo(codigo)){
                res.status(400).json({
                    msg:"El codigo ya esta registrado"
                })
            } else{
                const reps = await Almacen.create({
                    codigo,tamanio,descripcion,id_tienda
                });
                res.status(200).json({
                    msg:"Se crearon los datos",
                    reps
                });
            }            
        }catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"No se pueden crear los datos"
            });
        }
    }
    static async list(req,res){
        try {
            const list = await Almacen.findAll();
            res.status(200).json({
                msg: "lista de lugares de la tienda",
                list
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"No se pueden mostrar los datos"
            })
        }
    }
}


export default Almacens;