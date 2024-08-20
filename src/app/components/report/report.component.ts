import { Component, OnInit, input } from '@angular/core';
import { ReportService } from '../../shared/report.service';
import { DateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { People } from '../../shared/persons';
import { InputsService } from '../../shared/inputs.service';
import { BasicInfo } from '../../shared/dictionary';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  personsList = People;
  data: BasicInfo;
  isPrev: boolean;
  isEdited: boolean = true;

  constructor(
    public reportService: ReportService,
    private dateAdapter: DateAdapter<Date>,
    public inputs: InputsService,
    public datepipe: DatePipe
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.reportService.test();
    this.data = this.inputs.inputs?.basic_info;
    this.isPrev = this.inputs.inputs?.is_prev;
    console.log(this.personsList[0].name);
    console.log(this.inputs.inputs.basic_info);
  }

  onSubmit(form) {
    console.log(form);
    this.inputs.updateInputs('basic_info', this.data);
  }

  next() {
    this.data.date = this.datepipe.transform(this.data.date, 'dd/MM/yyyy');
    this.isEdited = this.data === this.inputs.inputs?.basic_info ? false : true;
    this.inputs.updateInputs('basic_info', this.data);
    this.reportService.addToPDF([
      {
        style: 'table',
        table: {
          widths: [150, 300],
          body: [
            ['Numer projektu', `${this.data.project_nr}`],
            [
              { rowSpan: 4, text: 'Zleceniodawca' },
              { rowSpan: 4, text: `${this.data.principal}` },
            ],
            ['', ''],
            ['', ''],
            ['', ''],
            ['Obiekt badany', `${this.data.object}`],
            ['Miejsce wykonania badań', `${this.data.place}`],
            // [
            //   { rowSpan: 2, text: 'Zakres badań' },
            //   this.data.isEmission ? 'Emisja' : '',
            // ],
            ['', this.data.isEndurance ? 'Odporność' : ''],
            ['Data wydania sprawozdania', `${this.data.date}`],
          ],
        },
      },
      {
        style: 'table',
        table: {
          widths: [225, 225],
          body: [
            ['Sprawozdanie Sprawdził', 'Sprawozdanie wykonał'],
            [`${this.data.reviewer}`, `${this.data.executor}`],
          ],
        },
      },
      {
        style: 'info',
        text: 'Sprawozdanie jest integralną całością.\n Może być udostępniane stronom trzecim tylko w całości i za zgodą Zleceniodawcy',
      },
    ]);
  }
}
