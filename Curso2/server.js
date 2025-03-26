const http = require('http')
http.createServer((req,res) =>{
    res.write('Hola servidor node');
    res.end()
}).listen(3000)
console.log('El servidor esta listo en el puerto 3000');