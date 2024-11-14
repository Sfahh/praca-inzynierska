import { Component, inject, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DatePipe } from '@angular/common';
import { En46Results, NormEn46 } from '../../../shared/dictionary';
import { ReportService } from '../../../shared/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-en46',
  templateUrl: './en46.component.html',
  styleUrl: './en46.component.scss',
})
export class En46Component implements OnInit {
  private _snackBar = inject(MatSnackBar);
  componentName: string = 'en46';

  data: NormEn46;
  dataSignal: En46Results[] = [];
  dataPower: En46Results[] = [];

  signal;
  connectionsNr;
  connectionsNrArr;

  isSignal: boolean = false;
  isPower: boolean = false;

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];

  normIndex: number;

  constructor(
    public inputs: InputsService,
    public datepipe: DatePipe,
    public reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en46;
    this.isPower = this.inputs.inputs?.object_power.is_power;
    this.isSignal = this.inputs.inputs?.object_signal.is_signal;
    this.dataPower = this.data.power ? this.data.power : [];
    this.dataSignal = this.data.signal ? this.data.signal : [];
    this.signal = this.inputs.inputs?.object_signal.connections;
    this.connectionsNr = +this.inputs.inputs?.object_signal.conn_number;
    this.connectionsNrArr = Array.from(
      new Array(this.connectionsNr),
      (x, i) => i + 1
    );
    if (this.isPower && this.dataPower.length === 0) {
      let power = new En46Results();
      this.dataPower.push(power);
    }
    if (this.isSignal && this.dataSignal.length === 0) {
      this.connectionsNrArr.forEach((el, index) => {
        el = new En46Results();
        el.port = this.signal[index].name;
        this.dataSignal.push(el);
      });
    }
    console.log(this.dataSignal);
    console.log(this.dataPower);
    this.normIndex = this.inputs.inputs.results.endurance.findIndex(
      (item) => item.norm === this.componentName
    );
  }

  fileToBase64(files: []) {
    this.data.picture = [];
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
    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.data.power = this.dataPower;
    this.data.signal = this.dataSignal;
    this.inputs.updateInputs('en46', this.data);
    console.log(this.inputs.inputs);
    this.reportService.createSections();
    if (isSave) {
      this._snackBar.open('Pomyślnie zapisano', 'Ok');
    }
  }
}
