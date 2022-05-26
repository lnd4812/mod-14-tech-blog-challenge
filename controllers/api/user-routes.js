const router = require('express').Router();
const { User } = require('../../models');
const { restore } = require('../../models/User');

// api routes
router.get('/', (req , res) => {
   User.findAll({
       attributes: {}
   })
   .then(dbuser => res.json(dbuser))
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   })
});

router.get('/', (req, res) => {
    User.findOne({
        attributes: { },
            where: {
                id: req.params.id
            },
            include: [
                {
                    //models
                }
            ]
        })
        .then(dbuser => {
            if (!dbuser) {
                res.status(404).json({ message: 'No user in our database with that id.  Please check your entry and try again.'});
                return;  
            }
            res.json(dbuser);
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
    .then(dbuser => {
        req.session.save(() => {
            req.session.save(() => {
                req.session.user_id = dbuser.id;
                req.session.username = dbuser.username;
                req.session.loggedIn = true;

                res.json(dbuser)
            });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});  

router.post('/login', (req, res) => {

});

router.post('/logout', (req, res) => { 

});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbuser => {
        if (!dbuser[0]) {
            res.status(404).json({ message: 'That id could not be found in our database.  Please check your entry and try again.'});
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbuser => {
        if (!dbuser) {
            res.status(404).json({ message: 'That id could not be found in our database.  Please check your entry and try again'});
            return;
        }
        res.json(dbuser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router