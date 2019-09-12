require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const uuidv1 = require('uuid/v1');
const routes = require('./routes/routes');
var session = require('express-session')
var passport = require('passport');

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public", "css")));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    genid: function (req) {
        return uuidv1() // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

    //   cookie: { secure: true } https true
}));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", routes.index);
app.get("/register", routes.register);
app.get("/login", routes.login);
app.get("/dashboard",routes.dashboard);
app.post("/register", routes.postRegister);
app.post("/login", routes.postLogin);





app.listen(PORT, () => console.log('listening to port 8000'));