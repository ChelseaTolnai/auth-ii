const router = require('express').Router();

const Users = require('../../data/models/userModels');
const routerMiddleware = require('../middleware/routerMiddleware');

router.get('/', routerMiddleware.restricted, async (req, res, next) => {
    try {
        const users = await Users.get();
        res.status(200).json({ users, decodedToken: req.decodedJwt });
    } catch (err) {
        next({code: 500, action: 'getting', subject: 'users'})
    }
});

router.use(routerMiddleware.routerError);

module.exports = router;