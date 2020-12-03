import model from '../../models';
const { Productos } = model
const { DetalleTalla } = model;



class ValidationDetalleTalla{
    static async sacarCantiadProducto(id_producto){
        try {
            const producto = await Productos.findOne({
                where: { id:id_producto },
                attributes:['cantidad']
            });            
            return producto.cantidad;            
        } catch (error) {
            console.log(error);
            return "Error no se puede mostrar la cantidad del producto"
        }
    }

    static async Verificar(id_producto){
        try {
            const data  = await DetalleTalla.findAll({
                where:{ id_producto }
            })
            
            if (data == ''){
                return false
            }else{
                return true
            }                
            
        } catch (error) {
            console.log(error);
            return "Error no se puede mostrar la cantidad del producto"
        }
    }
    static VerificarCantidad({ cantidad, cantidadProductos }){
        var msg = [
            {succes:true, msg:"Continuar"},
            {succes:false, msg:"Cantidad exedida"},
            {succes:false, msg:"La cantidad no puede ser 0"}            
        ]
        
        if (cantidad <= cantidadProductos && cantidad > 0){            
            return msg[0]
        }else {
            if(cantidad >= cantidadProductos){                
                return msg[1]
            } else{                
                return msg[2] 
            }
        }

        
    }
}
export default ValidationDetalleTalla