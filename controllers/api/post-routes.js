const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, User, Comment } = require('../../models');

// retrieve all blogs/bloggers
router.get('/', (req, res) => {
    Post.findAll({
        attributes:[
            'id',
            'post_title',
            'post_link',
            'post_content',
            'created_at'
        ],
        // in date order
        order: [['created_at', 'DESC']],
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
        .then(postInfo => res.json(postInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

// retrieve a specific post by id
router.get('/:id', (req, res) => {
    if (req.session) {
    Post.findOne({
        where: {
            id: req.params.id
        },
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
                res.status(404).json({ message: 'There is no post with that id.  Please check your entry and try again.'});
                return;
            }
            res.render(postInfo);
            // const post = postInfo.get({ plain: true });
            // res.render('post', { post, loggedIn: true});

        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
   }
});

// create a new post
router.post('/', withAuth, (req, res) => {
    if (req.session.user_id) {
        Post.create({
            post_title: req.body.post_title,
            post_link: req.body.post_link,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        })
            .then(postInfo => res.json(postInfo))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
        });
    }
});

// update a post
router.put('/edit/:id', withAuth, (req, res) => {
    if (req.session.user_id) {
        Post.update(
            {
                post_title: req.body.post_title,
                post_content: req.body.post_content
            },
            { 
                where: {
                    id: req.params.id
                },
            })
            .then(postInfo => { 
                if (!postInfo) {
                    res.status(404).json({ message: 'There is no post with that id.  Please check your entry and try again.'});
                    return;
                }
                res.json(postInfo);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// delete post
router.delete('/:id', withAuth, (req, res) => {
    if (req.session.user_id) {
        Post.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(postInfo => {
                if (!postInfo) {
                    res.status(404).json({ message: 'There is no post with that id.  Please check your entry and try again'});
                    return;
                }
                res.json(postInfo);
        })
            .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

module.exports = router;