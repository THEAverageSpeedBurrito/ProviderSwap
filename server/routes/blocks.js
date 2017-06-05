//Dependancies
const express = require('express');
const router = express.Router();

const knex = require('../knex');

//Middleware
const bodyParser = require('body-parser')
router.use(bodyParser.json());

//routes

//Claim a new block
router.post('/blocks/new', (req, res) => {

  var newBlock = {
    user_id: req.body.userId,
    start_time: req.body.startTime
  }

  knex('blocks')
  .insert(newBlock, '*')
  .then((response) => {
    console.log('User added a new block to their schedule');
    res.send(response);
  })

})

//Get all blocks associated with user
router.get('/blocks/:id', (req, res) => {
  var id = req.params.id

  knex('blocks')
  .where('user_id', id)
  .then((blocks) => {
    console.log('Getting blocks for user with id', id);
    res.send(blocks);
  })
})

module.exports = router;
