import { Component, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DatePipe } from '@angular/common';
import { En46Results, NormEn46 } from '../../../shared/dictionary';

@Component({
  selector: 'app-en46',
  templateUrl: './en46.component.html',
  styleUrl: './en46.component.scss',
})
export class En46Component implements OnInit {
  data: NormEn46;
  dataSignal: En46Results[] = [];
  dataPower: En46Results[] = [];

  signal;
  connectionsNr;
  connectionsNrArr;

  isSignal: boolean = false;
  isPower: boolean = false;

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];

  constructor(public inputs: InputsService, public datepipe: DatePipe) {}

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en46;
    this.isPower = this.inputs.inputs?.object_power.is_power;
    this.isSignal = this.inputs.inputs?.object_signal.is_signal;
    this.signal = this.inputs.inputs?.object_signal.connections;
    this.connectionsNr = +this.inputs.inputs?.object_signal.conn_number;
    this.connectionsNrArr = Array.from(
      new Array(this.connectionsNr),
      (x, i) => i + 1
    );
    if (this.isPower) {
      let power = new En46Results();
      this.dataPower.push(power);
    }
    if (this.isSignal) {
      this.connectionsNrArr.forEach((el, index) => {
        el = new En46Results();
        el.port = this.signal[index].name;
        this.dataSignal.push(el);
      });
    }
    console.log(this.dataSignal);
    console.log(this.dataPower);
  }

  next() {
    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.data.power = this.dataPower;
    this.data.signal = this.dataSignal;
    this.inputs.updateInputs('en_46', this.data);
    console.log(this.inputs.inputs);
  }
}
