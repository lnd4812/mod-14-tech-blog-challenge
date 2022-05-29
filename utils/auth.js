const withAuth = (req, res, next) => {
    // "gatekeeper" function redirecting any user not logged in to login or create new account on the dashboard
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;