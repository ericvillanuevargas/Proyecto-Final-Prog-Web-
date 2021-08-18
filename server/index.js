var express = require("express");
var app = express();
var server= require("http").Server(app);
var io = require("socket.io")(server);



app.use(express.static("client"));

app.get("/eric", function(req,res) {
    res.status(200).send("hola mundo")
});

var messages= [{
    id:1,
    text:'Bienvenido al Mura interactivo de Eric Villanueva(2019-8493)....',
    nickname: 'Bot de Inicio'
}];

io.on("connection",function(socket){
    console.log("El cliente con IP:"+socket.handshake.address+" se ha conectado....")

    socket.emit('messages',messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages)
    })
})

server.listen(4000, function(){
    console.log("server funcionando http://localhost:4000")
})