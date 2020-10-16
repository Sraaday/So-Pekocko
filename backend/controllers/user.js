const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');



exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email : req.body.email,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message: "Utilisateur créé"}))
            .catch(error => {
                console.log( error )
                return res.status(400).json({ error })});
        })
        .catch(error => res.status(500).json({ error }));


};

exports.login = (req, res) => {
    console.log("[controllers user.js] login")
    return res.status(200).json({texte : "ça marche "}).end();
}