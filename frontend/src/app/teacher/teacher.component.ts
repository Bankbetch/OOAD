import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private http: HttpClient,
    private title: Title,
    private spinner: NgxSpinnerService) {
    this.title.setTitle("รายการคุมสอบ")
  }
  getName
  getSurname
  dataShow = []
  dataNisit = []

  ngOnInit() {
    this.getName = localStorage.getItem("getName")
    this.getSurname = localStorage.getItem("getSurname"), this.getSchedule()
  }

  getSchedule() {
    this.http.get<any>('http://localhost:4001/exam').subscribe(result => {
      var dataExams = []
      for (var item of result.data) {
        if (item.statusExam == "เปิดการสอบ") {
          dataExams.push(item)
        }
      }
      for (var item of dataExams) {
        for (var item2 of item.teacher) {
          var splitted = item2.split(" ");
          var name = splitted[0]
          var surname = splitted[1]
          if (name === this.getName && surname === this.getSurname) {
            this.dataShow.push(item)
            console.log(this.dataShow)
          }
        }
      }
    })
  }


}
