import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import { crearToken } from "./token.service.js";

const cliente = new MongoClient("mongodb+srv://admin:admin@dwt4ap.4rluh.mongodb.net/")
const db = cliente.db("DWT4AP")

export async function getUsuarios(){
    await cliente.connect();
    return db.collection("usuarios").find().toArray()
}

export async function agregarUsuario(usuario){
    await cliente.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
        
    if( existe ) {
        throw new Error("Cuenta Ya Existe")
    }    

    const usuarioNuevo = { ...usuario }     //hice una copia
    
    usuarioNuevo.password = await bcrypt.hash( usuario.password, 10)

    await db.collection("usuarios").insertOne(usuarioNuevo)

    return usuarioNuevo
}

export async function borrarUsuario(id){
    await cliente.connect()
    return db.collection("usuarios").updateOne( {_id: ObjectId.createFromHexString(id)}, { $set: {eliminado: true} } )
}

export async function login(usuario){
        await cliente.connect()

        const existe = await db.collection("usuarios").findOne({ email: usuario.email })
        
        if( !existe ) {
            throw new Error(" No me pude loguear ")
        }

        const esValido = await bcrypt.compare( usuario.password, existe.password )

        if( !esValido ) {
            throw new Error(" No me pude loguear ")
        }

        const token = await crearToken(existe)

        return { ...existe,token: token, password: undefined }
}
export async function agregarCarrito(idUsuario, producto){
    await cliente.connect()
    const productoCompleto = await db.collection( "zapatillas" ).findOne({ _id: ObjectId.createFromHexString(producto._id) })
    
    const resultado = await db.collection("usuarios").updateOne(
        { _id: ObjectId.createFromHexString(idUsuario) },
        // { $push: {carrito: {$each: productoCompleto}} } //...productoCompleto
        { $push: {carrito: productoCompleto} }
    )

    return resultado.modifiedCount > 0 ? "Producto agregado" : "No se pudo agregar producto "
}