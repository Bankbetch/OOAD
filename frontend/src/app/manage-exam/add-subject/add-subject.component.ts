import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderPipe } from 'ngx-order-pipe';
import * as XLSX from 'xlsx';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  searchString = ""
  checkG = "false"
  getLogin = "false"
  addIncres: FormGroup;
  p
  submitted = false
  dataOtShow = 5
  otShow = []
  checkData = false
  constructor(private router: Router, private http: HttpClient,
    private formBuilder: FormBuilder, private title: Title,
    private spinner: NgxSpinnerService, private orderPipe: OrderPipe) {
    this.title.setTitle("เพิ่มรายวิชาสอน")
  }
  data: any[]

  ngOnInit() {
    this.check(), this.onClickAdmin(),
      this.addIncres = this.formBuilder.group({
        id: ['', Validators.required],
        nameSubject: ['', Validators.required],
        faculty: ['', Validators.required],
        unit: ['', Validators.required],
      }), this.getSubject(), this.showSpinner()
  }
  get f() { return this.addIncres.controls; }
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
  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่" || this.checkG === "เจ้าหน้าที่,คนคุมสอบ") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการรายวิชาสอน/เพิ่มรายวิชาสอน"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  dataSubject: any[]
  lenghtData: Number
  sortedCollection: any[];
  getSubject() {
    this.http.get<any>('http://localhost:4001/subject').subscribe(result => {
      this.dataSubject = result.data
      console.log(this.dataSubject)
      this.sortedCollection = this.orderPipe.transform(this.dataSubject, '');
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
  allowAlertAdd = false
  onSubmit() {
    this.submitted = true;
    if (this.addIncres.invalid) {
      return;
    }
    var obj = {
      id: this.addIncres.value.id, name: this.addIncres.value.nameSubject,
      faculty: this.addIncres.value.faculty, unit: this.addIncres.value.unit
    }
    this.http.post<any>('http://localhost:4001/subject', obj).subscribe(result => {
      if (result.status == true) {
        document.getElementById("CloseInsert").click()
        this.getSubject()
      } else {
        this.allowAlertAdd = true
        setTimeout(() => {
          this.allowAlertAdd = false
        }, 3000);
      }
    })
  }
  clear() {
    this.submitted = false
    this.addIncres.get("id").setValue("")
    this.addIncres.get("nameSubject").setValue("")
    this.addIncres.get("unit").setValue("")
    this.addIncres.get("faculty").setValue("")
    this.allowAlertAdd = false
  }
  isNotNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 33 || charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123 || charCode > 126))
      return true;
    return false;
  }
  onEdit() {
    this.submitted = true;
    if (this.addIncres.invalid) {
      return;
    }
    var obj = {
      _id: this._id,
      id: this.addIncres.value.id, name: this.addIncres.value.nameSubject,
      faculty: this.addIncres.value.faculty, unit: this.addIncres.value.unit
    }
    this.http.patch<any>('http://localhost:4001/subjectUpdate', obj).subscribe(result => {
      console.log(obj)
      document.getElementById("CloseEdit").click()
      this.getSubject()
    })
  }
  _id
  tableCkick(_id, id, name, faculty, unit) {
    console.log(_id)
    this.addIncres.get("id").setValue(id)
    this.addIncres.get("nameSubject").setValue(name)
    this.addIncres.get("faculty").setValue(faculty)
    this.addIncres.get("unit").setValue(unit)
    this._id = _id
  }
  onClear() {
    this.submitted = false
    this.addIncres.get("id").setValue("")
    this.addIncres.get("nameSubject").setValue("")
    this.addIncres.get("unit").setValue("")
    this.addIncres.get("faculty").setValue("")
    this.arrayDeleteCheck = ""
    this.dataDelete = []
  }
  allowAlertDeleteFail = false
  onDelete() {
    console.log(this.dataDelete)
    if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
      this.http.post('http://localhost:4001/subjectDelete', this.dataDelete).subscribe((res) => {
        document.getElementById("CloseDelete").click();
        this.getSubject()
      })
    }
    if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
      this.allowAlertDeleteFail = true
      setTimeout(() => {
        this.allowAlertDeleteFail = false
      }, 5000);
    }
  }
}
