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

exports.lookFor = function(user,email,password){
    Login.findOne({email:email},function(err,data){
        if(err) {
            return err;
        }else{
            const log = Login({
                username:user,
                email:email,
                password:password
            });
            log.save()
            .then(()=> {return true})
            .catch(err=>{return false});
        }
        
    });
}



module.exports = Login;


