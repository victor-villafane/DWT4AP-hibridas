import { productoSchema } from "../schemas/producto.schema.js"

export async function validateProducto( req, res, next ){
    try {
        // Guardamos el resultado de la validación
        const datosValidados = await productoSchema.validate( req.body, { abortEarly: false, stripUnknown: true } )
        // Reemplazamos req.body con los datos validados y limpios
        req.body = datosValidados
        //Continuamos
        next()
    } catch (error) {
        res.status(400).json({ message: error.errors })
    }
}