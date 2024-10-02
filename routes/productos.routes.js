import express from "express"
import * as controllers from "../controllers/producto.controller.js"

const route = express.Router()

route.get("/productos", controllers.getProductos)       //endpoint
route.get("/productos/:id", controllers.getProductoId)
route.get("/producto/nuevo", controllers.formProducto)
route.post( "/producto/nuevo", controllers.agregarProducto )
route.get( "/producto/eliminar/:id", controllers.eliminarProducto )
route.get( "/producto/modificar/:id", controllers.modificarForm )
route.post( "/producto/modificar/:id", controllers.modificarZapatilla )
export default route