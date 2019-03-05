const jwt = require('jsonwebtoken'); 

const secrets = process.env.JWT_SECRET

function loginToken(user) {
    const payload = {
        subject: user.id, 
        username: user.username,
    }

    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, secrets, options);
}

module.exports = loginToken;