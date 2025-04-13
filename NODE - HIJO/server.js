const http = require("http")
http.createServer((req,res)=>{
    if(req.url==="/pago"){
        res.write("Pago completado")
        return res.end()
    }
    res.write("Hola desde servidor node")
    res.end()
}).listen(3000)
console.log("El servidor esta listo en el puerto 3000") 