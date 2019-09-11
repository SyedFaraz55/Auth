require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const routes = require('./routes/routes');
const PORT = process.env.PORT || 8000;


app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public","css")));



app.get("/",routes.index);
app.get("/register",routes.register);
app.get("/login",routes.login);
app.post("/register",routes.postRegister);





app.listen(PORT,()=>console.log('listening to port 8000'));