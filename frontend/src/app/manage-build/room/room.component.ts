import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from '../../setting-user/FilterPipe.component';
import { OrderPipe } from 'ngx-order-pipe';
import { build$ } from 'protractor/built/element';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  searchString = ""
  submitted = false
  checkG
  getLogin
  data: any[]
  manageBuild: FormGroup
  arrayDeleteCheck = ""
  dataDelete: Array<String> = [];
  p
  lenghtData: Number
  checkData = false
  dataOtShow = 5
  otShow = []
  sortedCollection: any[];
  constructor(private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder, private title: Title, private spinner: NgxSpinnerService, private orderPipe: OrderPipe) {
    this.title.setTitle("จัดการห้อง")
  }
  get f() { return this.manageBuild.controls; }
  ngOnInit() {
    this.check(), this.onClickAdmin(), this.showSpinner(), this.getTable(), this.getBuild(),
      this.manageBuild = this.formBuilder.group({
        build: ['', Validators.required],
        room: ['', Validators.required],
        sit: ['', Validators.required],
        col: ['', Validators.required],
        row: ['', Validators.required],
      })
  }
  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    this.checkG = check
    this.getLogin = getLogin
    window.onload = function () {
    }
  }
  showSpinner() {
    if (this.checkData == false) {
      this.spinner.show();
    }
    else if (this.checkData == true) {

      /** spinner ends after 5 seconds */
      this.spinner.hide();

    }

  }
  onClear() {
    console.log("clear")
    this.submitted = false
    this.manageBuild.get('build').setValue("");
    this.manageBuild.get('room').setValue("");
    this.manageBuild.get('sit').setValue("");
    this.manageBuild.get('row').setValue("");
    this.manageBuild.get('col').setValue("");
    this.disableSBuild = true
    this.allowAlertAdd = false
    this.dataDelete = []
    this.objBuild = undefined
    this.objBuildBefore = undefined
  }

  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่" || this.checkG === "เจ้าหน้าที่,คนคุมสอบ") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการห้อง"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  allowAlertAdd = false
  getTable() {
    this.http.get<any>('http://localhost:4001/room').subscribe(result => {
      this.data = result.data
      this.sortedCollection = this.orderPipe.transform(this.data, '');
      this.lenghtData = this.sortedCollection.length
      this.otShow = [{
        number: 5,
      },
      {
        number: 10
      },
      {
        number: 20,
      },
      {
        number: 50,
      },
      {
        number: this.lenghtData,
      }]
      this.checkData = true;
      this.showSpinner()
    })
  }
  isNotNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 33 || charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123 || charCode > 126))
      return true;
    return false;
  }
  onSubmit() {
    this.submitted = true;
    if (this.manageBuild.invalid) {
      return;
    }
    var time = ["8.00",
      "9.00",
      "10.00",
      "11.00",
      "12.00",
      "13.00",
      "14.00",
      "15.00",
      "16.00",
      "17.00",
      "18.00",
      "19.00",
      "20.00"]
    var obj = {
      build: this.manageBuild.value.build, room: this.manageBuild.value.room,
      sit: this.manageBuild.value.sit, time: time, col: this.manageBuild.value.col,
      row: this.manageBuild.value.row
    }
    this.http.post<any>('http://localhost:4001/room', obj).subscribe((res) => {
      if (res.status === true) {
        document.getElementById("closeModalInsert").click();
        this.getTable()
      } else {
        this.allowAlertAdd = true
        setTimeout(() => {
          this.allowAlertAdd = false
        }, 3000);
      }

    })
  }

  onSetData(event, _id: string, i) {
    if (event.target.checked) {
      this.arrayDeleteCheck = event.target.value
      this.dataDelete.push(this.arrayDeleteCheck)
      console.log(this.dataDelete)
    } else {
      var array = this.dataDelete
      var index = array.indexOf(event.target.value)
      if (index !== -1) {
        array.splice(index, 1)
        this.dataDelete = array
      }
    }
  }
  objBuild
  checkBuildAmong
  allowAlertDelete = false
  onClickDelete() {
    // var r = confirm("กดokเพื่อลบข้อมูล");
    // if (r == true) {
    //   if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
    //     var _id = { _id: this.dataDelete }

    //   }
    //   if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
    //     alert("กรุณาเลือกข้อมูลที่จะลบ")
    //   }
    // }

    if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
      this.allowAlertDelete = true
      setTimeout(() => {
        this.allowAlertDelete = false
      }, 3000);
      this.http.post('http://localhost:4001/roomDelete', this.dataDelete).subscribe((res) => {
        document.getElementById("closeModalDelete").click();
        this.getTable()
        this.dataDelete = []
      })
    }
    if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
      this.allowAlertDeleteFail = true
      setTimeout(() => {
        this.allowAlertDeleteFail = false
      }, 3000);
    }


  }
  allowAlertDeleteFail = false
  _id
  monday = []
  tuesday = []
  wednesday = []
  thursday = []
  friday = []
  saterday = []
  sunday = []
  build = ""
  onClickEdit(_id: String, build: string, room: string, sit: string, row: number, col: number, m, t, w, th, f, s, su) {
    this.manageBuild.get('build').setValue(build);
    this.manageBuild.get('room').setValue(room);
    this.manageBuild.get('sit').setValue(sit)
    this.monday = m
    this.tuesday = t
    this.wednesday = w
    this.thursday = th
    this.friday = f
    this.saterday = s
    this.sunday = su
    console.log(this.manageBuild.value)
    this.manageBuild.get('row').setValue(row)
    this.manageBuild.get('col').setValue(col)
    this._id = _id
    this.checkBuildAmong = build
    this.build = this.manageBuild.value.build
    console.log(this.build)
    // console.log(this.manageBuild.value.build)
  }
  allowAlertEdit = false
  Edit() {
    this.submitted = true;
    if (this.manageBuild.invalid) {
      return;
    }


    var obj = {
      _id: this._id, build: this.manageBuild.value.build, room: this.manageBuild.value.room,
      sit: this.manageBuild.value.sit, mon: this.monday, tue: this.tuesday,
      wed: this.wednesday, thu: this.thursday, fri: this.friday,
      sat: this.saterday, sun: this.sunday, row: this.manageBuild.value.row, col: this.manageBuild.value.col
    }
    console.log(this.objBuild)
    console.log(this.objBuildBefore)
    var oo = [this.objBuild, this.objBuildBefore]
    this.http.patch<any>('http://localhost:4001/roomUpdate/', obj).subscribe((res) => {
      if (this.objBuild != undefined) {
        this.http.patch<any>('http://localhost:4001/buildUpdate/', this.objBuild).subscribe((res) => {
        })
      }
      if (res.status == true) {
        this.http.patch<any>('http://localhost:4001/buildUpdate/', this.objBuildBefore).subscribe((res) => {
        })
      }
      this.objBuild = undefined
      this.objBuildBefore = undefined
      this.allowAlertEdit = true
      setTimeout(() => {
        this.allowAlertEdit = false
        this.getTable()
        document.getElementById("closeModalEdit").click();
        this.onClear()
      }, 1000);
    })
  }
  dataBuild: any[]

  getBuild() {
    this.http.get<any>('http://localhost:4001/build').subscribe(result => {
      this.dataBuild = result.data
      this.checkData = true;
      this.showSpinner()
    })
  }
  objBuildBefore
  disableSBuild = true
  changeBuild() {
    for (let i of this.dataBuild) {
      if (i.name == this.manageBuild.value.build) {
        if (this.manageBuild.value.build != this.checkBuildAmong) {
          this.objBuild = { _id: i._id, name: i.name, amongRoom: +i.amongRoom - 1 }
        } else {
          this.objBuild = { _id: i._id, name: i.name, amongRoom: i.amongRoom }
        }
      }
      if (i.name == this.build) {
        this.objBuildBefore = { _id: i._id, name: i.name, amongRoom: +i.amongRoom + 1 }
      }
    }
    this.disableSBuild = false
  }

  notText(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }
}
