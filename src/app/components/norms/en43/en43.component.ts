import { Component, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { NormEn43 } from '../../../shared/dictionary';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-en43',
  templateUrl: './en43.component.html',
  styleUrl: './en43.component.scss',
})
export class En43Component implements OnInit {
  data: NormEn43;
  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];
  levels = ['3', '10'];

  constructor(public inputs: InputsService, public datepipe: DatePipe) {
    this.data = new NormEn43();
  }

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en43;
    console.log('test');
  }
  next() {
    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.inputs.updateInputs('en_43', this.data);
    console.log(this.inputs.inputs);
  }
}
