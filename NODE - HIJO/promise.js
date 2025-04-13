//
//pedirPizza.then((mensajeExito)=>{
//    console.log(mensajeExito)
//}).catch((mensajeError)=>{
//    console.log(mensajeError)
//})//

const {promisify} = require('util')
function pedirPizzaCallback(callback){
    console.log("Pedido realizado. Esperando la Pizza...");
    console.log("ARRIBA LAS CHIVAS.");
    setTimeout(() => {
        let exito = true;
        if (exito) {
            callback("¡Pizza entregada!, disfruta tu comida.");
        } else {
            callback("Hubo un problema con tu pedido.");
        }

    }, 3000);
}

const pedirPizza = promisify(pedirPizzaCallback);
async function pedirPizzaAwait(){
    try{
        const mensajeExito = await pedirPizza()
        console.log(mensajeExito)

    } catch (mensajeError){
        console.log(mensajeError)

    }
}

pedirPizzaAwait()
