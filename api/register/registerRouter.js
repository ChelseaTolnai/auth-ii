const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../data/models/userModels');

router.post('/', checkUser, async (req, res, next) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    try {
        const registeredUser = await Users.add(user);
        res.status(201).json(registeredUser);
    } catch (error) {
        next({code: 500, action: 'adding', subject: 'user. Username may already be taken'})
    }
});

router.use(routerError);

function checkUser (req, res, next) {
    if (!req.body.username || !req.body.password) {
        next({code: 400, action: 'adding', subject: 'user. Username and password required'})
        return;
    } else {
        next();
    }
};

function routerError(err, req, res, next) {
    res.status(err.code).json({ errorMessage: `Error ${err.action} the ${err.subject}.` });
};

module.exports = router;
