const jwt = require('jsonwebtoken'); 
const secrets = process.env.JWT_SECRET;

module.exports = {

    restricted: function(req, res, next) {
        const token = req.headers.authorization;
    
        if(token) {
            jwt.verify(token, secrets, (err, decodedToken) => {
                if(err) {
                    next({code: 401, action: 'accessing', subject: 'endpoint. You shall not pass'})
                } else {
                    req.decodedJwt = decodedToken;
                    next();
                }
            })
        } else {
            next({code: 401, action: 'accessing', subject: 'endpoint. You shall not pass'})
        }
    },
        
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