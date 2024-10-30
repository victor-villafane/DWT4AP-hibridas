import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

const cliente = new MongoClient("mongodb+srv://admin:admin@dwt4ap.4rluh.mongodb.net/")
const db = cliente.db("DWT4AP")
const tokens = db.collection("tokens")

const SECRET_KEY = "DWT4AV"

export async function crearToken(usuario){
    const token = jwt.sign({...usuario, password: undefined}, SECRET_KEY, {expiresIn: "2h"} )

    await cliente.connect()

    await tokens.insertOne({ token: token, usuario_id: usuario._id })

    return token
}

export async function validateToken(token){
    try {
        const payload = jwt.verify(token, SECRET_KEY)
        const session = await tokens.findOne({ token, usuario_id: new ObjectId(payload._id) })
        if( !session ) throw new Error("No autorizado")
        //iat: fecha de creacion del token
        //exp: fecha de expiracion del token
        const horaActual = new Date().getTime() / 1000
        if( payload.exp < horaActual )  throw new Error("Token Expirado")
        return payload
    } catch (error) {
        throw new Error("No autorizado")
    }
}