import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../shared/report.service';
import { InputsService } from '../../shared/inputs.service';
import { ObjectMode, ObjectPower, ObjectSignal } from '../../shared/dictionary';

@Component({
  selector: 'app-object-description',
  templateUrl: './object-description.component.html',
  styleUrl: './object-description.component.scss'
})
export class ObjectDescriptionComponent implements OnInit{
  isPower: boolean = false;
  isSignal: boolean = false;
  dataPower: ObjectPower;
  dataSignal: ObjectSignal;
  dataMode: ObjectMode

  constructor(public reportService: ReportService, public inputs: InputsService){}
  
  ngOnInit(): void {
    this.dataPower = this.inputs.inputs?.object_power
    this.dataSignal = this.inputs.inputs?.object_signal
    this.dataMode = this.inputs.inputs?.object_mode
    console.log('t')
    
  }

  countConnections(value){
    let numbers = Array(+value).fill(0).map((x, i) =>i);
    return numbers
  }

  next(){
    console.log(this.dataSignal)
    console.log(this.dataMode)
    console.log(this.dataPower)
    this.inputs.updateInputs('object_power', this.dataPower)
    this.inputs.updateInputs('object_signal', this.dataSignal)
    this.inputs.updateInputs('object_mode', this.dataMode)
    console.log(this.inputs.inputs)
  }
    
}
