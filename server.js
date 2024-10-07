import express from "express"
import ProductoRoute from "./routes/productos.routes.js"
import ApiRoute from "./api/routes/productos.routes.js"
import ApiUsuario from "./api/routes/usuarios.routes.js"
const app = express()
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

app.use("/api",ApiRoute)
app.use("/api",ApiUsuario)

app.use(ProductoRoute)

app.listen(2024, () => console.log("Ready"))

/**
 * 1. La url no hace referencia a la locacion, sino identifica un recurso.
 * 
 * URL -> URI 
 * 
 * 2. La accion se define con los verbos HTTP
 * 
 * GET -> OBTENER UN RECURSO
 * POST -> CREAR UN RECURSO
 * PUT -> REEMPLAZAR UN RECURSO -> 
 * PATCH -> ACTUALIZAR UN RECURSO
 * DELETE -> BORRAR UN RECURSO
 * 
 * 3. Los datos de los recursos son transportados utilizando el formato JSON o xml
 * 
 * 4. Los estados de las peticiones son definidas con http status code
 * 
 * 1xx -> Informativos
 * 2xx -> OK
 * 3xx -> redirecciones
 * 4xx -> Errores del usuario
 * 5xx -> Errores del servidor
 */
