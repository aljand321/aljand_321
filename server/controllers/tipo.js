import model from '../models';

const { Tipo } = model;

class TipoRopa {
    static async create(req, res) {
        const { nombre } = req.body
        if (await validation(nombre)) {
            res.status(400).json({
                msg: 'Ese tipo de producto ya esta registrado'
            })
        } else {
            try {
                const resp = await Tipo.create({
                    nombre
                });
                res.status(200).json({
                    msg: "se crearon los datos",
                    resp
                })
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: "no se puede crear los datos"
                })
            }
        }

    }
    static async list(req, res) {
        try {
            const resp = await Tipo.findAll();
            res.status(200).json({
                msg: "Lista de tipo de productos",
                resp
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "no se puede crear los datos"
            })
        }
    }
}


async function validation(nombre) {
    console.log(nombre);
    try {
        const data = await Tipo.findOne({
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


export default TipoRopa