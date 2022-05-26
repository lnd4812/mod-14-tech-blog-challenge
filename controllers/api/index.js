const router = require('express').Router();

// const variables to import routes go here
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('/comment-routes.js');

// router.use('/', xxxRoutes); go here
router.use('./users', userRoutes);
router.use('./posts', postRoutes);
router.use('./comments', commentRoutes);

module.exports = router;