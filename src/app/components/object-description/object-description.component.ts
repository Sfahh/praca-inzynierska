import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../shared/report.service';
import { InputsService } from '../../shared/inputs.service';
import {
  ObjectMode,
  ObjectOthers,
  ObjectPower,
  ObjectSignal,
  ObjectSignalDetail,
} from '../../shared/dictionary';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-object-description',
  templateUrl: './object-description.component.html',
  styleUrl: './object-description.component.scss',
})
export class ObjectDescriptionComponent implements OnInit {
  isPower: boolean = false;
  isSignal: boolean = false;
  dataPower: ObjectPower;
  dataSignal: ObjectSignal;

  dataMode: ObjectMode;
  dataOthers: ObjectOthers;
  connections: ObjectSignalDetail[] = [];

  constructor(
    public reportService: ReportService,
    public inputs: InputsService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.dataPower = this.inputs.inputs?.object_power;
    this.dataSignal = this.inputs.inputs?.object_signal;
    this.dataMode = this.inputs.inputs?.object_mode;
    this.dataOthers = this.inputs.inputs?.object_others;
    this.connections = this.inputs.inputs?.object_signal.connections;
    console.log('t');
  }

  countConnectionsSignal(value) {
    console.log(value);
    let arr = [];
    // let numbers = Array(+value)
    //   .fill(0)
    //   .map((x, i) => i);

    for (let i = 1; i <= +value.data; i++) {
      let signal = new ObjectSignalDetail();
      arr.push(signal);
    }
    this.connections = arr;
  }
  countConnections(value) {
    let numbers = Array(+value)
      .fill(0)
      .map((x, i) => i);
    return numbers;
  }

  next() {
    this.dataPower.is_power = this.isPower;
    this.dataSignal.is_signal = this.isSignal;
    this.dataOthers.date = this.datepipe.transform(
      this.dataOthers.date,
      'dd/MM/yyyy'
    );
    this.dataSignal.connections = this.connections;
    this.inputs.updateInputs('object_power', this.dataPower);
    this.inputs.updateInputs('object_signal', this.dataSignal);
    this.inputs.updateInputs('object_mode', this.dataMode);
    this.inputs.updateInputs('object_others', this.dataOthers);
    console.log(this.inputs.inputs);
  }
}
