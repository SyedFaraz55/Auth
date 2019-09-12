const Login = require('../db/db.config');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const passport = require("passport");

const Schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    password: Joi.string().required()

});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password:Joi.string().required()
});

exports.index = function (req, res) {
    res.render("home", { title: "Auth App" });
}

exports.register = function (req, res) {
    res.render("register", { title: "Registration", error: undefined, value: undefined, err: undefined });
}
exports.login = function (req, res) {
    res.render("login", { title: "Login",error:undefined,msg:""});
}
exports.dashboard = function(req,res){
    res.render('dashboard',{name:""})
}

exports.postRegister = function (req, res) {

    const postData = {
        user: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    const { user, email, password } = postData;

    bcrypt.hash(password, 10, function (err, hash) {
        Schema.validate({ username: user, email: email, password: password }, function (err, value) {

            if (err) {
                res.render('register', { title: "Registration", error: err, value: value });
            } else {
                Login.findOne({ email: email}, function (err, data) {
                    if (err) {
                        return err;
                    } else {
                        const log = Login({
                            username: user,
                            email: email,
                            password: hash
                        });
                        log.save()
                            .then(() => res.redirect('/login'))
                            .catch(err => res.render("register", { title: "Registration", error: undefined, value: undefined, err: "User with this email already exits" }));
                    }

                });
            }
        });
    });


}

exports.postLogin = function (req,res) {
    
    const loginPost = {
        email:req.body.email,
        password:req.body.password
    };
    const { email,password } = loginPost;
    loginSchema.validate({email:email,password:password},(err,value)=>{
        if(err){
            res.render("login",{title:"Login",error:err,msg:""})
        } else {
            Login.findOne({email:email},function(err,data){
                if(err){
                    console.log(err);
                } else {
                    const pass = data.password;
                    const name = data.username;
                    bcrypt.compare(password,pass,function(err,pass){
                        if(err){
                            console.log(err); //
                        } else {
                            if(pass){
                                const user_id = data.id;
                                console.log(user_id);
                                req.login(user_id,function(err){
                                    res.redirect("/dashboard");
                                });
                            } else{
                                res.render("login",{title:"Login",error:"",msg:"Please check your password !"})
                            }
                        }
                    });
                }
            });
        
        }
    });
    
}
passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });
  
  passport.deserializeUser(function(user_id, done) {
      done(null, user_id);    
  });

