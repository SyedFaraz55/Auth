const Login = require('../db/db.config');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const Schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    password: Joi.string().required()

});

exports.index = function (req, res) {
    res.render("home", { title: "Auth App" });
}

exports.register = function (req, res) {
    res.render("register", { title: "Registration", error: undefined, value: undefined, err: undefined });
}
exports.login = function (req, res) {
    res.render("login", { title: "Login" });
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

