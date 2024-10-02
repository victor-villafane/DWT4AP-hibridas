function crearListadoDeProductos(productos){
    let html = "<a href='/producto/nuevo' >Nueva Zapatilla</a>"
    html += "<ul>"
    for( let i = 0; i < productos.length ; i++ ){
        html += "<li>"+ productos[i].name + "<a href="+ "/productos/" + productos[i]._id +" >ver</a>"+ "<a href="+ "/producto/eliminar/" + productos[i]._id +" >Eliminar</a>" + "<a href="+ "/producto/modificar/" + productos[i]._id +" >Modificar</a>" + "</li>"
    }
    html += "</ul>"
    return html
} 
function createPage(titulo, contenido){ 
    return `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo}</title>
        </head>
        <body>
            <h1>Mi espectacular pagina web</h1>
            ${contenido}
        </body>
    </html>
    `
}

function createPaginaDetalle(producto){
    console.log(producto)
    return `
        <p>ID: ${producto._id}</p>
        <p>NOMBRE: ${producto.name}</p>
        <p>PRECIO: ${producto.price}</p>
        <p>DESCRIPCION: ${producto.description}</p>

        <a href="/productos" >atras</a>
    `
}

function nuevaZapatilla(){
    return `
    <h1>Agregar Zapatilla</h1>
    <form action="/producto/nuevo" method="POST" >
        <input type="text" name="name" placeholder="Nombre">
        <input type="text" name="price" placeholder="Nombre">
        <input type="text" name="description" placeholder="Nombre">
        <button type="submit" >Agregar</button>
    </form>
    `
}

function modificarZapatilla(zapatilla){
    return `
    <h1>Modificar Zapatilla</h1>
    <form action="/producto/modificar/${zapatilla._id}" method="POST" >
        <input type="text" value=${zapatilla.name} name="name" placeholder="Nombre">
        <input type="text" value=${zapatilla.price} name="price" placeholder="Precio">
        <input type="text" value=${zapatilla.description} name="description" placeholder="Descripcion">
        <textarea>${zapatilla.description}</textarea>
        <button type="submit" >Modificar</button>
    </form>
    `
}

export default{
    createPage, crearListadoDeProductos,createPaginaDetalle,nuevaZapatilla,modificarZapatilla
}

export{
    createPage, crearListadoDeProductos,createPaginaDetalle,nuevaZapatilla,modificarZapatilla
}