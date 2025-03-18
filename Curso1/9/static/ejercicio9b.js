const http = require('node:http')
const fs = require('node:fs/promises')
const path = require('node:path')

const servidor = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:3333' + pedido.url)
    let camino = '/home/luis_h_s05/Documentos/Proyectos/Node_ejercicios/9/static' + url.pathname

    if (camino == '/home/luis_h_s05/Documentos/Proyectos/Node_ejercicios/9/static/') {
        camino = '/home/luis_h_s05/Documentos/Proyectos/Node_ejercicios/9/static/index.html'
    }

    fs.stat(camino)
        .then(() => {
            fs.readFile(camino)
                .then(contenido => {
                    respuesta.writeHead(200, {'Content-Type': 'text/html'})
                    respuesta.write(contenido)
                    respuesta.end()
                })
                .catch(error => {
                    respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
                    respuesta.write('Error interno')
                    respuesta.end()
                })
        })
        .catch(error => {
            respuesta.writeHead(404, { 'Content-Type': 'text/html' })
            respuesta.end('<h1>Error 404: No existe el recurso solicitado</h1>')
        })
})

servidor.listen(3333)
console.log('Servidor web iniciado')
