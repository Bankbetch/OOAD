import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private title: Title) {
    this.title.setTitle("เจ้าหน้าที่")
  }
  getLogin = ""
  checkG = ""
  ngOnInit() {
    this.check(), this.checkLogin()
  }
  checkLogin() {

    if (this.getLogin !== "true") {
      this.router.navigate(["/"])
    } else if (this.checkG !== "เจ้าหน้าที่" && this.checkG !== "เจ้าหน้าที่,คนคุมสอบ") {
      console.log(this.checkG)
      this.router.navigate(["/หน้าหลัก"])
    }
    else {
      this.router.navigate(["/เจ้าหน้าที่"])
    }
  }
  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    this.checkG = check
    this.getLogin = getLogin
    window.onload = function () {
    }
  }
}
