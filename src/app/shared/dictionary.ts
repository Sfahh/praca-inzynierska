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
  temperature: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  devices: Array<string> = [];
  comment: string = null;
  result: 'pozytywny' | 'negatywny' | null = null;
  contractor: string = null;
  date: string = null;
}

export class DeviceResult {
  level: string = null;
  criterion: string = null;
  required_crit: string = null;
  picture: File;
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
  picture: File = null;
}

export class En44Results {
  name: string = null;
  level: string = null;
  frequency: string = null;
  repetition: string = null;
  criterion: string = null;
  req_criterion: string = null;
  picture: File = null;
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
  picture: File = null;
}
