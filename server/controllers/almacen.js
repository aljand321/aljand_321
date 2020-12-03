import model from '../models';

const { Almacen } = model;

class Almacens {
    static async createAlmacen(req,res){
        try {
            const { codigo,tamanio,descripcion } = req.body;
            const { id_tienda } = req.params;
            
            const reps = await Almacen.create({
                codigo,tamanio,descripcion,id_tienda
            });

            res.status(200).json({
                msg:"Se crearon los datos",
                reps
            })

        }catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"No se pueden crear los datos"
            })
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