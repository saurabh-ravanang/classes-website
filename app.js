const express = require("express");
const app = express();
const consolidate = require("consolidate");
const path = require('path');
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const port = 80;

// MONGOOSE DATABASE HERE
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/saurabhclasses');
}

// app.use(bodyparser.json);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

// DEFINES SCHEMA FOR CONTACT
const saurabhSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    message: String
  });

const contact = mongoose.model('contact', saurabhSchema);

//DEFINES SCHEMA FOR LOGIN
const saurabhclassSchema = new mongoose.Schema({
    name: String,
    password: String
});

const login = mongoose.model('login', saurabhclassSchema);

// SERVING STATIC FILES
app.use("/css", express.static("css"));

// SETTING THE TEMPLATE ENGINE AS HTML
app.engine('html', consolidate.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.get('/', (req, res)=>{
    res.render("home.html");
});
app.get('/home.html', (req, res)=>{
    res.render("home.html");
});
app.get('/about.html', (req, res)=>{
    res.render("about.html");
});
app.get('/cources.html', (req, res)=>{
    res.render("cources.html");
});
app.get('/contact.html', (req, res)=>{
    res.render("contact.html");
});

app.post('/contact.html', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(() => {
        res.send("submitted successfully !!!!");
    }).catch(() => {
        res.status(400).send("not submitted")
    });
});


app.get('/login.html', (req, res)=>{
    res.render("login.html");
});

app.post('/login.html', (req, res)=>{
    var mylogindata = new login(req.body);
    mylogindata.save().then(() => {
        res.send("submitted successfully !!!!");
    }).catch(() => {
        res.status(400).send("not submitted")
    });
});

app.listen(port, ()=>{
    console.log(`server running at ${port}`);
});