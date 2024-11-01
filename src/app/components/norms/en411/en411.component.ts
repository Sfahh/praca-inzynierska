import { Component, inject, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../../shared/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { En411Results, NormEn411 } from '../../../shared/dictionary';

@Component({
  selector: 'app-en411',
  templateUrl: './en411.component.html',
  styleUrl: './en411.component.scss',
})
export class En411Component implements OnInit {
  private _snackBar = inject(MatSnackBar);
  componentName: string = 'en411';
  normIndex;

  data: NormEn411;
  results: En411Results[] = [];

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];

  constructor(
    public inputs: InputsService,
    public datepipe: DatePipe,
    public reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en411;
    console.log(this.data);

    this.results = this.data.results ? this.data.results : [];
    if (this.results.length === 0) {
      console.log(this.results);

      for (let i = 1; i <= 5; i++) {
        let result = new En411Results();
        this.results.push(result);
        console.log(this.results);
      }
    }

    this.normIndex = this.inputs.inputs.results.endurance.findIndex(
      (item) => item.norm === this.componentName
    );
  }

  addResult() {
    let result = new En411Results();
    this.results.push(result);
  }

  deleteResult(index) {
    this.results.splice(index, 1);
  }

  next(isSave?: boolean) {
    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.data.results = this.results;
    this.inputs.updateInputs('en411', this.data);
    console.log(this.inputs.inputs);
    // console.log(this.selectedFile);
    // this.fileToBase64(this.selectedFile.files);
    this.reportService.createSections();
    if (isSave) {
      this._snackBar.open('Pomyślnie zapisano', 'Ok');
    }
  }
}
