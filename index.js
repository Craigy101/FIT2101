const mysql = require("mysql");
let http = require('http');
let fs = require('fs');
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
var PORT = process.env.PORT || 8000
const io = require('socket.io')(process.env.PORT)

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

const app = express();
//everything in public will become static, can be used everywhere
const publicDirectory = path.join(__dirname, '/public');
app.use(express.static(publicDirectory));


//To get info from any html form
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');


//take cares of all the routes
app.use('/', require("./routes/pages"));
app.use('/auth', require("./routes/auth"))

dotenv.config({path:'./.env'})

const users = {}



io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)

  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    console.log("test")
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})


const database = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABSE
  }

)

database.connect((error) => {
  if(error)
  {
      console.log(error)
  }
  else
  {
    console.log("MYSQL connected...")
  }
})
// let handleRequest = (request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.readFile('/public/UI_HomePage.html', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             response.write('Whoops! File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// };
//http.createServer(handleRequest)

app.listen(PORT, () => {console.log("Server started on port " + PORT)});
