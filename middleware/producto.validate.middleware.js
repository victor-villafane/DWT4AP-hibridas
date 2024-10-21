import { productoSchema } from "../schemas/producto.schema.js"

export function validateProducto( req, res, next ){
    productoSchema.validate( req.body )
        .then( () => next() )
        .catch( ( error ) => res.status(400).json({ message: error.message }) )
}