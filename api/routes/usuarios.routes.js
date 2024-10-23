import express from "express"
import * as controllers from "../controllers/usuarios.controller.js"
import { validateUsuario } from "../../middleware/usuario.validate.middleware.js"
const route = express.Router()

route.post("/usuario/login", controllers.login )
route.get("/usuarios", controllers.getUsuarios)       //endpoint
route.post("/usuarios/:idUsuario/carrito", controllers.agregarCarrito)
route.post("/usuarios",[validateUsuario], controllers.agregarUsuario)
route.delete("/usuarios/:id", controllers.borrarUsuario)
export default route