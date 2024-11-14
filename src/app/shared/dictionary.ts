export class BasicInfo {
  project_nr: string = null;
  principal: string = null;
  object: string = null;
  place: string = null;
  isEmission: string = null;
  isEndurance: string = null;
  date: string = null;
  executor: string = null;
  reviewer: string = null;
}

export class ObjectPower {
  is_power: boolean = false;
  voltage: string = 'AC 230 V';
  power: string = null;
  security: number = null;
  cable: string = null;
  screen: string;
  cable_length: number = null;
  connection: string = null;
}

export class ObjectSignalDetail {
  name: string = null;
  cable: string = null;
  screen: string = null;
  cable_length: number = null;
  connection: string = null;
}

export class ObjectSignal {
  is_signal: boolean = false;
  conn_number: string;
  connections: ObjectSignalDetail[] = [];
}

export class ObjectMode {
  modes: number = null;
  modes_desc: {
    [key: string]: string;
  };
}

export class ObjectOthers {
  criterion: string = null;
  date: string = null;
  representative: string = null;
}

export class Emission {
  norm: string = null;
  specs: string = null;
  result: string = null;
}
export class Endurance {
  norm: string = null;
  specs: string = null;
  criterion: string = null;
  result: string = null;
}

export class Results {
  emission: Emission[] = [];
  endurance: Endurance[] = [];
}

export class NormBasicData {
  temperature?: number = 0;
  pressure?: number = 0;
  humidity?: number = 0;
  devices?: Array<string> = [];
  comment?: string = null;
  result?: 'pozytywny' | 'negatywny' | null = null;
  contractor?: string = null;
  date?: string = null;
}

export class DeviceResult {
  level: string = null;
  criterion: string = null;
  required_crit: string = null;
  picture: any;
}

export class NormPnEn42 {
  basic_data: NormBasicData = {
    temperature: 0,
    pressure: 0,
    humidity: 0,
    devices: [],
    comment: null,
    result: null,
    contractor: null,
    date: null,
  };
  is_table_top: boolean = false;
  is_floor_standing: boolean = false;
  table_top: {
    [key: string]: DeviceResult;
  };
  floor_standing: {
    [key: string]: DeviceResult;
  };
}
export class NormEn43 {
  basic_data: NormBasicData = {
    temperature: 0,
    pressure: 0,
    humidity: 0,
    devices: [],
    comment: null,
    result: null,
    contractor: null,
    date: null,
  };
  frequency: string = null;
  modulation: string = null;
  level: string = null;
  criterion: string = null;
  req_criteerion: string = null;
  picture: any = [];
}

export class En44Results {
  name: string = null;
  level: string = null;
  frequency: string = null;
  repetition: string = null;
  criterion: string = null;
  req_criterion: string = null;
}
export class NormEn44 {
  basic_data: NormBasicData = {
    temperature: 0,
    pressure: 0,
    humidity: 0,
    devices: [],
    comment: null,
    result: null,
    contractor: null,
    date: null,
  };
  picture: any = [];
  is_table_top: boolean = false;
  is_floor_standing: boolean = false;
  power: En44Results[] = [];
  signal: En44Results[] = [];
}

export class En45Results {
  port?: string = null;
  interface: string = null;
  impedance: number = null;
  level: number = null;
  criterion: string = null;
  req_criterion: string = null;
}

export class NormEn45 {
  basic_data: NormBasicData = {
    temperature: 0,
    pressure: 0,
    humidity: 0,
    devices: [],
    comment: null,
    result: null,
    contractor: null,
    date: null,
  };
  security_class: string;
  power: En45Results[] = [];
  signal: En45Results[] = [];
  interface_angle: string = null;
  positive_bursts: number = null;
  negative_bursts: number = null;
  bursts_gap: string = null;
  picture: any = null;
}

export class En46Results {
  port: string = null;
  frequency: string = null;
  modulation: string = null;
  level: string = null;
  criterion: string = null;
  req_criterion: string = null;
}

export class NormEn46 {
  basic_data: NormBasicData = {
    temperature: 0,
    pressure: 0,
    humidity: 0,
    devices: [],
    comment: null,
    result: null,
    contractor: null,
    date: null,
  };
  power: En46Results[] = [];
  signal: En46Results[] = [];
  picture: any = null;
}

export class En48Results {
  axis: 'X' | 'Y' | 'Z' | null = null;
  criterion: string = null;
  req_criterion: string = null;
}

export class NormEn48 {
  basic_data: NormBasicData = {
    devices: [],
    comment: null,
    result: null,
    contractor: null,
    date: null,
  };
  axis: En48Results[] = [];
  level: string = null;
  frequency: string = null;
  picture: any = null;
}

export class En411Results {
  datum_level: string = 'AC 230';
  frequency: string = null;
  level: string = null;
  period_nr: string = null;
  criterion: string;
  req_criterion: string;
}
export class NormEn411 {
  basic_data: NormBasicData = {
    devices: [],
    comment: null,
    result: null,
    contractor: null,
    date: null,
  };
  results: En411Results[] = [];
  repetition: string;
  repetition_gap: string;
  picture: any;
}

export class norms {
  key: string;
  value: string;
}

export const Norms: norms[] = [
  {
    key: 'PN-EN 61000-4-2',
    value: 'pn_en_42',
  },
  {
    key: 'EN 61000-4-3',
    value: 'en43',
  },
  {
    key: 'EN 61000-4-4',
    value: 'en44',
  },
  {
    key: 'EN 61000-4-5',
    value: 'en45',
  },
  {
    key: 'EN 61000-4-6',
    value: 'en46',
  },
  {
    key: 'EN 61000-4-8',
    value: 'en48',
  },
  {
    key: 'EN 61000-4-11',
    value: 'en411',
  },
];
