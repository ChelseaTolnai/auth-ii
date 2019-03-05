const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../data/models/userModels');
const routerMiddleware = require('../middleware/routerMiddleware');
const loginToken = require('./loginToken');

router.post('/',routerMiddleware.checkUser, async (req, res) => {
    let { username, password } = req.body;

    try {
        const user = await Users.get({ username }).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = loginToken(user); 
            let { id, username, department } = user
            res.status(200).json({
                id,
                username,
                department,
                token,
                message: `Welcome ${user.username}.`
            });
        } else {
            next({code: 401, action: 'logging in', subject: 'user. Invalid Credentials'})
        }
    } catch (error) {
        next({code: 500, action: 'logging in', subject: 'user'})
    }
});

router.use(routerMiddleware.routerError);

module.exports = router;