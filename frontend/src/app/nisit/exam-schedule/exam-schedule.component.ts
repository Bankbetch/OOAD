import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.css']
})
export class ExamScheduleComponent implements OnInit {

  constructor(private http: HttpClient,
    private title: Title,
    private spinner: NgxSpinnerService) {
    this.title.setTitle("ตารางสอบ")
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
        for (var item2 of item.listNisit) {
          if (item2.name == this.getName) {
            this.dataShow.push({
              id: item.id, name: item.name,
              room: item.room, day: item.day, faculty: item.faculty,
              time: item.timeStart + " - " + item.timeEnd,
              sit: item2.examSit
            })
            console.log(this.dataShow)
          }
        }
      }
    })
  }

}
