import * as service from "../../services/productos.service.js"

function getProductos(req, res){
    const filtros = req.query
    service.getProductos(filtros)
        .then( (zapatillas) => res.status(200).json(zapatillas) )
}

function getProductoId(req, res){
    const id = req.params.id
    service.getProductoId(id)
        .then( (zapatilla) => res.status(200).json(zapatilla) )
}

function crearProducto(req, res){
    const zapatilla = req.body
    service.agregarProducto(zapatilla)
        .then( (zapatillas) => res.status(201).json(zapatillas) )
}

function borrarProducto(req, res){
    const id = req.params.id
    console.log("LLEGO EL BORRAR", req.params.id)
    service.borrarProductoLogico(id)
        .then( () => res.status(204).json(id) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

function reemplazarProducto(req, res){
    const id = req.params.id
    const zapatilla = req.body
    service.modificarZapatilla(id, zapatilla)
        .then( (zapatilla) => res.status(204).json(zapatilla) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

function actualizarProducto(req, res){
    const id = req.params.id
    const zapatilla = req.body

    service.actualizarZapatilla(id, zapatilla)
    .then( (zapatilla) => res.status(204).json(zapatilla) )
    .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )

}

export {
    getProductos,
    getProductoId,
    crearProducto,
    borrarProducto,
    reemplazarProducto,
    actualizarProducto
}