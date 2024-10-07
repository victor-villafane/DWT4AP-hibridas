import { MongoClient, ObjectId } from "mongodb"

const cliente = new MongoClient("mongodb+srv://admin:admin@dwt4ap.4rluh.mongodb.net/")
const db = cliente.db("DWT4AP")

export async function getUsuarios(){
    await cliente.connect();
    return db.collection("usuarios").find().toArray()
}

export async function agregarUsuario(usuario){
    await cliente.connect()
    await db.collection("usuarios").insertOne(usuario)
    return usuario
}

export async function borrarUsuario(id){
    await cliente.connect()
    return db.collection("usuarios").updateOne( {_id: ObjectId.createFromHexString(id)}, { $set: {eliminado: true} } )
}

// export async function agregarCarrito(idUsuario, producto){
//     await cliente.connect()
//     const usuario = await db.collection("usuarios").findOne({ _id: ObjectId.createFromHexString(idUsuario) })
//     if( usuario.carrito == undefined ){
//         usuario.carrito = []
//     }
//     console.log("Usuario encontrado", usuario)
//     const productoCompleto = await db.collection( "zapatillas" ).findOne({ _id: ObjectId.createFromHexString(producto._id) })
//     console.log("Producto encontrado", productoCompleto)
//     usuario.carrito.push( productoCompleto ) // [] lo pueden ... 

//     const resultado = await db.collection( "usuarios" ).replaceOne({_id: ObjectId.createFromHexString(idUsuario) }, usuario)

//     return resultado
// }

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