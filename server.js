const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const loginRouter = require('./api/login/loginRouter');
const registerRouter = require('./api/register/registerRouter');
const usersRouter = require('./api/users/usersRouter');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);
server.use('/api/users', usersRouter);

module.exports = server;