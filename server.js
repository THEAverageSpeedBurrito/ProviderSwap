const express = require('express');
const server = express();

const port = process.env.PORT || 5000;

const users = require('./server/routes/users');
// const blocks = require('./server/routes/blocks');
// const shifts = require('./server/routes/shifts');

server.use('/api', users);
// server.use('/api', blocks);
// server.use('/api', shifts);

server.get('/test', (req, res) => {
  res.send('server responding');
})

server.listen(port, () => {
  console.log('Listening on port', port);
})
