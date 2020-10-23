const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String , required: true},
    likes: {type: Number},
});

module.exports = mongoose.model('sauce', sauceSchema);