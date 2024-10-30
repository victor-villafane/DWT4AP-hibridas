import express from "express"
import * as controllers from "../controllers/productos.controller.js"
import { validateProducto } from "../../middleware/producto.validate.middleware.js"
import { validateToken } from "../../middleware/token.middleware.js"
const route = express.Router()

route.get("/productos",[validateToken], controllers.getProductos)
route.get("/productos/:id",[validateToken], controllers.getProductoId)
route.post("/productos",[validateToken, validateProducto], controllers.crearProducto)
route.delete("/producto/:id",[validateToken], controllers.borrarProducto)
route.put("/producto/:id",[validateToken], controllers.reemplazarProducto)  //reemplaza
route.patch("/producto/:id",[validateToken], controllers.actualizarProducto) //actualiza

export default route