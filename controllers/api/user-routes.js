const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// api end points
router.get('/', (req , res) => {
   User.findAll({
       attributes: { exclude: ['password']}
    })
        .then(userInfo => res.json(userInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                   model: Post,
                   attributes: ['id', 'post_title', 'post_link', 'post_content', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['post_title']
                    }
                }
            ]
        })
            .then(userInfo => {
                if (!userInfo) {
                    res.status(404).json({ message: 'No user in our database with that id.  Please check your entry and try again.'});
                    return;  
                }
                res.json(userInfo);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
        });
});    

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(userInfo => {
            
            req.session.save(() => {
                req.session.user_id = userInfo.id;
                req.session.username = userInfo.username;
                req.session.loggedIn = true;

                res.json(userInfo);
            });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});  

// login, check password, save user input
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(userInfo => {
            if (!userInfo) {
                res.status(400).json({ message: "That username was not found; please check your entry and try again!"});
                return;
        }

        const passwordOkay = userInfo.checkPassword(req.body.password);

        if (!passwordOkay) {
            res.status(400).json({ message: 'Invalid password.  Please check your entry and try again.'});
            return;
        }
       
        req.session.save(() => {
            req.session.user_id = userInfo.id;
            req.session.username = userInfo.username;
            req.session.loggedIn = true;

            res.json({ user: userInfo });
        });
    })
});

router.post('/logout', (req, res) => { 
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// update user info
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true, // only the parameter needing change is passed through function
        where: {
            id: req.params.id  
        }
    })
        .then(userInfo => {
            if (!userInfo[0]) {
                res.status(404).json({ message: 'That id could not be found in our database.  Please check your entry and try again.'});
                return;
            }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

// enable user to remove account
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userInfo => {
            if (!userInfo) {
                res.status(404).json({ message: 'That id could not be found in our database.  Please check your entry and try again'});
                return;
            }
            res.json(userInfo);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

module.exports = router;