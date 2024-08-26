import { Component, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DeviceResult, NormPnEn42 } from '../../../shared/dictionary';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pn-en42',
  templateUrl: './pn-en42.component.html',
  styleUrl: './pn-en42.component.scss',
})
export class PnEn42Component implements OnInit {
  componentName: string = 'pn_en_42';

  normIndex: number;

  data: NormPnEn42;

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];

  constructor(public inputs: InputsService, public datepipe: DatePipe) {
    this.data = new NormPnEn42();
  }

  ngOnInit(): void {
    this.data = this.inputs.inputs?.pn_en_42;
    this.normIndex = this.inputs.inputs.results.endurance.findIndex(
      (item) => item.norm === this.componentName
    );
  }

  next() {
    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.inputs.updateInputs('pn_en_42', this.data);
    console.log(this.inputs.inputs);
  }
}
