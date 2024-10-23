import { readFile, writeFile } from "fs/promises"
import { MongoClient, ObjectId } from "mongodb"

const cliente = new MongoClient("mongodb+srv://admin:admin@dwt4ap.4rluh.mongodb.net/")
const db = cliente.db("DWT4AP")

async function getProductos( filtros = {} ){
    const filterMongo = { filtroEliminado: { $ne: true } }
    if( filtros.precioMayorQue !== undefined && filtros.precioMenorQue !== undefined ){
        // filterMongo.price = { $gte: parseInt(filtros.precioMayorQue) }
        filterMongo.$and = [ 
                            { price: { $gte: parseInt(filtros.precioMayorQue) } }, 
                            { price: { $lte: parseInt(filtros.precioMenorQue) } } 
                        ]
    }else if( filtros.precioMayorQue !== undefined ){
        filterMongo.price = { $gte: parseInt(filtros.precioMayorQue) }
    }else if( filtros.precioMenorQue !== undefined ){
        filterMongo.price = { $lte: parseInt(filtros.precioMenorQue) }
    }
    // filterMongo.price = { $eq: parseInt(filtros.price) }
    if( filtros.descripcion !== undefined ){
        filterMongo.$text = { $search: filtros.descripcion }
    }

    if( filtros.categoria !== undefined ){
        filterMongo.categoria = { $eq: filtros.categoria }
    }
    await cliente.connect()
    return db.collection("zapatillas").find(filterMongo).toArray()
}
async function getProductoId(id_ingresado){
    console.log(id_ingresado)
    await cliente.connect()
    return db.collection("zapatillas").findOne({ _id: new ObjectId(id_ingresado)})
}

async function agregarProducto(zapatilla){

    // const nuevaZapatilla = {
    //     "name": zapatilla.name,
    //     "price": zapatilla.price,
    //     "description": zapatilla.description,
    //     "categoria": zapatilla.categoria,
    // }

    try {        
        await cliente.connect()
        await db.collection("zapatillas").insertOne(zapatilla)
        return zapatilla
    } catch (error) {
        console.log(error)
    }
}

async function borrarProducto(id){
    await cliente.connect()
    return db.collection("zapatillas").deleteOne({ _id: new ObjectId(id) })
}

async function borrarProductoLogico(id){
    await cliente.connect()
    return db.collection("zapatillas").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } } )
}

async function modificarZapatilla(id, zapatillaActualizado){
    await cliente.connect()
    return db.collection("zapatillas").replaceOne({ _id: new ObjectId(id) }, zapatillaActualizado)   
}

async function actualizarZapatilla(id, zapatillaActualizado){
    await cliente.connect()
    return db.collection("zapatillas").updateOne({ _id: new ObjectId(id) }, { $set: zapatillaActualizado })
}

export{
    getProductoId,
    getProductos,
    agregarProducto,
    borrarProducto,
    borrarProductoLogico,
    modificarZapatilla,
    actualizarZapatilla
}

export default{
    getProductoId,
    getProductos,
    agregarProducto,
    borrarProducto,
    borrarProductoLogico
}
