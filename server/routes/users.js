//Dependancies
const express = require('express');
const router = express.Router();

const knex = require('../knex');

//Middleware
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const bcrypt = require('bcrypt');

//Routes

//Post new user
router.post('/users/new', (req, res) => {
  var {name, email, password, profileUrl} = req.body;

  var passwordHash = bcrypt.hashSync(password, 10)

  var newUser = {
    name,
    email,
    password: passwordHash,
    profileUrl
  }

  knex('users')
  .where('email', req.body.email)
  .then((dataCheck) => {
    //Check to see if email already exists
    if(dataCheck.length > 0){
      console.log('user already found');
      res.send('An account using that email already exists')
    }else{
      console.log('Creating new account');
      //Insert new user into the database
      // TODO: Further checking needed for production build
      knex('users')
      .insert(newUser, "*")
      .then((userData) => {
        res.send(userData[0])
      })
    }
  })
})


module.exports = router;
