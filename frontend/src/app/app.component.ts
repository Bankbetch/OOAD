import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public now: Date = new Date();
  disableMenuStaff = false
  disableMenuTeacher = false
  disableMenuStudent = false
  disableMenuProctor = false
  getLogin = ""
  checkG = ""
  name = ""
  surname = ""
  checknavBarAdmin = false
  checkNavbarAdminManageUser = false
  checkNavbarAdminManageExcame = false
  checkNavbarAdminManagPersonalExcame = false
  checkNavbarAdminManageExcameNisit = false
  checkNavbarAdminManageRoom = false
  checkNavbarAdminBuild = false
  getStatusNoPageLogin = "false"
  navbarLogin = true
  year

  ngOnInit(): void {
    this.check(),
    this.year = ((new Date()).getFullYear())+543;

  }
  ngDoCheck() {
    this.check()
  }
  constructor(private router: Router) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  checkType() {
    if (this.checkG === "นิสิต") {
      this.disableMenuStudent = true;
    } else if (this.checkG === "นิสิต,คนคุมสอบ") {
      this.disableMenuStudent = true;
      this.disableMenuProctor = true;
    } else if (this.checkG === "อาจารย์") {
      this.disableMenuTeacher = true;
    } else if (this.checkG === "อาจารย์,คนคุมสอบ") {
      this.disableMenuTeacher = true;
      this.disableMenuProctor = true;
    } else if (this.checkG === "คนคุมสอบ") {
      this.disableMenuProctor = true;
    } else if (this.checkG === "เจ้าหน้าที่") {
      this.disableMenuStaff = true;
    } else if (this.checkG === "เจ้าหน้าที่,คนคุมสอบ") {
      this.disableMenuStaff = true;
      this.disableMenuProctor = true;
    }
  }

  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    var getUsername = localStorage.getItem("getName")
    var getSurname = localStorage.getItem("getSurname")
    var checknavBarAdmin = localStorage.getItem("checknavBarAdmin")
    var checkNavbarAdminManageUser = localStorage.getItem("checkNavbarAdminManageUser")
    var checkNavbarAdminManageExcame = localStorage.getItem("checkNavbarAdminManageExcame")
    var checkNavbarAdminManagPersonalExcame = localStorage.getItem("checkNavbarAdminManagPersonalExcame")
    var checkNavbarAdminManageExcameNisit = localStorage.getItem("checkNavbarAdminManageExcameNisit")
    var checkNavbarAdminManageRoom = localStorage.getItem("checkNavbarAdminManageRoom")
    var getStatusNoPageLogin = localStorage.getItem("setStatusNoPageLogin")
    var checkNavbarAdminBuild = localStorage.getItem("checkNavbarAdminBuild")
    this.checkG = check
    this.getLogin = getLogin
    this.name = getUsername
    this.surname = getSurname
    this.getStatusNoPageLogin = getStatusNoPageLogin
    if (checkNavbarAdminBuild == "true" && checknavBarAdmin == "true" && checkNavbarAdminManageUser == "true" && checkNavbarAdminManageExcame == "true" && checkNavbarAdminManagPersonalExcame == "true" && checkNavbarAdminManageExcameNisit == "true" && checkNavbarAdminManageRoom == "true") {
      this.checknavBarAdmin = true
      this.checkNavbarAdminManageUser = true
      this.checkNavbarAdminManageExcame = true
      this.checkNavbarAdminManagPersonalExcame = true
      this.checkNavbarAdminManageExcameNisit = true
      this.checkNavbarAdminManageRoom = true
      this.checkNavbarAdminBuild = true
      this.navbarLogin = true
      this.checkType()
    } if (this.name != "") {
      this.navbarLogin = true
      this.checkType()
    }
    else {
      this.checkType()
      this.checknavBarAdmin = false
      this.checkNavbarAdminManageUser = false
      this.checkNavbarAdminManageExcame = false
      this.checkNavbarAdminManagPersonalExcame = false
      this.checkNavbarAdminManageExcameNisit = false
      this.checkNavbarAdminManageRoom = false
      this.checkNavbarAdminBuild = false
      this.navbarLogin = false
      this.disableMenuStaff = false
      this.disableMenuTeacher = false
      this.disableMenuStudent = false
      this.disableMenuProctor = false
    }
    window.onload = function () {
    }
  }
  OnClickLogout() {
    this.name = "Username"
    localStorage.setItem("getName", "")
    this.surname = ""
    localStorage.setItem("getSurname", "")
    localStorage.setItem("check", "")
    localStorage.setItem("setLogin", "")
    localStorage.setItem("checknavBarAdmin", "false")
    localStorage.setItem("checkNavbarAdminManageUser", "false")
    localStorage.setItem("checknavBarAdmin", "false")
    localStorage.setItem("checkNavbarAdminManageExcame", "false")
    localStorage.setItem("checkNavbarAdminManageExcame", "false")
    localStorage.setItem("checkNavbarAdminManagPersonalExcame", "false")
    localStorage.setItem("checkNavbarAdminManageRoom", "false")
    localStorage.setItem("setStatusNoPageLogin", "false")
    localStorage.setItem("checkNavbarAdminBuild", "false")
    this.router.navigate(["/"])
    this.navbarLogin = true

  }
}
