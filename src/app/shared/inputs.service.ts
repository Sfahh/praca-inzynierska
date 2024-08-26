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
        project_nr: '1',
        principal: 'PPW WARSZAWSKA',
        object: 'TESTOWY OBIEKT',
        place: 'LABOERATORIUM',
        isEmission: true,
        isEndurance: true,
        date: '21/10/2021',
        executor: 'Stanisław Być',
        reviewer: 'Andrzej Łasica',
      },
      object_power: {
        is_power: true,
        voltage: 'AC 230 V',
        power: '10',
        security: '1',
        cable: '3, 14',
        screen: 'Tak',
        cable_length: '12',
        connection: 'RJ45',
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
          mode2: 'test2',
        },
      },
      object_others: {
        criterion: 'A',
        date: '21/08/2024',
        representative: '',
      },
      results: {
        emission: [],
        endurance: [
          {
            norm: 'pn_en_42',
            specs: 'PN-EN 61000-6-1',
            criterion: 'A',
            result: 'pozytywny',
          },
          {
            norm: 'en43',
            specs: 'PN-EN 61000-6-2',
            criterion: 'B',
            result: 'negatywny',
          },
          {
            norm: 'en44',
            specs: 'PN-EN 61000-6-3',
            criterion: 'C',
            result: 'pozytywny',
          },
          {
            norm: 'en45',
            specs: 'PN-EN 61000-6-4',
            criterion: 'C',
            result: 'pozytywny',
          },
          {
            norm: 'en46',
            specs: 'PN-EN 61000-6-5',
            criterion: 'B',
            result: 'negatywny',
          },
          {
            norm: 'en48',
            specs: 'PN-EN 61000-6-6',
            criterion: 'A',
            result: 'pozytywny',
          },
        ],
      },
      pn_en_42: {
        basic_data: {
          temperature: 23,
          pressure: 1000,
          humidity: 40,
          devices: ['Amperomierz'],
          comment:
            'Testowy komentarz dość długi taktaktak taktaktak taktaktaktaktaktak taktaktaktaktaktaktaktaktak',
          result: 'Pozytywny',
          contractor: 'Stanisław Być',
          date: '22/08/2024',
        },
        is_table_top: true,
        is_floor_standing: true,
        table_top: {
          contact: {
            level: '+/- 4',
            criterion: 'A',
            required_crit: 'A',
            picture: '',
          },
          air: {
            level: '+/- 8',
            criterion: 'A',
            required_crit: 'B',
            picture: '',
          },
          vcp: {
            level: '+/- 4',
            criterion: 'B',
            required_crit: 'B',
            picture: '',
          },
          hcp: {
            level: '+/- 4',
            criterion: 'C',
            required_crit: 'C',
            picture: '',
          },
        },
        floor_standing: {
          contact: {
            level: '+/- 4',
            criterion: 'C',
            required_crit: 'C',
            picture: '',
          },
          air: {
            level: '+/- 8',
            criterion: 'A',
            required_crit: 'A',
            picture: '',
          },
          vcp: {
            level: '+/- 4',
            criterion: 'B',
            required_crit: 'B',
            picture: '',
          },
        },
      },
      en43: {
        basic_data: {
          temperature: 23,
          pressure: 1000,
          humidity: 40,
          devices: ['Amperomierz'],
          comment:
            'Testowy komentarz dość długi taktaktak taktaktak taktaktaktaktaktak taktaktaktaktaktaktaktaktak',
          result: 'Pozytywny',
          contractor: 'Stanisław Być',
          date: '22/08/2024',
        },
        frequency: '500',
        modulation: '80% AM, 1 kHz ',
        level: '3',
        criterion: 'A',
        req_criterion: 'A',
        picture: '',
      },
      en44: {
        basic_data: {
          temperature: 23,
          pressure: 1000,
          humidity: 40,
          devices: ['Amperomierz'],
          comment:
            'Testowy komentarz dość długi taktaktak taktaktak taktaktaktaktaktak taktaktaktaktaktaktaktaktak',
          result: 'Pozytywny',
          contractor: 'Stanisław Być',
          date: '22/08/2024',
        },
        power: [
          {
            name: 'Port Zasilania',
            level: '2',
            frequency: '100',
            repetition: '2',
            criterion: 'B',
            req_criterion: 'B',
          },
        ],
        signal: [
          {
            name: 'Port Sygnałowy 1',
            level: '1',
            frequency: '5',
            repetition: '2',
            criterion: 'C',
            req_criterion: 'C',
          },
          {
            name: 'Port Sygnałowy 2',
            level: '0,5',
            frequency: '100',
            repetition: '2',
            criterion: 'A',
            req_criterion: 'A',
          },
        ],
        is_table_top: true,
        is_floor_standing: true,
      },
      en45: {
        basic_data: {
          temperature: 23,
          pressure: 1000,
          humidity: 40,
          devices: ['Amperomierz'],
          comment:
            'Testowy komentarz dość długi taktaktak taktaktak taktaktaktaktaktak taktaktaktaktaktaktaktaktak',
          result: 'Pozytywny',
          contractor: 'Stanisław Być',
          date: '22/08/2024',
        },
        security_class: '1',
        power: [
          {
            interface: 'L-PE',
            impedance: 12,
            level: 1,
            criterion: 'A',
            req_criterion: 'A',
          },
          {
            interface: 'N-PE',
            impedance: 12,
            level: 2,
            criterion: 'B',
            req_criterion: 'B',
          },
        ],
        signal: [
          {
            port: 'Port sygnałowy 1',
            interface: 'bezpośrednio w ekran',
            impedance: 2,
            level: 0.5,
            criterion: 'B',
            req_criterion: 'B',
          },
          {
            port: 'Port sygnałowy 2',
            interface: 'CDN117',
            impedance: 40,
            level: 0.5,
            criterion: 'A',
            req_criterion: 'A',
          },
        ],
        interface_angle: '0, 90, 180, 270',
        positive_bursts: 5,
        negative_bursts: 5,
        bursts_gap: '30',
        picture: null,
      },
      en46: {
        basic_data: {
          temperature: 23,
          pressure: 1000,
          humidity: 40,
          devices: ['Amperomierz'],
          comment:
            'Testowy komentarz dość długi taktaktak taktaktak taktaktaktaktaktak taktaktaktaktaktaktaktaktak',
          result: 'Pozytywny',
          contractor: 'Stanisław Być',
          date: '22/08/2024',
        },
        power: [
          {
            port: 'Port zasilania',
            frequency: '2-5',
            modulation: '80% AM, 1 kHz',
            level: '3',
            criterion: 'A',
            req_criterion: 'A',
          },
        ],
        signal: [
          {
            port: 'Port sygnałowy 1',
            frequency: '2-10',
            modulation: '82% AM, 2 kHz',
            level: '4',
            criterion: 'C',
            req_criterion: 'C',
          },
          {
            port: 'Port sygnałowy 2',
            frequency: '0.15-20',
            modulation: '85% AM, 3 kHz',
            level: '1',
            criterion: 'B',
            req_criterion: 'B',
          },
        ],
        picture: null,
      },
      en48: {
        basic_data: {
          devices: ['Amperomierz'],
          comment:
            'Testowy komentarz dość długi taktaktak taktaktak taktaktaktaktaktak taktaktaktaktaktaktaktaktak',
          result: 'Pozytywny',
          contractor: 'Stanisław Być',
          date: '22/08/2024',
        },
        level: '3',
        frequency: '24',
        picture: null,
        axis: [
          {
            axis: 'X',
            criterion: 'A',
            req_criterion: 'A',
          },
          {
            axis: 'Y',
            criterion: 'B',
            req_criterion: 'B',
          },
          {
            axis: 'Z',
            criterion: 'C',
            req_criterion: 'C',
          },
        ],
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
