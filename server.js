var express = require('express');
var app = express();
 
var http = require('http');
var server = http.Server(app);
 
var socket = require('socket.io');
var io = socket(server);

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://dbuser:yti050910@cluster0.u2uiy.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('DB가 열렸습니다.');
});

var ChatSchema = mongoose.Schema({
    message: String
  });
 
  ChatSchema.methods.speak = function () {
    var message = this.message;
    if (message != '') {
      console.log(message);
    } else {
    }
  };


var port = 5000;
var socketList = [];
 
app.use('/', function(req, resp) {
    resp.sendFile(__dirname + '/chat.html');
});
 
io.on('connection', function(socket) {
    socketList.push(socket);
    console.log('User Join');
 
    socket.on('SEND', function(msg) {
        console.log(msg);
        socketList.forEach(function(item, i) {
            console.log(item.id);
            if (item != socket) {
                item.emit('SEND', msg);
                var fluffy = new Kitten({ message: msg});
                fluffy.save(function (err, fluffy) {
                    if (err) return console.error(err);
                    fluffy.speak();
                  });
            }
        });
    });
 
    socket.on('disconnect', function() {
        socketList.splice(socketList.indexOf(socket), 1);
    });
});
 
server.listen(port, function() {
    console.log('Server On !');
});