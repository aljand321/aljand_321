import model from '../models';

const { Color } = model;

class ColorRopa{
    static async create(req,res){
        const { nombre } = req.body
        if (await validation(nombre)){
            res.status(400).json({
                msg: 'Color ya esta registrado'
            })
        }else{
            try {
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

async function validation(nombre) {
    console.log(nombre);
    try {
        const data = await Color.findOne({
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

export default ColorRopa