import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from '../setting-user/FilterPipe.component';
import { OrderPipe } from 'ngx-order-pipe';
import * as XLSX from 'xlsx';
import { Md5 } from 'ts-md5/dist/md5';
import { ExcelService } from './excel.service';
var md52 = require('md5');

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.css']
})
export class ManageExamComponent implements OnInit {

  checkG = "false"
  getLogin = "false"
  searchString
  submitted = false;
  addIncres: FormGroup;
  insert: FormGroup
  p
  dataOtShow = 5
  otShow = []
  term = []
  getRoom: any[]
  lenghtData: Number
  spliteBuild = []
  dataSpliteBuild
  dataTeacher: any[]
  checkData = false
  sortedCollection: any[];
  ArrayStudent = []
  constructor(private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder, private title: Title,
    private spinner: NgxSpinnerService, private orderPipe: OrderPipe,
    private excelService: ExcelService) {
    this.title.setTitle("จัดการวิชา")
  }
  dataRoom: any[]
  dataSubject: any[]
  dataSubjectLearn: any[]
  selectedItems = [];
  dropdownSettings = {};
  public ngOnInit() {
    this.check(), this.onClickAdmin(), this.getBuilding(), this.getSubject(), this.getSubjectLearn()
    this.addIncres = this.formBuilder.group({
      id: ['', Validators.required],
      nameSubject: ['', Validators.required],
      nameTeacher: ['', Validators.required],
      build: ['', Validators.required],
      room: ['', Validators.required],
      day: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      faculty: ['', Validators.required],
      credit: ['', Validators.required],
      term: ['', Validators.required],
      year: ['', Validators.required],
      sit: ['', Validators.required],
      checkType: ['', Validators.required]
    }), this.onGetTable(), this.showSpinner(), this.addIncres.get('sit').setValue("0"),
      this.insert = this.formBuilder.group({
        id: ['', Validators.required],
        nameSubject: ['', Validators.required],
        nameTeacher: ['', Validators.required],
        faculty: ['', Validators.required],
        credit: ['', Validators.required],
        term: ['', Validators.required],
        year: ['', Validators.required],
        sit: ['', Validators.required],
      })
  }
  setSelectTeacher = []
  onItemSelect(items: any) {
    // this.addIncres.get('nameTeacher').setValue(this.selectedItems)
    // var data = items
    // var arr = []
    // // console.log(data)
    // arr.push(items)
    // this.setSelectTeacher.push(arr[0].item_text)

    // const newArray = this.setSelectTeacher.filter((elem, i, arr) => {
    //   if (arr.indexOf(elem) === i) {
    //     return elem
    //   }
    // })

    // this.setSelectTeacher = newArray

    // console.log(this.addIncres.value.nameTeacher[0].item_text)
    // console.log(this.addIncres.value.nameTeacher)
  }
  // onSelectAll(items: any) {
  //   var arr = []
  //   for (let item of items) {
  //     arr.push(item.item_text)
  //   }
  //   this.addIncres.get('nameTeacher').setValue(arr)
  //   console.log(this.addIncres.value.nameTeacher)
  // }
  get f() { return this.addIncres.controls; }
  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    this.checkG = check
    this.getLogin = getLogin

  }
  aa = []
  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่" || this.checkG === "เจ้าหน้าที่,คนคุมสอบ") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการวิชา"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  timeStartO = []
  getBuilding() {
    this.http.get<any>('http://localhost:4001/room').subscribe(result => {
      this.dataRoom = result.data
      var year = (new Date()).getFullYear()
      this.addIncres.get('year').setValue(year)
      this.term = [
        { name: "ภาคการศึกษาต้น" }, { name: "ภาคการศึกษาปลาย" }, { name: "ภาคฤดูร้อน" }
      ]
      for (let item of this.dataRoom) {
        this.spliteBuild.push(item.build)
      }
      var count = 1
      const newArray = this.spliteBuild.filter((elem, i, arr) => {
        if (arr.indexOf(elem) === i) {
          return elem
        }
      })
      this.dataSpliteBuild = newArray

    })
  }
  onClickInsertBuild() {
    this.router.navigate(['/เจ้าหน้าที่/จัดการตึก'])
  }
  onClickInsertTest() {
    localStorage.setItem('clickTest', 'true')
    this.router.navigate(['/เจ้าหน้าที่/จัดการการสอบ'])
  }
  allowAlertInsert = false
  allowAlertInsertFail = false

  onSubmit() {
    this.addIncres.get('checkType').setValue(this.addIncres.value.nameTeacher)
    console.log(this.addIncres.value.nameTeacher)
    this.submitted = true;
    if (this.addIncres.invalid) {
      return;
    }
    var arr = []
    var getArr = []
    arr = this.addIncres.value.nameTeacher
    for (let item of arr) {
      getArr.push(item.item_text)
    }
    var obj = {
      id: this.addIncres.value.id, name: this.addIncres.value.nameSubject, teacher:
        getArr, build: this.addIncres.value.build, room:
        this.addIncres.value.room, day: this.addIncres.value.day, timeStart: this.addIncres.value.timeStart,
      timeEnd: this.addIncres.value.timeEnd, faculty: this.addIncres.value.faculty, unit: this.addIncres.value.credit,
      term: this.addIncres.value.term, year: this.addIncres.value.year, sit: this.addIncres.value.sit
    }

    this.http.post<any>('http://localhost:4001/learns', obj).subscribe(result => {
      console.log(obj)
      if (result.status == true) {
        this.allowAlertInsert = true
        setTimeout(() => {
          this.allowAlertInsert = false
        }, 5000);
        document.getElementById("closeModalInsert").click();
        this.getSubjectLearn()
        this.onClickClear()
      } else {
        this.allowAlertInsertFail = true
        setTimeout(() => {
          this.allowAlertInsertFail = false
        }, 5000);
      }

    })

  }
  dataTeacherAfterGet: any[]
  ArrSit = []
  getSubjectLearn() {
    this.http.get<any>('http://localhost:4001/learns').subscribe(result => {
      this.dataSubjectLearn = result.data

      // for (let item of this.dataSubjectLearn) {
      //   console.log(item.sit)
      // }
      this.sortedCollection = this.orderPipe.transform(this.dataSubjectLearn, '');
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
    })
    this.disableBtnExcel = true
  }


  getSubject() {
    this.http.get<any>('http://localhost:4001/subject').subscribe(result => {
      this.dataSubject = result.data
    })
  }
  checkselect = true
  checkIdAndSub() {
    if (this.addIncres.value.id) {
      for (let item of this.dataSubject) {
        if (this.addIncres.value.id === item.id) {
          this.addIncres.get('nameSubject').setValue(item.name)
          this.addIncres.get('faculty').setValue(item.faculty)
          this.addIncres.get('credit').setValue(item.unit)
        }
      }
    }

  }
  checkNameSub() {
    if (this.addIncres.value.nameSubject) {
      for (let item of this.dataSubject) {
        if (this.addIncres.value.nameSubject === item.name) {
          this.addIncres.get('id').setValue(item.id)
          this.addIncres.get('faculty').setValue(item.faculty)
          this.addIncres.get('credit').setValue(item.unit)
        }
      }
    }
  }
  setDataRoom = []
  setDataRoomAfter = []
  hideEditRoom = false
  hideEditRoominput = true
  hideEditEndInput = true
  checkRoom() {
    this.addIncres.get('room').setValue("")
    if (this.addIncres.value.build) {
      for (let item of this.dataRoom) {
        if (this.addIncres.value.build === item.build) {
          console.log(this.sit + " _ArrayStudent_ " + item.sit)
          if (this.sit <= item.sit) {
            this.setDataRoom.push(item.room)
          }
          else if (this.ArrayStudent.length <= item.sit && this.ArrayStudent.length != 0) {
            this.setDataRoom.push(item.room)
          }
        }

        const newArray = this.setDataRoom.filter((elem, i, arr) => {
          if (arr.indexOf(elem) === i) {
            return elem
          }
        })

        this.hideEditRoom = true
        this.hideEditRoominput = false
        this.setDataRoom = newArray
        this.setDataRoomAfter = this.setDataRoom
      }

      if (this.setDataRoom != []) {
        this.setDataRoom = []
      }
    }
  }

  checkRoomInsert() {
    this.addIncres.get('room').setValue("")
    if (this.addIncres.value.build) {
      for (let item of this.dataRoom) {
        if (this.addIncres.value.build === item.build) {
          this.setDataRoom.push(item.room)
        }

        const newArray = this.setDataRoom.filter((elem, i, arr) => {
          if (arr.indexOf(elem) === i) {
            return elem
          }
        })

        this.setDataRoom = newArray
        this.setDataRoomAfter = this.setDataRoom
      }

      if (this.setDataRoom != []) {
        this.setDataRoom = []
      }
    }
  }

  sitRoom
  hideEditStartInput = true
  hideEditStart = false

  checkTime() {
    this.addIncres.get('timeStart').setValue("")
    this.addIncres.get('timeEnd').setValue("")
    if (this.addIncres.value.room) {
      for (let item of this.dataRoom) {
        if (this.addIncres.value.room === item.room) {
          if (this.addIncres.value.day == "จันทร์") {
            this.timeStartO = item.mon
            this.sitRoom = item.sit
          }
          if (this.addIncres.value.day == "อังคาร") {
            this.timeStartO = item.tue
            this.sitRoom = item.sit
          }
          if (this.addIncres.value.day == "พุธ") {
            this.timeStartO = item.wed
            this.sitRoom = item.sit
          }
          if (this.addIncres.value.day == "พฤหัสบดี") {
            this.timeStartO = item.thu
            this.sitRoom = item.sit
          }
          if (this.addIncres.value.day == "ศุกร์") {
            this.timeStartO = item.fri
            this.sitRoom = item.sit
          }
          if (this.addIncres.value.day == "เสาร์") {
            this.timeStartO = item.sat
            this.sitRoom = item.sit
          }
          if (this.addIncres.value.day == "อาทิตย์") {
            this.timeStartO = item.sun
            this.sitRoom = item.sit
          }
        }
      }
      // const newArray = this.timeStartO.filter((elem, i, arr) => {
      //   if (arr.indexOf(elem) === i) {
      //     return elem
      //   }
      // })
      this.timeStartO
      this.hideEditStartInput = false
      this.hideEditStart = true
      // if (this.timeStartO !== []) {
      //   this.timeStartO = []
      // }
    }
    console.log(this.sitRoom)
  }
  timeEnd0 = []
  countTime
  countTimeEnd

  yearEx = (new Date()).getFullYear()
  hideEditEnd = false
  dataStu = []
  dropdownList = [];
  onGetTable() {
    var count = 1
    var arr = []
    var arrStu = []
    this.http.get<any>("http://localhost:4001/user").subscribe(result => {
      this.dataTeacher = result.data
      for (let item of this.dataTeacher) {
        if (item.types == "อาจารย์" || item.types == "อาจารย์,คนคุมสอบ" || item.types == "คนคุมสอบ,อาจารย์") {
          arr.push({ item_id: count, item_text: item.name + " " + item.surname })
          count++
        } else if (item.types == "นิสิต" || item.types == "นิสิต,คนคุมสอบ" || item.types == "คนคุมสอบ,นิสิต") {
          arrStu.push({ username: item })
        }
      }
      this.dataStu = arrStu
      this.dropdownList = arr
      // console.log(this.dropdownList)
      this.selectedItems = [];
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableCheckAll: false,
        itemsShowLimit: 20,
        allowSearchFilter: true,
        limitSelection: 5
      };
      this.checkData = true;
      this.showSpinner()
    })
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
  allowAlertEdit = false
  onClickEdit() {

    for (let item of this.dataRoom) {
      if (this.addIncres.value.room === item.room) {
        this.sitRoom = item.sit
      }
      this.monday = item.mon
      this.tuesday = item.tue
      this.wednesday = item.wed
      this.thursday = item.thu
      this.friday = item.fri
      this.saterday = item.sat
      this.sunday = item.sun
    }

    this.addIncres.get('checkType').setValue(this.addIncres.value.nameTeacher)
    this.submitted = true;
    if (this.addIncres.invalid) {
      return;
    }
    var obj = {
      id: this.addIncres.value.id, name: this.addIncres.value.nameSubject, teacher:
        this.addIncres.value.nameTeacher, build: this.addIncres.value.build, room:
        this.addIncres.value.room, day: this.addIncres.value.day, timeStart: this.addIncres.value.timeStart,
      timeEnd: this.addIncres.value.timeEnd, faculty: this.addIncres.value.faculty, unit: this.addIncres.value.credit,
      term: this.addIncres.value.term, year: this.addIncres.value.year, sit: this.ArrayStudent.length, student: this.ArrayStudent
    }
    var arr = []
    if (this.hideEditStartInput == true) {
      for (let item of this.dataRoom) {
        if (this.addIncres.value.room === item.room) {
          arr = item.time
        }
      }
    }
    if (this.hideEditStartInput == false) {
      for (let item of this.timeStartO) {
        arr.push(item)
      }
      var removed = arr.splice(this.countTime, this.countTimeEnd);
    }
    var _idRoom
    for (let item of this.dataRoom) {
      if (this.addIncres.value.room == item.room) {
        _idRoom = item._id
      }
    }

    var objRoom
    if (this.hideEditDay == false) {
      objRoom = { _id: _idRoom, build: this.addIncres.value.build, room: this.addIncres.value.room, status: "ว่าง", sit: this.sitRoom, mon: this.monday, tue: this.tuesday, wed: this.wednesday, thu: this.thursday, fri: this.friday, sat: this.saterday, sun: this.sunday }

    }
    if (this.hideEditDay == true) {
      if (this.addIncres.value.day == "จันทร์") {
        objRoom = { _id: _idRoom, build: this.addIncres.value.build, room: this.addIncres.value.room, status: "ว่าง", sit: this.sitRoom, mon: arr, tue: this.tuesday, wed: this.wednesday, thu: this.thursday, fri: this.friday, sat: this.saterday, sun: this.sunday }
      }
      if (this.addIncres.value.day == "อังคาร") {
        objRoom = { _id: _idRoom, build: this.addIncres.value.build, room: this.addIncres.value.room, status: "ว่าง", sit: this.sitRoom, tue: arr, mon: this.monday, wed: this.wednesday, thu: this.thursday, fri: this.friday, sat: this.saterday, sun: this.sunday }
      }
      if (this.addIncres.value.day == "พุธ") {
        objRoom = { _id: _idRoom, build: this.addIncres.value.build, room: this.addIncres.value.room, status: "ว่าง", sit: this.sitRoom, wed: arr, mon: this.monday, tue: this.tuesday, thu: this.thursday, fri: this.friday, sat: this.saterday, sun: this.sunday }
      }
      if (this.addIncres.value.day == "พฤหัสบดี") {
        objRoom = { _id: _idRoom, build: this.addIncres.value.build, room: this.addIncres.value.room, status: "ว่าง", sit: this.sitRoom, thu: arr, mon: this.monday, tue: this.tuesday, wed: this.wednesday, fri: this.friday, san: this.saterday, sut: this.sunday }
      }
      if (this.addIncres.value.day == "ศุกร์") {
        objRoom = { _id: _idRoom, build: this.addIncres.value.build, room: this.addIncres.value.room, status: "ว่าง", sit: this.sitRoom, fri: arr, tue: this.tuesday, wed: this.wednesday, thu: this.thursday, mon: this.monday, sat: this.saterday, sun: this.sunday }
      }
      if (this.addIncres.value.day == "เสาร์") {
        objRoom = { _id: _idRoom, build: this.addIncres.value.build, room: this.addIncres.value.room, status: "ว่าง", sit: this.sitRoom, sat: arr, tue: this.tuesday, wed: this.wednesday, thu: this.thursday, fri: this.friday, mon: this.monday, sun: this.sunday }
      }
      if (this.addIncres.value.day == "อาทิตย์") {
        objRoom = { _id: _idRoom, build: this.addIncres.value.build, room: this.addIncres.value.room, status: "ว่าง", sit: this.sitRoom, sun: arr, tue: this.tuesday, wed: this.wednesday, thu: this.thursday, fri: this.friday, sat: this.saterday, mon: this.monday }
      }
    }

    console.log(objRoom)

    // this.http.patch<any>('http://localhost:4001/editroom/', objRoom).subscribe((res) => {
    // })

    for (var i = 0; i < this.dataStu.length; i++) {
    }
    var ArrayStudent = this.ArrayStudent
    for (let item of ArrayStudent) {
      for (var i = 0; i < this.dataStu.length; i++) {
        if (this.dataStu[i].username == item.username) {
          ArrayStudent.slice(i, 1)
        }
      }
    }

    this.http.post<any>('http://localhost:4001/userInsertExcel', this.ArrayStudent).subscribe((res) => {
    })

    this.http.patch<any>('http://localhost:4001/learnsUpdate/', obj).subscribe((res) => {
      console.log(obj)
      this.allowAlertEdit = true
      setTimeout(() => {
        this.allowAlertEdit = false
      }, 2000);
      this.getSubjectLearn()
      this.getBuilding()
      document.getElementById("closeModaledit").click();
    })
  }
  hideEditDayInput = true
  hideEditDay = false
  id
  nameSubject
  nameTeacher
  faculty
  build
  credit
  year
  termSee
  room
  day
  timeStart
  timeEnd
  sit
  tableStu = []
  monday = []
  tuesday = []
  wednesday = []
  thursday = []
  friday = []
  saterday = []
  sunday = []
  timeS: Number
  timeE: Number
  tableClick(id: string, name: string, teacher: string, faculty: string, build: string, unit: string, year: string, term: string,
    room: string, day: string, timeStart: string, timeEnd: string, sit: string, student, i) {
    this.addIncres.get('id').setValue(id);
    this.addIncres.get('nameSubject').setValue(name);
    this.addIncres.get('nameTeacher').setValue(teacher);
    this.addIncres.get('faculty').setValue(faculty)
    this.addIncres.get('build').setValue(build)
    this.addIncres.get('credit').setValue(unit)
    this.addIncres.get('year').setValue(year)
    this.addIncres.get('term').setValue(term)
    this.addIncres.get('room').setValue(room)
    this.addIncres.get('day').setValue(day)
    this.addIncres.get('timeStart').setValue(timeStart)
    this.addIncres.get('timeEnd').setValue(timeEnd)
    this.timeS = +this.addIncres.value.timeStart
    this.timeE = +this.addIncres.value.timeEnd + 0.45
    this.id = id
    this.nameSubject = name
    this.nameTeacher = teacher
    this.faculty = faculty
    this.build = build
    this.credit = unit
    this.year = year
    this.termSee = term
    this.room = room
    this.day = day
    this.timeStart = timeStart
    this.timeEnd = timeEnd
    this.sit = sit
    this.tableStu = student
    this.disableBtnSave = true
    this.disableBuild = true
    this.arrayStudentExcelPost = []
    this.timeStartO = []
    this.timeEnd0 = []
    this.hideEditRoom = false
    this.hideEditEnd = false
    this.hideEditStart = false
    this.hideEditDay = false
    this.hideEditDayInput = true
    this.hideEditStartInput = true
    this.hideEditRoominput = true
    this.hideEditEndInput = true
    localStorage.setItem('idTest', id)
    localStorage.setItem('nameTest', name)
    localStorage.setItem('nameTeacherTest', this.nameTeacher)
    localStorage.setItem('facultyTest', faculty)
    var nameSJ

    if (this.put !== []) {
      this.put = []
    }
    for (let item of this.tableStu) {
      nameSJ = { username: item.username, name: item.name, surname: item.surname }
      this.put.push(nameSJ)
    }
    // console.log(this.put)
    var inputElement = <HTMLInputElement>document.getElementById('inputStu');
    inputElement.value = null
    this.disableBtnExcel = true
    this.ArrayStudent = []
    // console.log(this.addIncres.value)
  }

  order: string
  reverse: boolean = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  arrayDeleteCheck = ""
  dataDelete: Array<String> = [];

  onSetDataDelete(event, _id: string) {
    if (event.target.checked) {
      this.arrayDeleteCheck = event.target.value
      this.dataDelete.push(this.arrayDeleteCheck)
      if (event.target.value === _id) {
      }
    } else {
      var array = this.dataDelete
      var index = array.indexOf(event.target.value)
      if (index !== -1) {
        array.splice(index, 1)
        this.dataDelete = array
      }
    }
    console.log(this.arrayDeleteCheck)
  }
  disableBtnSave = true
  allowAlertDelete = false
  allowAlertDeleteFail = false
  onclickDelete() {

    if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
      this.allowAlertDelete = true
      setTimeout(() => {
        this.allowAlertDelete = false
      }, 5000);
      this.http.post('http://localhost:4001/learnsDelete', this.dataDelete).subscribe((res) => {
        this.clearEdit()
        document.getElementById("closeModalDelete").click();
      })
    }
    if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
      this.allowAlertDeleteFail = true
      setTimeout(() => {
        this.allowAlertDeleteFail = false
      }, 5000);
    }
  }
  arrayBuffer: any;
  arrayTest: any
  file: File;
  arrayName = []
  arraySurname = []
  arrayId = []
  arrayStatus = []
  arrayEmail = []
  obj
  disableBtnExcel = true
  disableBuild = true
  arrayStudentExcelPost = []
  incomingfile(event) {
    this.file = event.target.files[0];
    this.disableBtnExcel = false
  }
  UploadExcel() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var test = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      this.arrayTest = test
      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.setDataExcel()
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  setDataExcel() {
    for (let item of this.arrayTest) {
      var splitted = item.ชื่อ.split(" ");
      this.arrayName.push(splitted[1])
      this.arraySurname.push(splitted[2])
      this.arrayId.push(String(item.รหัส))
    }
    var array = this.arrayTest
    var total

    if (this.arrayId.length === this.arrayTest.length) {
      for (var i = 0; i < array.length; i++) {
        var auth = md52(this.arrayId[i]);
        console.log(auth)
        total = {
          name: this.arrayName[i], surname: this.arraySurname[i], username:
            this.arrayId[i], password: auth, types: "นิสิต", email: this.arrayId[i] + "@go.buu.ac.th"
        }
        this.ArrayStudent.push(total)
      }
    }
    this.disableBuild = false
    this.disableBtnExcel = true
    this.disableBtnSave = false

    if (this.ArrayStudent.length > 0) {
      this.http.post<any>('http://localhost:4001/userExcel/', this.ArrayStudent).subscribe((res) => {
        console.log(res.status)
      })
    }
    // this.funcSnShow()
  }
  funcSnShow() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 20000);
  }
  put = []
  exportAsXLSX(): void {

    this.excelService.exportAsExcelFile(this.put, this.nameSubject + "_" + this.id);

  }

  dataNisit = []
  ArrayNisit = []
  getNisit() {
    var arrNisit = []
    this.http.get<any>("http://localhost:4001/user").subscribe(result => {
      var dataUser = result.data
      for (let item of dataUser) {
        if (item.types == "นิสิต" || item.types == "นิสิต,คนคุมสอบ" || item.types == "คนคุมสอบ,นิสิต") {
          arrNisit.push({ username: item.username, name: item.name, surname: item.surname })
        }
      }
      this.ArrayNisit = this.put
      this.dataNisit = arrNisit.filter(item1 =>
        !this.put.some(item2 => (item2.username === item1.username && item2.name === item1.name)))
      console.log(this.dataNisit);
    })
  }
  disableBtnUpdate = true;
  onSetUpdateNisit(event, username: String, name: String, surname: String) {
    if (event.target.checked) {
      this.ArrayNisit.push({ username: username, name: name, surname: surname })
    } else {
      var array = this.ArrayNisit.filter(item => item.username !== username);
      this.ArrayNisit = array;
    }
    console.log(this.ArrayNisit)

    if ((this.put.length - this.ArrayNisit.length) === 0) {
      this.disableBtnUpdate = true;
    } else {
      this.disableBtnUpdate = false;
    }
  }
  onClickUpdateNisit() {
    this.ArrayNisit.sort((a, b) => a.username.localeCompare(b.username));
    var obj = {
      id: this.addIncres.value.id, name: this.addIncres.value.nameSubject, teacher:
        this.addIncres.value.nameTeacher, build: this.addIncres.value.build, room:
        this.addIncres.value.room, day: this.addIncres.value.day, timeStart: this.addIncres.value.timeStart,
      timeEnd: this.addIncres.value.timeEnd, faculty: this.addIncres.value.faculty, unit: this.addIncres.value.credit,
      term: this.addIncres.value.term, year: this.addIncres.value.year, sit: this.ArrayNisit.length, student: this.ArrayNisit
    }
    this.http.patch<any>('http://localhost:4001/learnsUpdate/', obj).subscribe((res) => {
      console.log(obj)
    })
    this.disableBtnUpdate = true
    this.allowAlertEdit = true
    setTimeout(() => {
      this.allowAlertEdit = false
    }, 5000);
    this.getSubjectLearn()
  }

  onClickClear() {
    console.log(this.addIncres.value.timeEnd)
    var year = (new Date()).getFullYear()
    this.submitted = false
    this.addIncres.get('id').setValue('');
    this.addIncres.get('nameSubject').setValue("");
    this.addIncres.get('nameTeacher').setValue("");
    this.addIncres.get('build').setValue("")
    this.addIncres.get('room').setValue("")
    this.addIncres.get('day').setValue("")
    this.addIncres.get('timeStart').setValue("")
    this.addIncres.get('timeEnd').setValue("")
    this.addIncres.get('faculty').setValue("")
    this.addIncres.get('credit').setValue("")
    this.addIncres.get('term').setValue("")
    this.addIncres.get('year').setValue(year)
    this.addIncres.get('timeStart').setValue("")
    this.addIncres.get('timeEnd').setValue("")
    this.hideEditRoom = false
    this.hideEditEnd = false
    this.hideEditStart = false
    this.hideEditStartInput = true
    this.hideEditRoominput = true
    this.hideEditEndInput = true
  }

  checkDay() {
    this.addIncres.get('day').setValue("")
    this.hideEditDayInput = false
    this.hideEditDay = true
  }

  clearEdit() {
    this.submitted = false
    this.addIncres.get('id').setValue('');
    this.addIncres.get('nameSubject').setValue("");
    this.addIncres.get('nameTeacher').setValue("");
    this.addIncres.get('build').setValue("")
    this.addIncres.get('room').setValue("")
    this.addIncres.get('day').setValue("")
    this.addIncres.get('timeStart').setValue("")
    this.addIncres.get('timeEnd').setValue("")
    this.addIncres.get('faculty').setValue("")
    this.addIncres.get('credit').setValue("")
    this.addIncres.get('term').setValue("")
    this.addIncres.get('year').setValue("")
    this.getSubjectLearn()
  }

  checkTimeStart() {
    if (this.addIncres.value.timeStart) {
      if (this.addIncres.value.timeStart == "8.00") {
        this.countTime = 0

      }
      if (this.addIncres.value.timeStart == "9.00") {
        this.countTime = 2

      }
      if (this.addIncres.value.timeStart == "10.00") {
        this.countTime = 3

      }
      if (this.addIncres.value.timeStart == "11.00") {
        this.countTime = 4

      }
      if (this.addIncres.value.timeStart == "12.00") {
        this.countTime = 5

      }
      if (this.addIncres.value.timeStart == "13.00") {
        this.countTime = 6

      }
      if (this.addIncres.value.timeStart == "14.00") {
        this.countTime = 7

      }
      if (this.addIncres.value.timeStart == "15.00") {
        this.countTime = 8

      }
      if (this.addIncres.value.timeStart == "16.00") {
        this.countTime = 9
      }
      if (this.addIncres.value.timeStart == "17.00") {
        this.countTime = 10

      }
      if (this.addIncres.value.timeStart == "18.00") {
        this.countTime = 11

      }
      if (this.addIncres.value.timeStart == "19.00") {
        this.countTime = 12

      }
      if (this.addIncres.value.timeStart == "20.00") {
        this.countTime = 13

      }
      var count = 0.55
      var arrEnd = []
      for (let i = 0; i < 4; i++) {
        arrEnd.push(+this.addIncres.value.timeStart + count)
        count += 1
        if (+this.addIncres.value.timeStart + count > 21.55) {
          break;
        }
      }
      this.timeEnd0 = arrEnd
      const newArray = this.timeEnd0.filter((elem, i, arr) => {
        if (arr.indexOf(elem) === i) {
          return elem
        }
      })
      this.timeEnd0 = newArray
      this.hideEditEndInput = false
      this.hideEditEnd = true
    }
  }

  checkTimeEnd() {
    if (this.addIncres.value.timeStart == "8.00") {
      if (this.addIncres.value.timeEnd == "8.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "9.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "10.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "11.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "9.00") {
      if (this.addIncres.value.timeEnd == "9.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "10.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "11.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "12.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "10.00") {
      if (this.addIncres.value.timeEnd == "10.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "11.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "12.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "13.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "11.00") {
      if (this.addIncres.value.timeEnd == "11.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "12.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "13.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "14.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "12.00") {
      if (this.addIncres.value.timeEnd == "12.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "13.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "14.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "15.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "13.00") {
      if (this.addIncres.value.timeEnd == "13.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "14.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "15.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "16.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "14.00") {
      if (this.addIncres.value.timeEnd == "14.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "15.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "16.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "17.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "15.00") {
      if (this.addIncres.value.timeEnd == "15.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "16.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "17.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "18.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "16.00") {
      if (this.addIncres.value.timeEnd == "16.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "17.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "18.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "19.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "17.00") {
      if (this.addIncres.value.timeEnd == "17.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "18.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "19.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "20.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "18.00") {
      if (this.addIncres.value.timeEnd == "18.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "19.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "20.55") {
        this.countTimeEnd = 3

      }
      if (this.addIncres.value.timeEnd == "21.55") {
        this.countTimeEnd = 4

      }
    }
    if (this.addIncres.value.timeStart == "19.00") {
      if (this.addIncres.value.timeEnd == "19.55") {
        this.countTimeEnd = 1

      }
      if (this.addIncres.value.timeEnd == "20.55") {
        this.countTimeEnd = 2

      }
      if (this.addIncres.value.timeEnd == "21.55") {
        this.countTimeEnd = 3

      }
    }
  }
}