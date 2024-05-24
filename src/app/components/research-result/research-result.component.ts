import { Component, OnInit } from '@angular/core';
import { InputsService } from '../../shared/inputs.service';

@Component({
  selector: 'app-research-result',
  templateUrl: './research-result.component.html',
  styleUrl: './research-result.component.scss'
})
export class ResearchResultComponent implements OnInit {
  isEmission: boolean;
  isEndurance: boolean;

  constructor(public inputs: InputsService){}

  ngOnInit(): void {
    this.isEmission = this.inputs.inputs?.basic_info.isEmission
    this.isEndurance = this.inputs.inputs?.basic_info.isEndurance
  }

  next(){
    // this.dataOthers.date = this.datepipe.transform(this.dataOthers.date, 'dd/MM/yyyy');
    // this.inputs.updateInputs('object_power', this.dataPower)
    // this.inputs.updateInputs('object_signal', this.dataSignal)
    // this.inputs.updateInputs('object_mode', this.dataMode)
    // this.inputs.updateInputs('object_others', this.dataOthers)
    // console.log(this.inputs.inputs)
  }

}
