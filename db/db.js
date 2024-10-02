import { MongoClient } from "mongodb"

const cliente = new MongoClient("mongodb://localhost:27017")

cliente.connect()
    .then( () => console.log("Me conecte!") )
    .catch( () => console.log("No me pude conectar") )
const db = cliente.db("DWT4AP")

async function consulta(){
    console.log("Consultado Datos")
    const datos = await db.collection("zapatillas").find().toArray()
    console.log(datos)
}

consulta()