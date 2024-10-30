import { validateToken as validarToken } from "../services/token.service.js"

export function validateToken(req, res, next){
    const token = req.headers["auth-token"]
    try {
        if( !token ) throw new Error("No autorizado")
        const usuario = validarToken(token)
        if( !usuario ) throw new Error("No autorizado")
        req.usuario = usuario
        next()
    } catch (error) {
        res.status(401).json({ message: "No autorizado" })
    }
}