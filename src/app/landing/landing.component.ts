import { Component, OnInit } from '@angular/core';
import request from 'superagent';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {

  constructor() {}

  API_URL = 'http://localhost:5000/api'
  username = ""
  password = ""
  register = false;
  registerData = {
    name: '',
    username: '',
    password: ''
  }

  ngOnInit() {
    console.log("Landing component initialized")

    if(localStorage.getItem('token')){
      var token = localStorage.getItem('token')
      window.location.href = '/dashboard'
    }
  }

  login() {
    if(this.username && this.password){

    request
    .get(`${this.API_URL}/users/login/${this.username}/${this.password}`)
    .end((err, res) => {
      if(res.statusCode === 200){
        localStorage.setItem('token', res.text)
        window.location.href = '/dashboard'
      }else{
        //Handle bad request here
      }
    })

    }else{
      //Add other error checking and animations here
      console.log('invalid')
    }

  }

  submitRegister() {
    var {name, username, password} = this.registerData

    if(name != '' && username != '' && password != ''){
      //Post a new user
      request
      .post(`${this.API_URL}/users/new`)
      .send({
        name,
        username,
        password
      })
      .then((res) => {
        localStorage.setItem('token', res.text)
        window.location.href = '/dashboard'
      })
    }else{
      console.log('Fill out required fields')
    }
  }

}
