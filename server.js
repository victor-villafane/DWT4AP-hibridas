import express from "express"
import cors from "cors"
import ProductoRoute from "./routes/productos.routes.js"
import ApiRoute from "./api/routes/productos.routes.js"
import ApiUsuario from "./api/routes/usuarios.routes.js"
import multer from "multer"
import sharp from "sharp"
import http from "http"
import { Server as SocketIO } from "socket.io"

const app = express()
const server = http.createServer(app)

const io = new SocketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", () => {
    console.log("conectado!")
})

io.on("mensaje", (dato) => {
    console.log("mensaje")
})

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST"
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads")
    },
    filename: function(req, file, cb){
        cb( null, file.originalname.trim().replace(/\s/g, "_") )
    }
})

async function resizeImage( req, res, next ){
    return sharp( req.file.path )
        .resize(150)
        .webp()
        .rotate(90)
        .toFile("uploads/" + ( new Date().getTime() ) + ".webp")
        .then( () => {
            console.log("Imagen redimencionada")
            next()
        } )
        .catch( err => res.status(500).json({"error": err}) )
}

const upload = multer({ storage: storage })

app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )
app.use( cors(corsOptions) )
app.use("/api",ApiRoute)
app.use("/api",ApiUsuario)

app.use(ProductoRoute)

app.post( "/upload",[upload.single("file"), resizeImage], (req, res) => {
    console.log(req.file, req.body)
    res.send("ok")
} )

server.listen(2024, () => console.log("Ready"))

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
