import { Injectable, OnInit } from '@angular/core';
import { BasicInfo, ObjectMode, ObjectPower, ObjectSignal } from './dictionary';

@Injectable({
  providedIn: 'root',
})
export class InputsService {
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
        isEmission: true,
        isEndurance: true,
        date: '',
        executor: '',
        reviewer: '',
      },
      object_power: {
        is_power: true,
        voltage: 'AC 230 V',
        power: '',
        security: '',
        cable: '',
        screen: '',
        cable_length: '',
        connection: '',
      },
      object_signal: {
        is_signal: true,
        conn_number: '2',
        connections: {},
        cable: '',
        screen: '',
        cable_length: '',
        connection: '',
      },
      object_mode: {
        modes: '',
        modes_desc: {},
      },
      object_others: {
        criterion: '',
        date: '',
        representative: '',
      },
      results: {
        emission: [],
        endurance: [],
      },
      pn_en_42: {
        basic_data: {
          temperature: 0,
          pressure: 0,
          humidity: 0,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
        },
        is_table_top: false,
        is_floor_standing: false,
        table_top: {
          contact: {
            level: '',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          air: {
            level: '',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          vcp: {
            level: '',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          hcp: {
            level: '',
            criterion: '',
            required_crit: '',
            picture: '',
          },
        },
        floor_standing: {
          contact: {
            level: '',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          air: {
            level: '',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          vcp: {
            level: '',
            criterion: '',
            required_crit: '',
            picture: '',
          },
        },
      },
      en43: {
        basic_data: {
          temperature: 0,
          pressure: 0,
          humidity: 0,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
        },
        frequency: '',
        modulation: '80% AM, 1 kHz ',
        level: '',
        criterion: '',
        req_criterion: '',
        picture: '',
      },
      en44: {
        basic_data: {
          temperature: 0,
          pressure: 0,
          humidity: 0,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
        },
        power: [],
        signal: [],
      },
    };
  }

  get getInputs() {
    return this.inputs;
  }

  public updateInputs(obj, value) {
    this.inputs[obj] = value;
  }
}
