import model from '../models';

const { Tipo } = model;

class TipoRopa{
    static async create(req,res){
        try {
            const { nombre } = req.body
            const resp = await  Tipo.create({
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
            const resp = await Tipo.findAll();
            res.status(200).json({
                msg:"Lista de tipo de productos",
                resp
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"no se puede crear los datos"
            })
        }
    }
}

export default TipoRopa