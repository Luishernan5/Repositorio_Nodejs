const express = require("express") 
const app = express()

app.use(express.json())
// Middleware para analizar el cuerpo de las solicitudes con datos 
// codificados en URL
app.use(express.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    res.send("Hola mundo desde express")
})

// Solicitudes GET
app.get("/api/saludo", (req,res)=>{
    const nombre = req.query.nombre || "amigo"
    res.json({mensaje:`!hola, ${nombre}`})
})

// Ruta para manejar solicitudes
app.post("/api/mensaje", (req, res)=>{
    const mensaje = req.body.mensaje
    res.json({respuesta:`Recibido: ${mensaje}`})
})

// Puerto en el que el servidor esta escuchando
const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
})

