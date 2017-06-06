//Dependancies
const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//Middleware

//Routes

//Post new user
router.post('/users/new', (req, res) => {
  var {name, username, password, profileImg} = req.body;

  var passwordHash = bcrypt.hashSync(password, 10)

  var newUser = {
    name,
    username,
    password: passwordHash,
    profile_img: profileImg
  }

  knex('users')
  .where('username', req.body.username)
  .then((dataCheck) => {
    //Check to see if user already exists
    if(dataCheck.length > 0){
      console.log('user already found');
      res.send('An account with that username already exists')
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

//Login/get existing user
router.get('/users/login/:username/:password', (req, res) => {
  var {username, password} = req.params;
  console.log(username, password);

  if(username && password) {
    //Get users hashed password
    knex('users')
    .where('username', username)
    .then((userData) => {
      if(userData.length > 0) {
        userData = userData[0];

        //compare passwords
        if(bcrypt.compareSync(password, userData.password)){
          var localData = {
            id: userData.id,
            username: userData.username,
            password: userData.password,
            profileImg: userData.profile_img
          }
          res.send(localData);
        }else{
          res.status(401).send('incorrect password')
        }
      }else{
        //Response if no user
        res.status(401).send('No user with that email found')
      }
    })
  }else{
    res.send('Incorrect login credentials')
  }
})



module.exports = router;
