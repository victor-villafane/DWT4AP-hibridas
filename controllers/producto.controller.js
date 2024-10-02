import * as services from "../services/productos.service.js"
import * as views from "../views/productos.view.js"

const getProductos = (req, res) => {
    services.getProductos()
        .then( (productos) => res.send(views.createPage("Productos", views.crearListadoDeProductos(productos))) )
}

const getProductoId = (req, res) => {
    const id = req.params.id
    services.getProductoId(id)
        .then( (producto) => {
            console.log(producto)
            res.send(views.createPage("Producto",views.createPaginaDetalle(producto)))
        } )
        .catch( error => console.log(error) )
}

const formProducto = (req, res) => {
    res.send(views.createPage( "Nueva Zapatilla", views.nuevaZapatilla() ))
}

const agregarProducto = (req, res) => {
    services.agregarProducto(req.body)
        .then( () => res.redirect("/productos") )
}

const eliminarProducto = (req, res) => {
    const id = req.params.id
    services.borrarProductoLogico(id)
        .then( () => res.redirect("/productos") )
}
const modificarForm = (req, res) => {
    const id = req.params.id
    services.getProductoId(id)
        .then( (zapatilla) => res.send(views.createPage( "Modificar Zapatilla", views.modificarZapatilla(zapatilla) )) )
    
}

const modificarZapatilla = (req, res) => {
    const id = req.params.id
    const zapatilla = req.body
    services.modificarZapatilla(id, zapatilla)
        .then( () => res.redirect("/productos") )
}


export { getProductos, getProductoId,formProducto, agregarProducto, eliminarProducto, modificarForm, modificarZapatilla }