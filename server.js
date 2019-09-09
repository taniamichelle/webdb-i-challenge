const express = require('express');

const dbRouter = require('./data/db-router');

// const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', dbRouter);

module.exports = server;