import { Component } from '@angular/core';
import { ReportService } from './shared/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'interaktywny_protokol';

  constructor(public reportService: ReportService){

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
