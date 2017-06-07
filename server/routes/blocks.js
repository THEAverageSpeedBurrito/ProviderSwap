//Dependancies
const express = require('express');
const router = express.Router();

const knex = require('../knex');

//Middleware
const bodyParser = require('body-parser')
router.use(bodyParser.json());

//routes

//Claim a new block
router.post('/blocks/new/:id/:start/:day', (req, res) => {

  var newBlock = {
    user_id: req.params.id,
    start_time: req.params.start,
    day: req.params.day
  }
  console.log(newBlock);

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

//Delete single blocks
router.delete('/blocks/delete/:user_id/:start/:day', (req, res) => {
  var {user_id, start, day} = req.params;
  console.log(req.params);

  knex('blocks')
  .where({
    user_id: user_id,
    start_time: start,
    day: day
  })
  .del()
  .then(() => {
    console.log('Block Deleted')
    res.send('Block Deleted')
  })
})

module.exports = router;
