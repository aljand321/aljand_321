import model from '../models';

const { Productos } = model;

class Producto{
    static async create(req,res){
        try {
            const { descripcion,cantidad } = req.body;
            const { id_marca, id_tipo, id_almacen } = req.params;
            const resp = await  Productos.create({
                descripcion,cantidad,id_marca, id_tipo, id_almacen
            });
            res.status(200).json({
                msg:"se creo prodcuto",
                resp
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"no se puede crear los datos"
            })
        }
    }
    static async list(req,res){
        try {
            const resp = await Productos.findAll();
            res.status(200).json({
                msg:"Lista de Productos o ropas",
                resp
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"no se puede mostrar los datos"
            })
        }
    }
}

export default Producto