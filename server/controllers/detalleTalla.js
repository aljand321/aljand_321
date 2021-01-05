import model from '../models';

import ValidationDetalleTalla from './validations/detalletalla_v';

const { DetalleTalla } = model;
const { Productos } = model

class DetalleTallaP {
    static async create(req, res) {
        const { descripcion, cantidad, id_talla, id_precio } = req.body;
        const { id_producto } = req.params;
        const cantidadProductos = await ValidationDetalleTalla.sacarCantiadProducto(id_producto);
        const verificar = await ValidationDetalleTalla.Verificar(id_producto);
        if (cantidadProductos.success == true) {
            const verficarC_P = await ValidationDetalleTalla.verficarC_P(cantidad, cantidadProductos, id_producto);
            const v_t_e = await ValidationDetalleTalla.verifiTallaExist(id_producto, id_talla);
            if (v_t_e) {
                res.status(400).json({
                    msg: " esta talla ya esta registrado para ese producto"
                });
            } else {
                if (verificar == false) {
                    if (verficarC_P.succes) {
                        const crearD_P = await ValidationDetalleTalla.createDetalleProducto(descripcion, cantidad, id_producto, id_talla, id_precio)
                        return res.status(200).json({ msg: verficarC_P.msg, crearD_P });
                    } else {
                        res.status(400).json({ msg: verficarC_P.msg });
                    }
                } else {
                    if (verficarC_P.succes == true) {
                        const crearD_P = await ValidationDetalleTalla.createDetalleProducto(descripcion, cantidad, id_producto, id_talla, id_precio)
                        res.status(200).json({ msg: verficarC_P.msg, crearD_P });
                    } else {
                        res.status(400).json({ msg: verficarC_P.msg });
                    }
                }
            }
        }else{
            res.status(500).json({
                msg:cantidadProductos.msg
            })
        }


    }
    static async list(req, res) {
        try {
            const resp = await DetalleTalla.findAll();
            res.status(200).json({
                msg: "Tallas de los productos",
                resp
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "no se puede mostrar los datos"
            })
        }
    }

    static async delete(req, res) {
        try {
            const resp = await DetalleTalla.findByPk(req.params.id);
            await resp.destroy();
            res.status(200).json({
                msg: "detalle talla elminado",
                resp
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: "Error no se pudo eliminar"
            })
        }
    }
}

export default DetalleTallaP