import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../shared/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit{

  constructor(public reportService: ReportService){

  }

  ngOnInit(): void {
    this.reportService.test()
  }

  downloadPDF(){
    this.reportService.downloadPDF()
  }

  openPDF(){
    this.reportService.openPDF()
  }

  printPDF(){
    this.reportService.printPDF()
  }

}
