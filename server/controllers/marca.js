import model from '../models';

const { Marca } = model;

class MarcaRopa{
    static async create(req,res){
        try {
            const { nombre } = req.body
            const resp = await  Marca.create({
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
            const resp = await Marca.findAll();
            res.status(200).json({
                msg:"Lista de marcas",
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

export default MarcaRopa