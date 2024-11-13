import { Component, inject, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { NormEn43 } from '../../../shared/dictionary';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../../shared/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-en43',
  templateUrl: './en43.component.html',
  styleUrl: './en43.component.scss',
})
export class En43Component implements OnInit {
  private _snackBar = inject(MatSnackBar);

  data: NormEn43;
  componentName: string = 'en43';

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];
  levels = ['3', '10'];

  normIndex: number;

  constructor(
    public inputs: InputsService,
    public datepipe: DatePipe,
    public reportService: ReportService
  ) {
    this.data = new NormEn43();
  }

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en43;
    this.normIndex = this.inputs.inputs.results.endurance.findIndex(
      (item) => item.norm === this.componentName
    );
    console.log('tes2t');
  }

  fileToBase64(files: []) {
    this.data.picture = [];
    // this.data[type][settings].picture = [];
    files.forEach((el) => {
      const reader = new FileReader();
      reader.readAsDataURL(el);
      reader.onload = () => {
        console.log(reader.result);
        this.data.picture.push(reader.result);
      };
    });
  }

  change(e) {
    const fileKeys = Object.keys(e.target.files);
    let files: any = [];
    console.log(e);
    for (let key of fileKeys) {
      files.push(e.target.files[key]);
    }
    console.log(files);
    this.fileToBase64(files);
  }

  next(isSave?: boolean) {
    console.log(this.data);

    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.inputs.updateInputs('en_43', this.data);
    console.log(this.inputs.inputs);
    this.reportService.createSections();
    if (isSave) {
      this._snackBar.open('Pomyślnie zapisano', 'Ok');
    }
  }
}
