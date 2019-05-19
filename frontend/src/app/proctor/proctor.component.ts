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

  constructor( private http: HttpClient,
   private title: Title,
    private spinner: NgxSpinnerService) {
    this.title.setTitle("รายการคุมสอบ")
  }

  ngOnInit() {
    this.getListProctor()
  }

  dataExams = []

  getListProctor(){
    this.http.get<any>('http://localhost:4001/exam').subscribe(result => {
      this.dataExams = result.data
  })
  }

}
