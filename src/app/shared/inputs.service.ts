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
        isEmission: null,
        isEndurance: true,
        date: '',
        executor: '',
        reviewer: '',
      },
      object_power: {
        is_power: null,
        voltage: 'AC 230 V',
        power: '',
        security: '',
        cable: '',
        screen: '',
        cable_length: '',
        connection: '',
      },
      object_signal: {
        is_signal: null,
        conn_number: '',
        connections: [],
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
          temperature: null,
          pressure: null,
          humidity: null,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
          date: '',
        },
        is_table_top: null,
        is_floor_standing: null,
        table_top: {
          contact: {
            level: '+/- 4',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          air: {
            level: 'do +/- 8',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          vcp: {
            level: '+/- 4',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          hcp: {
            level: '+/- 4',
            criterion: '',
            required_crit: '',
            picture: '',
          },
        },
        floor_standing: {
          contact: {
            level: '+/- 4',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          air: {
            level: 'do +/- 8',
            criterion: '',
            required_crit: '',
            picture: '',
          },
          vcp: {
            level: '+/- 4',
            criterion: '',
            required_crit: '',
            picture: '',
          },
        },
      },
      en43: {
        basic_data: {
          temperature: null,
          pressure: null,
          humidity: null,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
          date: '',
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
          temperature: null,
          pressure: null,
          humidity: null,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
          date: '',
        },
        power: [],
        signal: [],
        is_table_top: null,
        is_floor_standing: null,
      },
      en45: {
        basic_data: {
          temperature: null,
          pressure: null,
          humidity: null,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
          date: '',
        },
        security_class: '',
        power: [],
        signal: [],
        interface_angle: '',
        positive_bursts: null,
        negative_bursts: null,
        bursts_gap: '',
        picture: null,
      },
      en46: {
        basic_data: {
          temperature: null,
          pressure: null,
          humidity: null,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
          date: '',
        },
        power: [],
        signal: [],
        picture: null,
      },
      en48: {
        basic_data: {
          devices: [],
          comment: '',
          result: '',
          contractor: '',
          date: '',
        },
        level: '',
        frequency: '',
        picture: null,
        axis: [],
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
