import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Title } from "@angular/platform-browser";
import { ExcelService } from '../manage-exam/excel.service';

@Component({
  selector: 'app-proctor',
  templateUrl: './proctor.component.html',
  styleUrls: ['./proctor.component.css']
})
export class ProctorComponent implements OnInit {

  constructor(private http: HttpClient,
    private title: Title, private excelService: ExcelService) {
    this.title.setTitle("รายการคุมสอบ")
  }

  getName
  getSurname

  ngOnInit() {
    this.getName = localStorage.getItem("getName")
    this.getSurname = localStorage.getItem("getSurname")
    this.getListProctor()
  }

  dataExam = []
  dataProctor = []
  arrayStudentOfExam = []

  getListProctor() {
    this.http.get<any>('http://localhost:4001/exam').subscribe(result => {
      this.dataExam = result.data
      for (var item of this.dataExam) {
        for (var item2 of item.examer) {
          var splitted = item2.split(" ");
          var name = splitted[0]
          var surname = splitted[1]
          if (name === this.getName && surname === this.getSurname) {
            this.dataProctor.push(item)
          }
        }
      }
    })
  }

  nameSubject
  id

  printStudent(idSubject) {
    for (let item of this.dataExam) {
      if (item.id === idSubject) {
        this.nameSubject = item.name
        this.id = item.id
        for (let item2 of item.listNisit) {
          this.arrayStudentOfExam.push({ รหัสนิสิต: item2.username, ชื่อ: item2.name, นามสกุล: item2.surname, ที่นั่งสอบ: item2.examSit, ช่องเซ็นชื่อ: "" })
        }
      }
    }
    this.exportAsXLSX()
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.arrayStudentOfExam, this.nameSubject + "_" + this.id);
  }
}
