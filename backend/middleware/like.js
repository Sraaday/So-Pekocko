const Sauce = require('../models/sauce');

exports.like = (req,res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        switch (req.body.like) {
        case -1 :
            addDislike(req.params.id, req.body.userId, res, sauce);
            break;
        case 0 :
            removeLikeDislike(req.params.id, req.body.userId, res, sauce);
            break;
        case 1 :
            addLike(req.params.id, req.body.userId, res, sauce);
            break;
        default :
            return res.status(400).json({ error });
        }
     })
    
}

function addLike (id, userId, res, sauce) {
    if (sauce.usersLiked.find(user => user === userId)==null) {
        removeDislike(id, userId, res, sauce);
        Sauce.updateOne({ _id: id }, {
            $inc: {likes:1}, 
            $push: {usersLiked: userId}, 
            _id: id
        })
            .then(() => res.status(201).json({ message: 'Like ajouté !'}))
            .catch( error => res.status(400).json({ error }))
    }
}

function addDislike (id, userId, res, sauce) {
    if (sauce.usersDisliked.find(user => user === userId)==null) {
        removeLike(id, userId, res, sauce);
        Sauce.updateOne({ _id: id }, {
            $inc: {dislikes:1},
            $push: {usersDisliked: userId},
            _id: id
        })
            .then(() => res.status(201).json({ message: 'Dislike ajouté !'}))
            .catch( error => res.status(400).json({ error }))
    }
}

function removeLikeDislike (id, userId, res, sauce) {
    removeDislike(id, userId, res, sauce);
    removeLike(id, userId, res, sauce);

}

function removeDislike (id, userId, res, sauce) {
    if (sauce.usersDisliked.find(user => user === userId)) {
        Sauce.updateOne({ _id: id }, {
            $inc: {dislikes:-1},
            $pull: {usersDisliked: userId},
            _id: id
        })
            .then(() => res.status(201).json({ message: 'Dislike enlevé !'}))
            .catch( error => res.status(400).json({ error }))
    }
}
     
    
function removeLike (id, userId, res, sauce) {
    if (sauce.usersLiked.find(user => user === userId)) {
        Sauce.updateOne({ _id: id }, {
            $inc: {likes:-1},
            $pull: {usersLiked: userId},
            _id: id
        })
            .then(() => res.status(201).json({ message: 'Like enlevé !'}))
            .catch( error => res.status(400).json({ error }))
    }
}

    

    
