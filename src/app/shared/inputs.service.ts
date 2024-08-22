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
        is_power: false,
        voltage: 'AC 230 V',
        power: '',
        security: '1',
        cable: '',
        screen: '',
        cable_length: '',
        connection: '',
      },
      object_signal: {
        is_signal: true,
        conn_number: '2',
        connections: [
          {
            cable: 'test1',
            cable_length: '2',
            connection: 'RJ45',
            name: 'Złącze rodzaju 1',
            screen: 'Tak',
          },
          {
            cable: 'test2',
            cable_length: '2',
            connection: 'RJ45',
            name: 'Złącze typu 2',
            screen: 'Nie',
          },
        ],
      },
      object_mode: {
        modes: '2',
        modes_desc: {
          mode1: 'test',
          mode2: 'test2'
        },
      },
      object_others: {
        criterion: 'A',
        date: '21/08/2024',
        representative: '',
      },
      results: {
        emission: [],
        endurance: ['pn_en_42', 'en43', 'en44', 'en45', 'en46', 'en48'],
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
        is_table_top: false,
        is_floor_standing: false,
      },
      en45: {
        basic_data: {
          temperature: 0,
          pressure: 0,
          humidity: 0,
          devices: [],
          comment: '',
          result: '',
          contractor: '',
        },
        security_class: '',
        power: [],
        signal: [],
        interface_angle: '0, 90, 180, 270',
        positive_bursts: 5,
        negative_bursts: 5,
        bursts_gap: '30',
        picture: null,
      },
      en46: {
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
        picture: null,
      },
      en48: {
        basic_data: {
          devices: [],
          comment: '',
          result: '',
          contractor: '',
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
