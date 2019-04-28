import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterPipe } from '../setting-user/FilterPipe.component';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-manage-build',
  templateUrl: './manage-build.component.html',
  styleUrls: ['./manage-build.component.css']
})
export class ManageBuildComponent implements OnInit {
  searchString = ""
  submitted = false
  checkG
  getLogin
  data: any[]
  form: FormGroup
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
  get f() { return this.form.controls; }
  ngOnInit() {
    this.check(), this.onClickAdmin(), this.showSpinner(), this.getTable(),
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        among: ['', Validators.required],
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
    this.form.get('name').setValue("");
    this.form.get('among').setValue("");

  }

  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่" || this.checkG === "เจ้าหน้าที่,คนคุมสอบ") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการตึก"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  getTable() {
    this.http.get<any>('http://localhost:4001/build').subscribe(result => {
      this.checkData = true;
      this.showSpinner()
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
    if (this.form.invalid) {
      return;
    }

    var obj = { name: this.form.value.name, amongRoom: this.form.value.among }
    this.http.post<any>('http://localhost:4001/build', obj).subscribe((res) => {
      if (res.status === true) {
        document.getElementById("closeModalInsert").click();
        this.getTable()
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

  onClickDelete() {
    var r = confirm("กดokเพื่อลบข้อมูล");
    if (r == true) {
      if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
        this.http.post('http://localhost:4001/buildDelete', this.dataDelete).subscribe((res) => {
          this.getTable()
          this.dataDelete = []
        })
      }
      if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
        alert("กรุณาเลือกข้อมูลที่จะลบ")
      }
    }
  }

  _id

  onClickEdit(_id: String, name: string, amongRoom: string) {
    this.form.get('name').setValue(name);
    this.form.get('among').setValue(amongRoom);
    this._id = _id
    console.log(this.form.value.name)
  }
  allowAlertEdit = false
  Edit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    var obj = { _id: this._id, name: this.form.value.name, amongRoom: this.form.value.among }
    this.http.patch<any>('http://localhost:4001/buildUpdate/', obj).subscribe((res) => {
      console.log("EditSuccess")
      this.allowAlertEdit = true
      setTimeout(() => {
        this.allowAlertEdit = false
        this.getTable()
        document.getElementById("closeModalEdit").click();
      }, 1000);

    })
  }
}
