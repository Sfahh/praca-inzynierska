export class BasicInfo {
    project_nr: string = null;
    principal: string = null;
    object: string = null;
    place: string = null;
    isEmission: string = null;
    isEndurance: string = null;
    date: string = null
    executor: string = null;
    reviewer: string = null;
}

export class ObjectPower {
    voltage: string = 'AC 230 V';
    power: string = null;
    security: number = null;
    cable: string = null;
    screen: string;
    cable_length: number = null;
    connection: string = null;
}

export class ObjectSignal {
    conn_number: string;
    connections: {
        [key: string]: string;
    };
    cable: string = null;
    screen: string;
    cable_length: number = null;
    connection: string = null;
}

export class ObjectMode{
    modes: number = null;
    modes_desc: {
        [key: string]: string;
    }
}

export class ObjectOthers{
    criterion: string = null;
    date: string = null;
    representative: string = null;
}