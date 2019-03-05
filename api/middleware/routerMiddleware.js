module.exports = {
    checkUser: function(req, res, next) {
        if (!req.body.username || !req.body.password) {
            next({code: 400, action: 'adding', subject: 'user. Username and password required'})
            return;
        } else {
            next();
        }
    },
    routerError: function(err, req, res, next) {
        res.status(err.code).json({ errorMessage: `Error ${err.action} the ${err.subject}.` });
    },
}