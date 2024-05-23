import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../shared/report.service';
import { DateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { People } from '../../shared/persons';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit{
  personsList = People

  constructor(public reportService: ReportService, private dateAdapter: DateAdapter<Date>){
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.reportService.test()
    console.log(this.personsList[0].name)
  }

  form = new FormGroup({
    project_nr: new FormControl('', [Validators.required]),
    principal: new FormControl('', [Validators.required]),
    object: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    isEmission: new FormControl(false, [Validators.required]),
    isEndurance: new FormControl(false, [Validators.required]),
    date: new FormControl('', [Validators.required]),
    excutor: new FormControl('', [Validators.required]),
    reviewer: new FormControl('', [Validators.required])
  })

  onSubmit(form){
    console.log(form)
    this.reportService.addToPDF({
      style: 'table',
      table: {
        widths: [150, 300],
        body: [
          ['Numer projektu', `${form.value.project_nr}`],
          [{rowSpan: 4, text: 'Zleceniodawca'}, {rowSpan: 4, text: `${form.value.principal}`}],
          ['', ''],
          ['', ''],
          ['', ''],
          ['Obiekt badany', `${form.value.object}`],
          ['Miejsce wykonania badań', `${form.value.place}`],
          [{rowSpan: 2, text: 'Zakres badań'}, form.value.isEmission ? 'Emisja' : ''],
          ['', form.value.isEndurance ? 'Odporność' : ''],
          ['Data wydania sprawozdania', `${form.value.date}`]
        ]
      }
    }
  )
  this.reportService.addToPDF({
    style: 'table',
    table: {
      widths: [225, 225],
      body: [
        ['Sprawozdanie Sprawdził', 'Sprawozdanie wykonał'],
        [`${form.value.reviewer}`, `${form.value.excutor}`]
      ]
    }
  })
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
