const router = require('express').Router();

// const variables to import routes 
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// create api connections for the blog models
router.use('./users', userRoutes);
router.use('./posts', postRoutes);
router.use('./comments', commentRoutes);

module.exports = router;