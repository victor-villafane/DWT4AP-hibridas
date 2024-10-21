import express from "express"
import * as controllers from "../controllers/productos.controller.js"
import { validateProducto } from "../../middleware/producto.validate.middleware.js"
const route = express.Router()

route.get("/productos", controllers.getProductos)
route.get("/productos/:id", controllers.getProductoId)
route.post("/productos",[validateProducto], controllers.crearProducto)
route.delete("/producto/:id", controllers.borrarProducto)
route.put("/producto/:id", controllers.reemplazarProducto)  //reemplaza
route.patch("/producto/:id", controllers.actualizarProducto) //actualiza

export default route