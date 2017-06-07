import { Component, OnInit } from '@angular/core';
import request from 'superagent';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  constructor() { }

  API_URL = 'http://localhost:5000/api'
  blocks = ['7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00']
  userData = JSON.parse(localStorage.getItem('token'));
  claimedBlocks = [];

  ngOnInit() {

    //Load any blocks previously claimed by the user
    request
    .get(`${this.API_URL}/blocks/${this.userData.id}`)
    .end((err, res) => {
      this.claimedBlocks = JSON.parse(res.text);
      // console.log(this.claimedBlocks)

      //Highlight claimed blocks
      this.claimedBlocks.forEach((block) => {
        var id = `${block.start_time}${block.day}`
        this.activateBlocks(id);
      })
    })
  }

  claimBlock(block, day) {
    var id = `${block}${day}`

    if(isActive(id)){
      //Remove block from active blocks
      this.claimedBlocks = this.claimedBlocks.filter((blk) => {
        if(!(blk.start_time === block && blk.day === day)){
          return true;
        }else{
          this.deactivateBlocks(id, block, day)
          return false;
        }
      })
    }else{
      this.activateBlocks(id);
      this.claimedBlocks.push({
        start_time: block,
        day: day
      });

      request
      .post(`${this.API_URL}/blocks/new/${this.userData.id}/${block}/${day}`)
      .end((err, res) => {
        console.log(res);
      })
    }
  }

  deactivateBlocks(id, block, day) {
    document.getElementById(id).style.backgroundColor = 'white';

    request
    .del(`${this.API_URL}/blocks/delete/${this.userData.id}/${block}/${day}`)
    .end((err, res) => {
      console.log(res);
    })
  }

  activateBlocks(id) {
    document.getElementById(id).style.backgroundColor = 'dodgerblue';
  }

}


//Helper Functions

function isActive(id) {
  return document.getElementById(id).style.backgroundColor === 'dodgerblue';
}
