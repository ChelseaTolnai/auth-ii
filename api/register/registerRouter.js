const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../../data/models/userModels');
const routerMiddleware = require('../middleware/routerMiddleware');

router.post('/', routerMiddleware.checkUser, async (req, res, next) => {
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

router.use(routerMiddleware.routerError);

module.exports = router;
