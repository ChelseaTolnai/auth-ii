const express = require('express');

const serverMiddleware = require('./middleware/serverMiddleware')
const loginRouter = require('./login/loginRouter');
const registerRouter = require('./register/registerRouter');
const usersRouter = require('./users/usersRouter');

const server = express();

serverMiddleware(server);

server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);
server.use('/api/users', usersRouter);

module.exports = server;