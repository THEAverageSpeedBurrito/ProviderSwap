import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  userData = JSON.parse(localStorage.getItem('token'));
  section = 0;

  ngOnInit() {
    console.log(this.userData);
  }

  setSection(section) {
    this.section = section
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

}
