import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from '../../setting-user/FilterPipe.component';
import { OrderPipe } from 'ngx-order-pipe';
import * as XLSX from 'xlsx';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-manage-test',
  templateUrl: './manage-test.component.html',
  styleUrls: ['./manage-test.component.css']
})
export class ManageTestComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder, private title: Title,
    private spinner: NgxSpinnerService, private orderPipe: OrderPipe, ) {
    this.title.setTitle("จัดการการสอบ")
  }
  submitted = false;
  checkData = false
  checkG
  getLogin
  statusModal
  searchString
  dataOtShow = 5
  otShow = []
  lenghtData: Number
  sortedCollection: any[];
  data: any[]
  form: FormGroup
  subjectOpen: any[]
  pickTimeStart = ["8:00", "9:00", "10:00", "11:00", "12.00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  checkTimeEnd = ["9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55"]
  pickTimeEnd = []
  builds: any[]
  users: any[]
  examerList = []
  amongNisit
  listNisit = []
  nisit = []
  hideTimeBtn = true
  hideTimeSelect = false
  ngOnInit() {
    this.check(), this.onGetTable(), this.onGetBuildAndUsers(), this.showSpinner(), this.getSubject()
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      nameSubject: ['', Validators.required],
      nameTeacher: ['', Validators.required],
      faculty: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      day: ['', Validators.required],
      nameExamer: ['', Validators.required],
      room: ['', Validators.required],
    })
  }
  get f() { return this.form.controls; }
  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    var stm = localStorage.getItem('clickTest')
    this.checkG = check
    this.getLogin = getLogin
    this.statusModal = stm
    localStorage.getItem('idTest')
    localStorage.getItem('nameTest')
    localStorage.getItem('nameTeacherTest')
    localStorage.getItem('facultyTest')
    if (this.statusModal == "true") {
      document.getElementById('insertEx').click()
      localStorage.setItem('clickTest', "false")
    }
  }
  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่" || this.checkG === "เจ้าหน้าที่,คนคุมสอบ") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการการสอบ"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  ArrayExamer = []
  onGetTable() {
    this.http.get<any>('http://localhost:4001/exam').subscribe(result => {
      this.data = result.data
      for (let item of result.data) {
        this.ArrayExamer = item.examer
        this.nisit = item.listNisit
      }
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
    })
    this.dataDelete = []

  }
  checkDataUser = false
  onGetBuildAndUsers() {
    this.http.get<any>('http://localhost:4001/room').subscribe(res => {
      this.builds = res.data
    })
    this.http.get<any>('http://localhost:4001/user').subscribe(res => {
      this.users = res.data
      var count = 1
      var arr = []
      for (let item of this.users) {
        if (item.types == "คนคุมสอบ" || item.types == "อาจารย์,คนคุมสอบ" || item.types == "คนคุมสอบ,อาจารย์" || item.types == "นิสิต,คนคุมสอบ" || item.types == "คนคุมสอบ,นิสิต"
          || item.types == "เจ้าหน้าที่,คนคุมสอบ" || item.types == "คนคุมสอบ,เจ้าหน้าที่") {
          arr.push({ item_id: count, item_text: item.name + " " + item.surname })
          count++
        }
      }
      this.examerList = arr
      this.dropdownList = arr
      this.selectedItems = []
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

    })
  }
  order: string
  reverse: boolean = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  showSpinner() {
    if (this.checkData == false) {
      this.spinner.show();
    }
    else if (this.checkData == true) {
      this.spinner.hide();
    }
  }
  checkselect = true
  getSubject() {
    this.http.get<any>('http://localhost:4001/learns').subscribe(res => {
      this.subjectOpen = res.data
      this.checkData = true;
      this.showSpinner()
    })
  }

  insertExam() {
    this.submitted = true
    console.log(this.form.invalid)
    // if (this.form.invalid) {
    //   return;
    // }
    var data = {
      id: this.form.value.id,
      name: this.form.value.nameSubject,
      teacher: this.form.value.nameTeacher,
      faculty: this.form.value.faculty,
      timeStart: this.form.value.timeStart,
      timeEnd: this.form.value.timeEnd,
      day: this.form.value.day,
      amongNisit: this.amongNisit,
      listNisit: this.listNisit,
      statusExam: "เปิดการสอบ"
    }
    this.http.post<any>('http://localhost:4001/exam', data).subscribe(res => {
      if (res.status) {
        alert("เพิ่มข้อมูลเรียบร้อย")
        document.getElementById('closeModalInsert').click()
        this.onGetTable()
      } else {
        alert("มีการจัดการสอบแล้ว กรุณาลองใหม่อีกครั้ง")
      }
    })
  }
  onClear() {
    this.form.get('id').setValue('เลือก');
    this.form.get('nameSubject').setValue("เลือก");
    this.form.get('nameTeacher').setValue("");
    this.form.get('faculty').setValue("");
    this.form.get('timeStart').setValue("")
    this.form.get('timeEnd').setValue("")
    this.form.get('day').setValue("")
    this.form.get('room').setValue("")
    this.submitted = false
    this.hideTimeBtn = true
    this.hideTimeSelect = false
    var timeStartElement = <HTMLInputElement>document.getElementById('timeStart');
    var timeEndElement = <HTMLInputElement>document.getElementById('timeEnd');
    timeStartElement.setAttribute("disabled", 'disabled');
    timeEndElement.setAttribute("disabled", 'disabled');
  }

  checkIdSubject() {
    if (this.form.value.id) {
      for (let item of this.subjectOpen) {
        if (this.form.value.id === item.id) {
          this.form.get('nameSubject').setValue(item.name)
          this.form.get('faculty').setValue(item.faculty)
          this.form.get('nameTeacher').setValue(item.teacher)
          this.amongNisit = item.sit
          this.listNisit = item.student
        }
      }
    }
  }

  checkNameSubject() {
    if (this.form.value.nameSubject) {
      for (let item of this.subjectOpen) {
        if (this.form.value.nameSubject === item.name) {
          this.form.get('id').setValue(item.id)
          this.form.get('faculty').setValue(item.faculty)
          this.form.get('nameTeacher').setValue(item.teacher)
          this.amongNisit = item.sit
          this.listNisit = item.student
        }
      }
    }
  }

  checkTime() {
    this.hideTimeBtn = false
    this.hideTimeSelect = true
    this.form.get('timeEnd').setValue("")
    this.pickTimeEnd = []
    var timeEndElement = <HTMLInputElement>document.getElementById('timeEnd');
    timeEndElement.removeAttribute("disabled")
    if (this.form.value.timeStart) {
      var checkTimeStart = parseFloat(this.form.value.timeStart)
      for (let item of this.checkTimeEnd) {
        var checkTimeEndValue = parseFloat(item) + 0.55
        var result = checkTimeEndValue - checkTimeStart
        if (result > 1 && result < 4) {
          this.pickTimeEnd.push(item)
        }
      }
    }
  }

  checkDay() {
    var timeStartElement = <HTMLInputElement>document.getElementById('timeStart');
    timeStartElement.removeAttribute("disabled")
    console.log("testDay")
  }

  onEdit() {
    this.submitted = true
    if (this.form.invalid) {
      return;
    }
    var arr = []
    var getArr = []
    arr = this.form.value.nameExamer
    for (let item of arr) {
      console.log(item)
      var splitted = item.item_text.split(" ");
      var name = splitted[0]
      var surname = splitted[1]
      getArr.push(name + " " + surname)
    }
    var data = {
      id: this.form.value.id,
      timeStart: this.form.value.timeStart,
      timeEnd: this.form.value.timeEnd,
      day: this.form.value.day,
      examer: getArr,
      room: this.form.value.room
    }
    console.log(data)
    this.http.patch<any>('http://localhost:4001/examUpdate', data).subscribe(res => {
      if (res.status) {
        alert("แก้ไขข้อมูลเรียบร้อย")
        document.getElementById('closeModalEdit').click()
        this.onGetTable()
      }
    })
  }
  dropdownList = []
  selectedItems = []
  dropdownSettings = {};
  roomList = []
  sit
  id
  name
  student = []
  tableClick(id: string, name: string, teacher: string, faculty: string, timeStart: string, timeEnd: string, day: string, room: string, amongNisit: string, nameExamer: string) {
    this.form.get('id').setValue(id);
    this.form.get('nameSubject').setValue(name);
    this.form.get('nameTeacher').setValue(teacher);
    this.form.get('faculty').setValue(faculty)
    this.form.get('day').setValue(day)
    this.form.get('timeStart').setValue(timeStart)
    this.form.get('timeEnd').setValue(timeEnd)
    this.form.get('room').setValue(room)
    this.form.get('nameExamer').setValue(nameExamer)
    this.sit = amongNisit
    this.id = id
    this.name = name
    this.roomList = []
    this.student = []
    console.log(this.form.get('nameExamer').value)
    if (faculty === "วิทยาการสารสนเทศ") {
      for (let item of this.builds) {
        var buildsitParse = parseInt(item.sit)
        var amongNisitParse = parseInt(amongNisit)
        if (item.build === "วิทยาการสารสนเทศ" && buildsitParse >= amongNisitParse) {
          this.roomList.push(item.room)
        }
      }
    }
    var nameSJ
    var dataExamer = []
    if (nameExamer.length >= 1) {
      for (let item of this.examerList) {
        for (var i = 0; i < nameExamer.length; i++) {
          if (item.item_text === nameExamer[i]) {
            dataExamer.push({ item_id: item.item_id, item_text: nameExamer[i] })
          }
        }
      }
    }
    this.selectedItems = dataExamer
    if (this.sit !== 0) {
      this.http.get<any>('http://localhost:4001/exam/' + id).subscribe(result => {
        this.http.get<any>('http://localhost:4001/room/' + room).subscribe(result1 => {
          var listName = result.data[0].listNisit
          var col = result1.data[0].col
          var row = result1.data[0].row
          var countRow = 1, countCol = 0;
          for (let item of listName) {

            if (countCol < col * 2) {
              if (countRow <= row && countCol === 0) {
                nameSJ = { username: item.username, name: item.name, surname: item.surname, examSit: "A" + countRow }
                this.student.push(nameSJ)
                countRow += 2;
              }
              if (countRow <= row && countCol === 1) {
                nameSJ = { username: item.username, name: item.name, surname: item.surname, examSit: "B" + countRow }
                this.student.push(nameSJ)
                countRow += 2;
              }
              if (countRow <= row && countCol === 2) {
                nameSJ = { username: item.username, name: item.name, surname: item.surname, examSit: "C" + countRow }
                this.student.push(nameSJ)
                countRow += 2;
              }
              if (countRow <= row && countCol === 3) {
                nameSJ = { username: item.username, name: item.name, surname: item.surname, examSit: "D" + countRow }
                this.student.push(nameSJ)
                countRow += 2;
              }
              if (countRow <= row && countCol === 4) {
                nameSJ = { username: item.username, name: item.name, surname: item.surname, examSit: "A" + countRow }
                this.student.push(nameSJ)
                countRow += 2
              }
              if (countRow <= row && countCol === 5) {
                nameSJ = { username: item.username, name: item.name, surname: item.surname, examSit: "B" + countRow }
                this.student.push(nameSJ)
                countRow += 2
              }
              if (countRow <= row && countCol === 6) {
                nameSJ = { username: item.username, name: item.name, surname: item.surname, examSit: "C" + countRow }
                this.student.push(nameSJ)
                countRow += 2
              }
              if (countRow <= row && countCol === 7) {
                nameSJ = { username: item.username, name: item.name, surname: item.surname, examSit: "D" + countRow }
                this.student.push(nameSJ)
                countRow += 2
              }
              if (countRow > row && countCol < col) {
                countRow = 1;
                countCol++;
              }
              if (countCol >= col && countRow > row) {
                countRow = 2;
                countCol++;
              }
            }
            var data = {
              id: this.form.value.id,
              listNisit: this.student
            }
            this.http.patch<any>("http://localhost:4001/examUpdate/", data).subscribe(result => {
              console.log(data)
            })
          }
        })
      })
    }
  }
  onItemSelect(items: any) {
  }
  arrayDeleteCheck = ""
  dataDelete: Array<String> = [];

  onSetDataDelete(event, _id: string) {
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

  allowAlertDelete = false
  allowAlertDeleteFail = false
  cancelExam() {
    var idCheck = this.dataDelete[0]
    var data = {
      id: idCheck,
      statusExam: "ยกเลิกการสอบ"
    }
    console.log(idCheck)
    if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
      this.allowAlertDelete = true
      setTimeout(() => {
        this.allowAlertDelete = false
      }, 3000);
      this.http.patch<any>('http://localhost:4001/examUpdate/status', data).subscribe(res => {
        console.log(res.status)
        document.getElementById("closeModalDelete").click();
        this.onGetTable()
      })
    }
    if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
      this.allowAlertDeleteFail = true
      setTimeout(() => {
        this.allowAlertDeleteFail = false
      }, 3000);
    }

  }
  openExam(event) {
    var data = {
      id: event,
      statusExam: "เปิดการสอบ"
    }
    this.http.patch<any>('http://localhost:4001/examUpdate/status', data).subscribe(res => {
      if (res.status) {
        alert("แก้ไขข้อมูลเรียบร้อย")
        this.onGetTable()
      }
    })
  }

}
