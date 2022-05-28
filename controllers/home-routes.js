const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// retrieve all blog posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_link',
            'post_title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postInfo => {
        // serialize to affect only needed property(ies)
        const posts = postInfo.map(post => post.get({ plain: true}));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// retrieve one blog post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_link',
            'post_title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'There is no post with that id in our database.  Please check your entry and try again.'});
                return;
            }
            const post = postInfo.get({ plain: true });
            
            res.render('blogpost', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (res, req) => {
    if (req.session.loggedIn) {
        res.direct('/');
        return;
    }
    res.render('login');
});

module.exports = router;