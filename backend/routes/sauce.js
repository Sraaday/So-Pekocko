const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const like = require('../middleware/like');

const sauceCtrl = require('../controllers/sauce');


// Toutes les routes concernants les sauces sont sécurisées via auth et les images sont gérées grâce à multer
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/',auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);  
router.post('/:id/like', auth, like.like);

module.exports = router;