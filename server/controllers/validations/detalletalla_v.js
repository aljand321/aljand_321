import model from '../../models';
const { Productos } = model
const { DetalleTalla } = model;

class ValidationDetalleTalla {
    static async createDetalleProducto(descripcion, cantidad, id_producto, id_talla, id_precios) {
        try {
            const data = await DetalleTalla.create({
                descripcion,
                cantidad,
                id_producto,
                id_talla,
                id_precios
            });
            return data
        } catch (error) {
            console.log(error)
            return "No se pudieron crear los datos"
        }
    }
    static async sacarCantiadProducto(id_producto) {
        console.log(id_producto, " esto es lo que quiero ver ")
        try {
            const producto = await Productos.findOne({
                where: { id: id_producto },
                attributes: ['cantidad']
            });
            return { success:true, cantiad:producto.cantidad }
        } catch (error) {
            console.log(error);
            return { success:false, msg:"Error, ese producto no existe o la cantiad no se puede mostrar" }
        }
    }
    static async Verificar(id_producto) {
        try {
            const data = await DetalleTalla.findAll({
                where: { id_producto }
            })
            if (data == '') {
                return false
            } else {
                return true
            }

        } catch (error) {
            console.log(error);
            return "Error no se puede mostrar la cantidad del producto"
        }
    }
    static async verficarC_P(cantidad, cantidadProductos, id_producto) {
        var ProductosCantidad = cantidadProductos.cantiad
        try {
            var cant = 0;
            const list = await DetalleTalla.findAll({ where: { id_producto }, attributes: ['cantidad'] });

            for (var i = 0; i < list.length; i++) {
                cant = list[i].cantidad + cant;
            }
            var C_v = (ProductosCantidad - cant) * 1
            var msg = [
                { succes: true, msg: "Se crearon los datos" },
                { succes: false, msg: "cantidad exedida: De este producto queda " + C_v + " para registrar " },
                { succes: false, msg: "La cantidad no puede ser 0 " }
            ]
            //console.log(C_v, " <<<<<<<<<<< ", cantidad, ProductosCantidad,cant);            
            if (cantidad <= C_v && cantidad > 0) {
                return msg[0]
            } else {
                if (cantidad >= C_v) {
                    return msg[1]
                } else {
                    return msg[2]
                }
            }
        } catch (error) {
            console.log(error);
            return "no se puede sacar los datos de la tabla detalles tallas"
        }
    }
    static async verifiTallaExist(id_producto, id_talla) {
        const verificarTallaExistencia = await DetalleTalla.findOne({ where: { id_producto: id_producto, id_talla: id_talla } })
        if (verificarTallaExistencia) {
            return true
        } else {
            return false
        }
    }
}
export default ValidationDetalleTalla