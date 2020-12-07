import model from '../../models';
import Producto from '../productos';

const { Productos } = model;
const { Almacen } =  model;

class ValidationProductos {

    static async verfiTamanio(id_almacen){
        try {
            const tamanio = await Almacen.findOne({
                where:{id:id_almacen},
                attributes:['tamanio']
            })
            return tamanio.tamanio;
        } catch (error) {
            console.log(error);
            return 'No se puede mostrar los datos'
        }
    }
    static async validarTamanio(tamanio,id_almacen,cantidad){
        var cant = 0;
        const list = await Productos.findAll({
            where:{id_almacen},
            attributes:['cantidad']
        });
        for (var i = 0; i < list.length; i++){
            cant = list[i].cantidad + cant;
        }
        var c_v = tamanio - cant;
        
        var msg = [
            {success:true, msg:"se crearon los datos"},
            {success:false, msg:"La cantidad no puede ser 0"},
            {success:false, msg:"Cantidad exedida para ese lugar, solo soporta "+ c_v},
        ]
        if (cantidad <= c_v && cantidad > 0) return msg[0];
        if (cantidad <= 0) return msg[1];
        if (cantidad >= c_v) return msg[2];
                
    }
}   

export default ValidationProductos;