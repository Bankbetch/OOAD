import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-proctor',
  templateUrl: './proctor.component.html',
  styleUrls: ['./proctor.component.css']
})
export class ProctorComponent implements OnInit {

  constructor(private http: HttpClient,
    private title: Title,
    private spinner: NgxSpinnerService) {
    this.title.setTitle("รายการคุมสอบ")
  }

  getName
  getSurname

  ngOnInit() {
    this.getName = localStorage.getItem("getName")
    this.getSurname = localStorage.getItem("getSurname")
    this.getListProctor()
  }

  dataProctor = []

  getListProctor() {
    this.http.get<any>('http://localhost:4001/exam').subscribe(result => {
      var dataExams = result.data
      for (var item of dataExams) {
        for (var item2 of item.examer) {
          if (item2.name === this.getName && item2.surname === this.getSurname) {
            console.log(item2.name)
            this.dataProctor.push(item)
          }

        }
      }
    })
  }

}
