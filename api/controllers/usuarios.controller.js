import * as service from "../../services/usuarios.service.js"

export function getUsuarios(req, res){
    const filtros = req.query
    service.getUsuarios(filtros)
        .then( (zapatillas) => res.status(200).json(zapatillas) )
}

export function agregarUsuario(req, res){
    const usuario = req.body
    service.agregarUsuario(usuario)
        .then( (usuario) => res.status(201).json(usuario) )
        .catch( () => res.status(404).json({ mensaje: "No se pudo agregar" }) )
}

export function borrarUsuario(req, res){
    const id = req.params.id
    service.borrarUsuario(id)
        .then( () => res.status(204).json({mensaje: "usuario eliminado"}) )
        .catch( () => res.status(404).json( { mensanje: "no se pudo eliminar" } ) )
}

export function agregarCarrito(req, res){
    const usuario = req.params.idUsuario
    const producto = req.body
    console.log("LLEGUE", usuario)
    service.agregarCarrito(usuario, producto)
        .then( usuario => res.status(201).json(usuario) )
        .catch( () => res.status(404).json({ mensaje: "No se pudo agregar a carrito" }) )
}