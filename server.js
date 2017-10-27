var express = require('express');
var app = express();

var path = require('path');

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongo Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/usersSchema');

let UserSchema = new mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    editable: { type: String, require: true },
})
mongoose.model('User', UserSchema); 
var User = mongoose.model('User') 


// Staic Files
app.use(express.static(path.join(__dirname, './public/dist')));


// Routes

app.all("*", (req,res,next)  => {
    res.sendfile(path.resolve("./public/dist/index.html"))
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})