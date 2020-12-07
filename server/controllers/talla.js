import model from '../models';

const { Talla } = model;

class TallaRopa{
    static async create(req,res){
        const { nombre } = req.body
        if (await validation(nombre)){
            res.status(400).json({
                msg: 'Talla ya esta registrada'
            })
        }else{
            try {
                const resp = await  Talla.create({
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
        
    }
    static async list(req,res){
        try {
            const resp = await Talla.findAll();
            res.status(200).json({
                msg:"Lista de Tallas",
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
async function validation(nombre) {
    console.log(nombre);
    try {
        const data = await Talla.findOne({
            where: { nombre },
            attributes: ['nombre']
        })
        if (data) return true;
        return false;
    } catch (error) {
        console.log(error);
        return 'No se puede validat los datos'
    }
}

export default TallaRopa