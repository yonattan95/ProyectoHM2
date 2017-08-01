
const express = require('express');//modulo express
const app = express();//aplicacion express
//Servidor http con express
const server = require('http').Server(app);
//implementando socket.io al servidor
const io = require('socket.io')(server);

//ruta estatica (publica)
app.use(express.static('public'));
let arrayMensajes


//iniciando la coneccion de socket.io
io.on("connection", (socket) => {
  //arreglo que almacena todo el chat, en objetos
  arrayMensajes = [{
    id : 1,
    author : "App",
    text : "Bienvenido al chat :')"
  }];
  console.log("Alguien se ha conectador con el puto Socket :'v");
  socket.emit('mensaje', arrayMensajes);
  socket.on('newMensaje', (datos) =>{
      console.log(datos);
      arrayMensajes.push(datos);
      io.sockets.emit('mensaje',arrayMensajes);
  });
});

//corriendo el servidor en el puerto 8080
server.listen(8080, () =>
  console.log("Servidor corriendo en http://localhost:8080 :v")
);
