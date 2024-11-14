import { Component, inject, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DatePipe } from '@angular/common';
import { En45Results, NormEn45 } from '../../../shared/dictionary';
import { ReportService } from '../../../shared/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-en45',
  templateUrl: './en45.component.html',
  styleUrl: './en45.component.scss',
})
export class En45Component implements OnInit {
  private _snackBar = inject(MatSnackBar);

  componentName: string = 'en45';

  data: NormEn45;
  dataPower: En45Results[] = [];
  dataSignal: En45Results[] = [];

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];

  isPower: boolean = false;
  isSignal: boolean = false;

  signal_connections: number = 0;
  conns;
  signalDetail;

  security;

  normIndex: number;

  constructor(
    public inputs: InputsService,
    public datepipe: DatePipe,
    public reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en45;
    this.security = this.inputs.inputs?.object_power.security;
    this.signalDetail = this.inputs.inputs?.object_signal.connections;
    console.log(this.signalDetail);

    this.isPower = this.inputs.inputs?.object_power.is_power;
    this.isSignal = this.inputs.inputs?.object_signal.is_signal;
    this.dataPower = this.data.power;
    this.dataSignal = this.data.signal;
    // this.date = new Date(this.data.basic_data.date);
    this.signal_connections = +this.inputs.inputs?.object_signal.conn_number;
    this.conns = Array.from(
      new Array(this.signal_connections),
      (x, i) => i + 1
    );
    if (this.isPower && this.dataPower.length === 0) {
      this.countPowerDetail();
      console.log(this.dataPower);
    }
    if (this.isSignal && this.dataSignal.length === 0) {
      console.log('test');
      this.conns.forEach((el, index) => {
        console.log(index);
        el = new En45Results();
        el.interface =
          this.signalDetail[index].screen === 'Tak'
            ? 'bezpośrednio w ekran'
            : 'CDN117';
        el.port = this.signalDetail[index].name;
        this.dataSignal.push(el);
      });
      console.log(this.dataSignal);
    }
    this.normIndex = this.inputs.inputs.results.endurance.findIndex(
      (item) => item.norm === this.componentName
    );
  }

  countPowerDetail() {
    if (+this.security === 1) {
      for (let i = 0; i <= 2; i++) {
        let power = new En45Results();
        this.dataPower.push(power);
      }
      this.dataPower[0].interface = 'L-PE';
      this.dataPower[1].interface = 'N-PE';
      this.dataPower[2].interface = 'L-N';
    } else {
      let power = new En45Results();
      this.dataPower.push(power);
      this.dataPower[0].interface = 'L-N';
    }
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
    this.inputs.updateInputs('en_45', this.data);
    console.log(this.inputs.inputs.en_45);

    console.log(this.inputs.inputs);
    this.reportService.createSections();
    if (isSave) {
      this._snackBar.open('Pomyślnie zapisano', 'Ok');
    }
  }
}
