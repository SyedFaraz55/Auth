require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Auth",{useNewUrlParser:true})
.catch(err => console.log(err));

const Schema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
});


const Login = mongoose.model("Auth",Schema);

// const ret= Login.findOne({email:"syedmohi04@gmail.com"},function(err,data){
//     if(err) {
//         return err;
//     }else{
//         const log = Login({
//             username:"charles",
//             email:"charles@gmail.com",
//             password:"chars3r4"
//         });
//         log.save()
//         .then(()=>console.log('Register Successfull...'))
//         .catch(err=>console.log("User with these email address already found !"));
//     }
    
// });



module.exports = Login;

