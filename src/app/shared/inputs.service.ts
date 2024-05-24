import { Injectable, OnInit } from '@angular/core';
import { BasicInfo, ObjectMode, ObjectPower, ObjectSignal } from './dictionary';

@Injectable({
  providedIn: 'root'
})
export class InputsService{
  public inputs: any = {};

  constructor() {
    this.inputs = {
      is_prev: false,
      is_edit: false,
      basic_info: {
        project_nr: '',
        principal: '',
        object: '',
        place: '',
        isEmission: '',
        isEndurance: '',
        date: '',
        executor: '',
        reviewer: ''
      },
      object_power: {
        voltage: 'AC 230 V',
        power: '',
        security: '',
        cable: '',
        screen: '',
        cable_length: '',
        connection: ''
      },
      object_signal: {
        conn_number: '',
        connections: {},
        cable: '',
        screen: '',
        cable_length: '',
        connection: ''
      },
      object_mode: {
        modes: '',
        modes_desc: {}
      },
      object_others: {
        criterion: '',
        date: '',
        representative: ''
      }
    }
   }

   get getInputs(){
    return this.inputs
   }

   

  public updateInputs(obj, value){
    this.inputs[obj] = value
  }
}
