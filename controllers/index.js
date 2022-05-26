const router = require('express').Router();

const apiRoutes = reuqire('./api');
const homeRoutes = reqire('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;