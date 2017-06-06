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

  ngOnInit() {
    console.log("Landing component initialized")
  }

  login() {
    if(this.username && this.password){
    console.log(this.username, this.password)

    request
    .get(`${this.API_URL}/users/login/${this.username}/${this.password}`)
    .end((err, res) => {
      console.log(res);
    })

    }else{
      //Add other error checking and animations here
      console.log('invalid')
    }

  }

}
