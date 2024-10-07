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
    console.log(filtros)
    await cliente.connect()
    return db.collection("zapatillas").find(filterMongo).toArray()
        // .then( (data) => {
        //     return eliminado ? JSON.parse(data).filter( zapatilla => zapatilla.eliminado != true ) : JSON.parse(data)
        // })
        // .catch( err => [] )
}
async function getProductoId(id_ingresado){
    console.log(id_ingresado)
    await cliente.connect()
    return db.collection("zapatillas").findOne({ _id: new ObjectId(id_ingresado)})
   // return zapatilla
    // return getProductos()
    //     .then( productos => {
    //         const producto = productos.find( p => p.id == id )
    //         return producto
    //     } )
}

async function agregarProducto(zapatilla){
    await cliente.connect()
    await db.collection("zapatillas").insertOne(zapatilla)
    return zapatilla
    // return getProductos(false)
    //     .then( async zapatillas => {
    //         console.log(zapatillas)
    //         const nuevaZapatilla = {
    //             id: zapatillas.length + 1,
    //             ...zapatilla
    //         }
    //         zapatillas.push(nuevaZapatilla)
    //         await writeFile("./data/productos.json", JSON.stringify(zapatillas))
    //         return zapatillas
    //     } )
}

async function borrarProducto(id){
    await cliente.connect()
    return db.collection("zapatillas").deleteOne({ _id: new ObjectId(id) })
    // return getProductos(false)
    //     .then( async zapatillas => {
    //         const zapatillasActualizado = zapatillas.filter( zapatilla => zapatilla.id != id )
    //         await writeFile("./data/productos.json", JSON.stringify(zapatillasActualizado))
    //     } )
}

async function borrarProductoLogico(id){
    await cliente.connect()
    return db.collection("zapatillas").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } } )
    // return getProductos()
    //     .then( async zapatillas => {
    //         const zapatillaValidacion = zapatillas.find( zapatilla => zapatilla.id == id )
    //         if( !zapatillaValidacion ){
    //             throw new Error("No se encontro el recurso")
    //         }
    //         const zapatillasActualizado = zapatillas.map( zapatilla => {
    //             if( zapatilla.id == id ){
    //                 return {
    //                     ...zapatilla,
    //                     eliminado: true
    //                 }
    //             }else{
    //                 return zapatilla
    //             }
    //         } )
    //         await writeFile("./data/productos.json", JSON.stringify(zapatillasActualizado))
    //     } )
}

async function modificarZapatilla(id, zapatillaActualizado){
    await cliente.connect()
    return db.collection("zapatillas").replaceOne({ _id: new ObjectId(id) }, zapatillaActualizado)   
    // return getProductos()
    //     .then( async zapatillas => {
            
    //         const zapatillaValidacion = zapatillas.find( z => z.id == id )
    //         if( !zapatillaValidacion ){
    //             throw new Error("No se encontro el recurso")
    //         }

    //         const zapatillasActualizado = zapatillas.map( zapatilla => {
    //             if( zapatilla.id == id ){
    //                 return {
    //                     id: id,
    //                     ...zapatillaActualizado,
    //                 }
    //             }else{
    //                 return zapatilla
    //             }
    //         } )
    //         await writeFile("./data/productos.json", JSON.stringify(zapatillasActualizado))
    //         return zapatillasActualizado
    //     } )
}

async function actualizarZapatilla(id, zapatillaActualizado){
    await cliente.connect()
    return db.collection("zapatillas").updateOne({ _id: new ObjectId(id) }, { $set: zapatillaActualizado })
    // return getProductos()
    //     .then( async zapatillas => {
            
    //         const zapatillaValidacion = zapatillas.find( z => z.id == id )
    //         if( !zapatillaValidacion ){
    //             throw new Error("No se encontro el recurso")
    //         }

    //         const zapatillasActualizado = zapatillas.map( zapatilla => {
    //             if( zapatilla.id == id ){
    //                 return {
    //                     id: id,
    //                     name: zapatillaActualizado.name ? zapatillaActualizado.name : zapatilla.name ,
    //                     price: zapatillaActualizado.price ? zapatillaActualizado.price : zapatilla.price,
    //                     description: zapatillaActualizado.description ? zapatillaActualizado.description : zapatilla.description
    //                 }
    //             }else{
    //                 return zapatilla
    //             }
    //         } )
    //         await writeFile("./data/productos.json", JSON.stringify(zapatillasActualizado))
    //         return zapatillasActualizado
    //     } )
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
