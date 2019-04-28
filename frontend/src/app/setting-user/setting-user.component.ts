import { Component, OnInit } from '@angular/core';
import { axios } from '../../../node_modules/axios/dist/axios'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { Title } from "@angular/platform-browser";
import { FilterPipe } from './FilterPipe.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { Md5 } from 'ts-md5/dist/md5';

import { OrderPipe } from 'ngx-order-pipe';
import value from '*.json';


declare var $: any;


@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.css'],

})
export class SettingUserComponent implements OnInit {

  searchToken: string;
  public searchString: string;

  test = "surname"
  checkForm = false
  disableButtonEdit = false
  disableButtonAdd = false

  dbAddress = {}
  name = ""
  surname = ""
  username = ""
  password = ""
  repassword = ""
  email = ""
  types = "เลือก"
  types2 = [
    {
      "name": "นิสิต",
    },
    {
      "name": "อาจารย์",
    },
    {
      "name": "คนคุมสอบ",
    },
    {
      "name": "เจ้าหน้าที่"
    }
  ]
  data: any[]
  allowAlertDeleteFail = false
  registerForm: FormGroup;
  submitted = false;
  allowAlertAdd = false
  allowAlertEdit = false
  allowAlertDelete = false
  arrayDeleteCheck = ""
  dataDelete: Array<String> = [];
  disableSelectbox = true
  checkG = ""
  getLogin = ""
  checkData = false;
  allowAlertInsert = false
  allowAlertInsertFail = false
  sortedCollection: any[];
  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private router: Router, private titleService: Title,
    private spinner: NgxSpinnerService, private orderPipe: OrderPipe) {
    this.titleService.setTitle("จัดการผู้ใช้งาน");
  }

  public ngOnInit() {
    this.onGetTable(),
      this.showSpinner(),
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        username: ['', Validators.required],
        type: ['', Validators.required],
        checkType: ['', Validators.required],
      },
        {
          validator: MustMatch('password', 'confirmPassword')
        }), this.check(), this.checkLogin(), this.onClickAdmin()
  }


  get f() { return this.registerForm.controls; }

  showSpinner() {
    if (this.checkData == false) {
      this.spinner.show();
    }
    else if (this.checkData == true) {

      /** spinner ends after 5 seconds */
      this.spinner.hide();

    }

  }
  gCheck
  onSubmit() {
    this.gCheck = this.registerForm.value.checkType
    this.registerForm.get('checkType').setValue(this.registerForm.value.type)
    console.log(this.registerForm.value.checkType)
    const md5 = new Md5;
    this.disableAll = false
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    var arr = []
    var getArr = []
    arr = this.registerForm.value.type
    for (let item of arr) {
      getArr.push(item.item_text)
    }
    console.log(getArr)
    var auth = md5.appendStr(this.registerForm.value.password).end();
    var obj = { name: this.registerForm.value.firstName, surname: this.registerForm.value.lastName, username: this.registerForm.value.username, password: auth, types: getArr, email: this.registerForm.value.email }
    this.http.post<any>('http://localhost:4001/user', obj).subscribe((res) => {
      if (res.status == true) {
        this.allowAlertInsert = true
        setTimeout(() => {
          this.allowAlertInsert = false
        }, 5000);
      } else {
        this.allowAlertInsertFail = true
        setTimeout(() => {
          this.allowAlertInsertFail = false
        }, 5000);
      }
      this.onGetTable()
      this.OnClear()
    })

  }
  statusEdit = "แก้ไขอมูลเรียบร้อย"
  onClickEdit() {
    this.registerForm.get('checkType').setValue(this.selectedItems)

    const md5 = new Md5;
    var count = 0;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    var arr = []
    var getArr = []
    arr = this.selectedItems
    for (let item of arr) {
      // if (count === 0) {
      //   if (item.item_id !== 1 && item.item_id !== 2 && item.item_id !== 3 && item.item_id !== 4) {
      //     getArr.push(item)
      //   } else {
      //     getArr.push(item.item_text)
      //   }
      // } else {
      //   getArr.push(item.item_text)
      // }
      // count++;
      getArr.push(item.item_text)

    }
    // var r = confirm("กดokเพื่อแกไขข้อมูล");
    // if (r == true) {
    var auth = this.registerForm.value.password;
    var obj = {
      name: this.registerForm.value.firstName, surname: this.registerForm.value.lastName, password: auth, username: this.registerForm.value.username,
      types: getArr, email: this.registerForm.value.email
    }

    console.log(obj)

    this.http.patch<any>('http://localhost:4001/userUpdate/', obj).subscribe((res) => {

      this.allowAlertEdit = true
      setTimeout(() => {
        this.allowAlertEdit = false
      }, 5000);
      document.getElementById("closeModaledit").click();
      this.onGetTable()
    })


  }
  resetSelect() {
    var count = 1
    var arr = []
    for (let item of this.types2) {
      arr.push({ item_id: count, item_text: item.name })
      count++
    }

    this.dropdownList = arr
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: false,
      itemsShowLimit: 20,
      allowSearchFilter: false,
      limitSelection: 2
    };
  }
  onItemSelect(item: any) {
    if (item.item_text == "นิสิต") {
      this.dropdownList = [{ item_id: 1, item_text: "นิสิต" }, { item_id: 2, item_text: "คนคุมสอบ" }]
    }
    if (item.item_text == "อาจารย์") {
      this.dropdownList = [{ item_id: 2, item_text: "อาจารย์" }, { item_id: 3, item_text: "คนคุมสอบ" }]
    }
    if (item.item_text == "เจ้าหน้าที่") {
      this.dropdownList = [{ item_id: 4, item_text: "เจ้าหน้าที่" }, { item_id: 3, item_text: "คนคุมสอบ" }]
    }
    this.registerForm.get('checkType').setValue(this.selectedItems)
  }

  OnclearHide() {
    this.registerForm.controls['username'].enable()
    this.registerForm.controls['firstName'].enable()
    this.registerForm.controls["lastName"].enable()
    this.registerForm.controls['password'].enable()
    this.registerForm.controls['confirmPassword'].enable()
    this.registerForm.controls['type'].enable()
    this.registerForm.controls['email'].enable()
    this.disableAll = false
    this.OnClear()
  }
  onSetData(event, _id: string) {
    if (event.target.checked) {
      this.arrayDeleteCheck = event.target.value
      this.dataDelete.push(this.arrayDeleteCheck)
      if (event.target.value === _id) {
        this.disableButtonDelete = true
        this.disableButtonEdit = false
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
  onClickDelete() {

    if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
      this.allowAlertDelete = true
      setTimeout(() => {
        this.allowAlertDelete = false
      }, 5000);
      this.http.post('http://localhost:4001/userDelete', this.dataDelete).subscribe((res) => {
        document.getElementById("closeModalDelete").click();
        this.onGetTable()
      })
    }
    if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
      this.allowAlertDeleteFail = true
      setTimeout(() => {
        this.allowAlertDeleteFail = false
      }, 5000);
    }

  }
  lenghtData: Number
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  onGetTable() {

    var count = 1
    var arr = []
    this.http.get<any>("http://localhost:4001/user").subscribe(result => {
      this.data = result.data
      this.checkData = true;
      this.showSpinner()
      this.sortedCollection = this.orderPipe.transform(this.data, '');
      this.lenghtData = this.sortedCollection.length
      for (let item of this.types2) {
        arr.push({ item_id: count, item_text: item.name })
        count++
      }

      this.dropdownList = arr
      this.selectedItems = [];
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        enableCheckAll: false,
        itemsShowLimit: 20,
        allowSearchFilter: false,
        limitSelection: 2
      };
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
      // console.log(this.sortedCollection);
    })
  }
  type
  tableClick(name: string, surname: string, username: string, password: string, status: string, email: string, i: number, event) {
    this.registerForm.get('firstName').setValue(name);
    this.registerForm.get('lastName').setValue(surname);
    this.registerForm.get('username').setValue(username);
    this.registerForm.get('password').setValue(password)

    this.registerForm.get('checkType').setValue(status)
    this.registerForm.get('type').setValue(status)

    this.registerForm.get('confirmPassword').setValue(password)
    this.type = status
    this.registerForm.get('email').setValue(email)
    this.disableSelectbox = false
    this.disableAll = false
    this.registerForm.controls['username'].enable()
    this.registerForm.controls['firstName'].enable()
    this.registerForm.controls["lastName"].enable()
    this.registerForm.controls['password'].enable()
    this.registerForm.controls['confirmPassword'].enable()
    this.registerForm.controls['type'].enable()
    this.registerForm.controls["email"].enable()
    var element = <HTMLInputElement>document.getElementById("ipUsername");
    var num1
    var num2
    if (this.registerForm.value.type[0] == "นิสิต") {
      console.log(this.registerForm.value.type)
      this.dropdownList = [{ item_id: 1, item_text: "นิสิต" }, { item_id: 2, item_text: "คนคุมสอบ" }]
      console.log(this.dropdownList)
    }
    if (this.registerForm.value.type[0] == "อาจารย์") {
      console.log(this.registerForm.value.type)
      this.dropdownList = [{ item_id: 2, item_text: "อาจารย์" }, { item_id: 3, item_text: "คนคุมสอบ" }]
    }
    if (this.registerForm.value.type[0] == "เจ้าหน้าที่") {
      console.log(this.registerForm.value.type)
      this.dropdownList = [{ item_id: 4, item_text: "เจ้าหน้าที่" }, { item_id: 3, item_text: "คนคุมสอบ" }]
    }


    this.registerForm.get('checkType').setValue(this.selectedItems)

    if (this.type[0] === "นิสิต" && this.type[1] === "คนคุมสอบ" || (this.type[0] === "คนคุมสอบ" && this.type[1] === "นิสิต")) {
      console.log("นิสิต")
      num1 = 1
      num2 = 2
      if (status.length >= 2) {
        this.selectedItems = [{ item_id: num1, item_text: status[0] }, { item_id: num2, item_text: status[1] }]
      }
    }
    if (this.type[0] === "อาจารย์" && this.type[1] === "คนคุมสอบ" || (this.type[0] === "คนคุมสอบ" && this.type[1] === "อาจารย์")) {
      console.log("อาจารย์")
      num1 = 2
      num2 = 3
      if (status.length >= 2) {
        this.selectedItems = [{ item_id: num1, item_text: status[0] }, { item_id: num2, item_text: status[1] }]
      }
    }
    if (this.type[0] === "เจ้าหน้าที่" && this.type[1] === "คนคุมสอบ" || (this.type[0] === "คนคุมสอบ" && this.type[1] === "เจ้าหน้าที่")) {
      console.log("เจ้าหน้าที่")
      num1 = 3
      num2 = 4
      if (status.length >= 2) {
        this.selectedItems = [{ item_id: num1, item_text: status[0] }, { item_id: num2, item_text: status[1] }]
      }
    }
    // if (this.type[0] === "อาจารย์" && this.type[1] === "เจ้าหน้าที่" || (this.type[0] === "เจ้าหน้าที่" && this.type[1] === "อาจารย์")) {
    //   console.log("อาจารย์")
    //   num1 = 2
    //   num2 = 4
    //   if (status.length >= 2) {
    //     this.selectedItems = [{ item_id: num1, item_text: status[0] }, { item_id: num2, item_text: status[1] }]
    //   }
    // }
    if (this.type[0] === "นิสิต" && this.type[1] === undefined) {
      num1 = 1
      this.selectedItems = [{ item_id: num1, item_text: status[0] }]
    }
    if (this.type[0] === "อาจารย์" && this.type[1] === undefined) {
      num1 = 2
      this.selectedItems = [{ item_id: num1, item_text: status[0] }]
    }
    if (this.type[0] === "คนคุมสอบ" && this.type[1] === undefined) {
      num1 = 3
      this.selectedItems = [{ item_id: num1, item_text: status[0] }]
    }
    if (this.type[0] === "เจ้าหน้าที่" && this.type[1] === undefined) {
      num1 = 4
      this.selectedItems = [{ item_id: num1, item_text: status[0] }]
    }


    // else {
    //   this.selectedItems = [{ item_id: num1, item_text: status[0] }]
    // }
    element.disabled = true;
    // console.log(this.registerForm.value)

  }
  disableAll = false

  // tableClickDisable(name: string, surname: string, username: string, password: string, status: string, email: string, i: number, event) {
  //   this.registerForm.get('firstName').setValue(name);
  //   this.registerForm.get('lastName').setValue(surname);
  //   this.registerForm.get('username').setValue(username);
  //   this.registerForm.get('password').setValue(password)
  //   this.registerForm.get('confirmPassword').setValue(password)
  //   this.registerForm.get('type').setValue(status)
  //   this.registerForm.get('email').setValue(email)
  //   this.disableSelectbox = false
  //   this.registerForm.controls['username'].disable()
  //   this.registerForm.controls['firstName'].disable()
  //   this.registerForm.controls["lastName"].disable()
  //   this.registerForm.controls['password'].disable()
  //   this.registerForm.controls['confirmPassword'].disable()
  //   this.registerForm.controls['type'].disable()
  //   this.registerForm.controls["email"].disable()
  // }


  OnClear() {
    console.log("clear")
    this.disableSelectbox = false
    this.submitted = false
    this.registerForm.get('firstName').setValue('');
    this.registerForm.get('lastName').setValue("");
    this.registerForm.get('username').setValue("");
    this.registerForm.get('password').setValue("")
    this.registerForm.get('confirmPassword').setValue("")
    // this.registerForm.get('type').setValue("")
    this.selectedItems = []

    this.registerForm.get('email').setValue("")
    this.onGetTable()
    this.dataDelete = []
    this.registerForm.controls['username'].enable()
    document.getElementById("closeModal").click();
  }


  notText(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    this.checkG = check
    this.getLogin = getLogin
    window.onload = function () {
    }
  }

  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่" || this.checkG ===  "เจ้าหน้าที่,คนคุมสอบ") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการผู้ใช้งาน"])

    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }

  checkLogin() {
    if (this.getLogin !== "true") {
      this.router.navigate(["/"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }

  isNotNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 33 || charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123 || charCode > 126))
      return true;
    return false;
  }
  isKeypressUsername(event) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 47 && charCode < 58 || charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123)
      return true
    return false
  }

  disableButtonCreate = true
  disableButtonDelete = true
  disableTable = true

  showButtonAdd() {
    this.checkForm = true
    if (this.checkForm = true) {
      this.disableButtonAdd = true
      this.disableButtonEdit = false
      this.disableButtonDelete = false
      this.disableTable = false
      this.disableButtonCreate = false
      this.registerForm.get('firstName').setValue('');
      this.registerForm.get('lastName').setValue("");
      this.registerForm.get('username').setValue("");
      this.registerForm.get('password').setValue("")
      this.registerForm.get('confirmPassword').setValue("")
      this.registerForm.get('type').setValue("นิสิต")
      this.registerForm.get('email').setValue("")
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
  incomingfile(event) {
    this.file = event.target.files[0];
  }
  Upload() {
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
  obj
  total = []
  testexcel() {
    var obj = this.total

    this.http.post<any>('http://localhost:4001/userExcel', obj).subscribe((res) => {
      console.log(obj)
    })
    this.onGetTable()
  }
  setDataExcel() {
    for (let item of this.arrayTest) {
      var splitted = item.ชื่อ.split(" ");
      this.arrayName.push(splitted[1])
      this.arraySurname.push(splitted[2])
      this.arrayId.push(item.รหัส)
      this.arrayStatus.push(item.status)
      this.arrayEmail.push(item.รหัส + "@go.buu.ac.th")
    }

    var array = this.arrayTest
    this.obj
    for (var i = 0; i < array.length; i++) {
      this.obj = { name: this.arrayName[i], surname: this.arraySurname[i], username: this.arrayId[i], password: this.arrayId[i], types: this.arrayStatus[i], email: this.arrayId[i] + "@go.buu.ac.th" }
      this.total.push(this.obj)
      // console.log(this.total)
    }
    // this.obj = [{ name: this.arrayName, surname: this.arraySurname, username: this.arrayId, password: this.arrayId, types: this.arrayStatus, email: this.arrayEmail }]
    // console.log(this.obj)
    // var total = []
    // for (let item of this.obj) {
    //   total = [
    //     { name: item.username + item.surname },
    //   ]
    // }
    // console.log(total)

  }
  dataOtShow = 5

  otShow = []
  order: string
  reverse: boolean = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}