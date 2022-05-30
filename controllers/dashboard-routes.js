const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
        user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_link',
            'post_title',
            'post_content',
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
            const posts = postInfo.map(post => post.get({ plain: true}));
            res.render('dashboard', { posts, loggedIn: true});
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    // find by primary key 
    Post.findbyPk(req.params.id, {
        attributes: [
            'id',
            'post_link',
            'post_title',
            'post_content',
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
            if (postInfo) {
                const post = postInfo.get({ plain: true});
                res.render('editpost', { posts, loggedIn: true});
            } else {
                res.status(404).end();
            }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

module.exports = router;