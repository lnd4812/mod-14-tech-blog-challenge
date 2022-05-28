const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentInfo => res.json(commentInfo))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    // limit comments to only logged in users
    if (req.session) {
        Comment.create({
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(commentInfo => res.json(commentInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentInfo => {
        if(!commentInfo) {
            res.status(404).json({ message: 'That id does not match any in our database. Please check your entry and try again'});
            return;
        }
        res.json(commentInfo);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;