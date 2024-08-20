import { Component, input, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DatePipe } from '@angular/common';
import { En44Results, NormEn44 } from '../../../shared/dictionary';

@Component({
  selector: 'app-en44',
  templateUrl: './en44.component.html',
  styleUrl: './en44.component.scss',
})
export class En44Component implements OnInit {
  componentName: string = 'en44';

  data: NormEn44;

  signal_connections: number = 0;
  conns;

  signalData: En44Results[] = [];
  powerData: En44Results[] = [];

  isPower: boolean = false;
  isSignal: boolean = false;

  date: Date;

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];

  constructor(public inputs: InputsService, public datepipe: DatePipe) {
    this.data = new NormEn44();
  }

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en44;
    this.isPower = this.inputs.inputs?.object_power.is_power;
    this.isSignal = this.inputs.inputs?.object_signal.is_signal;
    // this.date = new Date(this.data.basic_data.date);
    this.signal_connections = +this.inputs.inputs?.object_signal.conn_number;
    this.conns = Array.from(
      new Array(this.signal_connections),
      (x, i) => i + 1
    );
    if (this.isPower) {
      let power = new En44Results();
      this.powerData.push(power);
    }
    if (this.isSignal) {
      console.log('test');
      this.conns.forEach((el) => {
        el = new En44Results();
        this.signalData.push(el);
      });
      console.log(this.signalData);
    }
    console.log(this.signal_connections);
  }

  next() {
    this.data.power = this.powerData;
    this.data.signal = this.signalData;
    this.data.basic_data.date = this.datepipe.transform(
      this.date,
      'dd/MM/yyyy'
    );
    this.inputs.updateInputs('en_44', this.data);
    console.log(this.inputs.inputs);
  }
}
