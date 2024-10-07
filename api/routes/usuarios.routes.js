import express from "express"
import * as controllers from "../controllers/usuarios.controller.js"

const route = express.Router()

route.get("/usuarios", controllers.getUsuarios)       //endpoint
route.post("/usuarios/:idUsuario/carrito", controllers.agregarCarrito)
route.post("/usuarios", controllers.agregarUsuario)
route.delete("/usuarios/:id", controllers.borrarUsuario)
export default route