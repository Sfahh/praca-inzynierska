import { Component, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DatePipe } from '@angular/common';
import { En45Results, NormEn45 } from '../../../shared/dictionary';

@Component({
  selector: 'app-en45',
  templateUrl: './en45.component.html',
  styleUrl: './en45.component.scss',
})
export class En45Component implements OnInit {
  data: NormEn45;
  dataPower: En45Results[] = [];
  dataSignal: En45Results[] = [];
  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];
  isPower: boolean = false;
  isSignal: boolean = false;
  signal_connections: number = 0;
  conns;
  security;
  screen;

  constructor(public inputs: InputsService, public datepipe: DatePipe) {}

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en45;
    this.security = this.inputs.inputs?.object_power.security;
    this.screen = this.inputs.inputs?.object_signal.screen;
    this.isPower = this.inputs.inputs?.object_power.is_power;
    this.isSignal = this.inputs.inputs?.object_signal.is_signal;
    // this.date = new Date(this.data.basic_data.date);
    this.signal_connections = +this.inputs.inputs?.object_signal.conn_number;
    this.conns = Array.from(
      new Array(this.signal_connections),
      (x, i) => i + 1
    );
    if (this.isPower) {
      this.countPowerDetail();
      console.log(this.dataPower);
    }
    if (this.isSignal) {
      console.log('test');
      this.conns.forEach((el) => {
        el = new En45Results();
        el.interface =
          this.screen === 'Tak' ? 'bezpośrednio w ekran' : 'CDN117';
        this.dataSignal.push(el);
      });
      console.log(this.dataSignal);
    }
  }

  countPowerDetail() {
    if (+this.security === 1) {
      for (let i = 0; i <= 1; i++) {
        let power = new En45Results();
        this.dataPower.push(power);
      }
      this.dataPower[0].interface = 'L-PE';
      this.dataPower[1].interface = 'N-PE';
    } else {
      let power = new En45Results();
      this.dataPower.push(power);
      this.dataPower[0].interface = 'L-N';
    }
  }

  next() {
    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.inputs.updateInputs('en_45', this.data);
    console.log(this.inputs.inputs);
  }
}