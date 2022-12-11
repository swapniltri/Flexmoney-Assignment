const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Socket
const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

//Session setup
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session); //Local storage in mongoDB to store information about the session

//Routes
const routes = require("./routes");

//Config
// const dotenv = require("dotenv");
// dotenv.config({path:"./config.env"});

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://user123:12345@cluster0.l3xnmei.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(() => {
    console.log("Success");
}).catch((err) => console.log("Failed"));

app.use(session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        uri: "mongodb+srv://user123:12345@cluster0.l3xnmei.mongodb.net/?retryWrites=true&w=majority",
        collection: "session"
    }),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 //1 day in milisec.
    }
}));

app.use("/", routes);

app.listen(4000, function(){
    console.log("listening on port: 4000");
});