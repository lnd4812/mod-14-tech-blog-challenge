const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

// to display all of a user's posts on their dashboard page - using session id to filter posts
router.get('/', withAuth, (req, res) => {
    // if (req.session) {
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
// }
});

router.get('/edit/:id', withAuth, (req, res) => {
    //  if (req.session) {
    // find by primary key limits get to specific id
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'post_title',
            'post_link',
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
            if (!postInfo) {
                res.status(404).json({ message: 'There is no post with that id in our database.  Please check your entry and try again.'});
                return;
            }
                const post = postInfo.get({ plain: true });
                res.render('edit', { post, loggedIn: true});
        })
        .catch(err => {
            res.status(500).json(err);
    });
//   }
});

module.exports = router;