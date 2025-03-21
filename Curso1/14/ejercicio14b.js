const http = require('node:http')
const fs = require('node:fs/promises')

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4'
}

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8888' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
});

servidor.listen(8888)


function encaminar(pedido, respuesta, camino) {
  switch (camino) {
    case 'public/listanumeros': {
      listar(pedido, respuesta)
      break
    }
    case 'public/listadotabla': {
      listarTablaMultiplicar(pedido, respuesta)
      break
    }
    default: {
      fs.stat(camino)
        .then(() => {
          fs.readFile(camino)
            .then(contenido => {
              const vec = camino.split('.')
              const extension = vec[vec.length - 1]
              const mimearchivo = mime[extension]
              respuesta.writeHead(200, { 'Content-Type': mimearchivo })
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
    }
  }
}


function listar(pedido, respuesta) {
  const info = ''
  respuesta.writeHead(200, { 'Content-Type': 'text/html' })
  let pagina = '<!doctype html><html><head></head><body>'
  for (let f = 1; f <= 20; f++) {
    pagina += `<a href="listadotabla?num=${f}">${f}</a><br>`
  }
  pagina += '</body></html>'
  respuesta.end(pagina)
}

function listarTablaMultiplicar(pedido, respuesta) {
  const url = new URL('http://localhost:8088' + pedido.url)
  respuesta.writeHead(200, { 'Content-Type': 'text/html' })
  let pagina = '<!doctype html><html><head></head><body>'
  for (let f = 1; f <= 10; f++) {
    pagina += `${url.searchParams.get('num')}*${f}=${url.searchParams.get('num') * f}<br>`
  }
  pagina += '</body></html>'
  respuesta.end(pagina)
}


console.log('Servidor web iniciado')