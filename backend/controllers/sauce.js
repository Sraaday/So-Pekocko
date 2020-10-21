const Sauce = require('../models/sauce');
const fs = require('fs');
const { Console } = require('console');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject)
    delete sauceObject._id;
    console.log(sauceObject)
    
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes : 0,
      dislikes : 0
    });
    console.log(sauce)
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ message: 'ça marche paaaaas !' }));
  };