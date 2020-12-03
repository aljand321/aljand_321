import model from '../models';

const { Color } = model;

class ColorRopa{
    static async create(req,res){
        try {
            const { nombre } = req.body
            const resp = await  Color.create({
                nombre
            });
            res.status(200).json({
                msg:"se crearon los datos",
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
            const resp = await Color.findAll();
            res.status(200).json({
                msg:"Lista de colores",
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

export default ColorRopa