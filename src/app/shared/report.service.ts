import { Injectable, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { InputsService } from './inputs.service';
import { style } from '@angular/animations';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class ReportService implements OnInit {
  basicInfo;
  objInfo;
  objPower;
  objSignal;
  objMode;
  objOthers;
  results;
  pn_en_42;
  en43;
  en44;
  en45;
  en46;
  en48;

  pdfElements: {};

  public docDefinition = {};

  constructor(public inputs: InputsService) {
    console.log('test');
    this.docDefinition = {
      footer: function (currentPage, pageCount) {
        return [
          {
            text: 'Strona ' + currentPage.toString() + ' z ' + pageCount,
            alignment: 'center',
          },
        ];
      },
      content: [
        {
          alignment: 'left',
          columns: [
            {
              // image: 'data:image/png;base64,' + require('fs').readFileSync('src/assets/pw_logo.png').toString('base64')
              // text: 'ZDJĘCIE',
              //TO DO trzeba wyciągnąć base64 ze zdjęcia i robić 'data:image/png;base64,{{TUTAJ BASE64}}'
            },
            {
              text: 'POLITECHNIKA WARSZAWSKA INSTYTUT ELEKTROTECHNIKI TEORETYCZNEJ I SYSTEMÓW INFORMACYJNO POMIAROWYCH ul. Koszykowa 75, 00-662 Warszawa',
            },
          ],
        },
      ],
      styles: {
        table: {
          margin: [0, 5, 0, 15],
        },
        info: {
          margin: [0, 500, 0, 0],
          alignment: 'center',
        },
      },
    };

    this.createSections();
  }
  ngOnInit(): void {
    const inputs = this.inputs.inputs;
  }

  createSections() {
    const inputs = this.inputs.inputs;

    this.basicInfo = [
      {
        style: 'table',
        table: {
          widths: [150, 300],
          body: [
            ['Numer projektu', `${inputs.basic_info?.project_nr}`],
            [
              { rowSpan: 4, text: 'Zleceniodawca' },
              { rowSpan: 4, text: `${inputs.basic_info?.principal}` },
            ],
            ['', ''],
            ['', ''],
            ['', ''],
            ['Obiekt badany', `${inputs.basic_info?.object}`],
            ['Miejsce wykonania badań', `${inputs.basic_info?.place}`],
            // [
            //   { rowSpan: 2, text: 'Zakres badań' },
            //   inputs.basic_info?.isEmission ? 'Emisja' : '',
            // ],
            [
              { rowSpan: 2, text: 'Zakres badań' },
              { rowSpan: 2, text: 'Odporność' },
            ],
            ['Data wydania sprawozdania', `${inputs.basic_info?.date}`],
          ],
        },
      },
      {
        style: 'table',
        table: {
          widths: [225, 225],
          body: [
            ['Sprawozdanie Sprawdził', 'Sprawozdanie wykonał'],
            [
              `${inputs.basic_info?.reviewer}`,
              `${inputs.basic_info?.executor}`,
            ],
          ],
        },
      },
      {
        style: 'info',
        text: 'Sprawozdanie jest integralną całością.\n Może być udostępniane stronom trzecim tylko w całości i za zgodą Zleceniodawcy',
        pageBreak: 'after',
      },
      {
        text: 'Opis badanego obiektu',
      },
      {
        text: 'Porty urządzenia badanego:',
      },
    ];
    this.objPower = !inputs.object_power?.is_power
      ? []
      : [
          {
            text: 'Zasilania',
          },
          {
            style: 'table',
            table: {
              widths: [200, 250],
              body: [
                ['Napięcie', `${inputs.object_power?.voltage}`],
                ['Moc', `${inputs.object_power?.power}`],
                [
                  'Klasa ochronności urządzenia',
                  `${inputs.object_power?.security}`,
                ],
                [
                  'Typ kabla (liczba żył, przekrój)',
                  `${inputs.object_power?.cable}`,
                ],
                ['Ekran', `${inputs.object_power?.screen}`],
                ['Długość kabla', `${inputs.object_power?.cable_length}`],
                ['Złącze', `${inputs.object_power?.connection}`],
              ],
            },
          },
        ];
    this.objSignal = !inputs.object_signal?.is_signal
      ? []
      : [
          {
            text: 'Sygnałowe',
          },
          {
            style: 'table',
            table: {
              widths: [200, 250],
              body: this.createObjectSignalValue(),
            },
          },
        ];

    this.objMode = [
      {
        style: 'table',
        table: {
          widths: [200, 250],
          body: [
            ['Liczba trybów pracy', inputs.object_mode.modes],
            ...Object.keys(inputs.object_mode.modes_desc).map((p, idx) => [
              `Tryb ${idx + 1}`,
              inputs.object_mode.modes_desc[p],
            ]),
          ],
        },
      },
    ];
    this.objOthers = [
      {
        text: [
          'Kryterium oceny \n',
          `Kryterium ${inputs.object_others.criterion} \n`,
          `Data wykonania badań ${inputs.object_others.date} \n`,
          `Przedstawiciele zleceniodawcy obecni w trakcie badań ${inputs.object_others.representative}`,
        ],
        pageBreak: 'after',
      },
    ];
    this.results = [
      {
        text: 'Wyniki badań',
      },
      {
        style: 'table',
        table: {
          widths: [95, 95, 95, 95, 95],
          body: [
            [
              'Norma',
              'Specyfikacja',
              'Szczegółowe wyniki badań',
              'Uzyskane kryterium w trakcie testu',
              'Wynik próby',
            ],
            ...inputs.results.endurance.map((p) => [
              p.norm,
              p.specs,
              '11',
              p.criterion,
              p.result,
            ]),
          ],
        },
      },
    ];
    this.pn_en_42 =
      inputs.results.endurance.findIndex((item) => item.norm === 'pn_en_42') < 0
        ? []
        : [
            {
              text: 'Szczegółowe wyniki odporności zgodnie z PN-EN 61000-4-2 - wyładowania elektrostatyczne ESD',
              pageBreak: 'before',
            },
            this.createBasicData(inputs.pn_en_42.basic_data),
            {
              text: [
                '\nTyp urządzenia:',
                `${inputs.pn_en_42.is_table_top ? '\nTable top' : ''}`,
                `${
                  inputs.pn_en_42.is_floor_standing ? '\nFloor standing\n' : ''
                }`,
              ],
            },
            !inputs.pn_en_42.is_table_top ? {} : { text: '\nTable top' },
            {
              style: 'table',
              table: {
                widths: [118.75, 118.75, 118.75, 118.75],
                body: [
                  [
                    'Typ',
                    'Poziom [kV]',
                    'Osiągnięte kryterium',
                    'Wymagane kryterium',
                  ],
                  [
                    'Contact',
                    inputs.pn_en_42.table_top.contact.level,
                    inputs.pn_en_42.table_top.contact.criterion,
                    inputs.pn_en_42.table_top.contact.required_crit,
                  ],
                  [
                    'Air',
                    inputs.pn_en_42.table_top.air.level,
                    inputs.pn_en_42.table_top.air.criterion,
                    inputs.pn_en_42.table_top.air.required_crit,
                  ],
                  [
                    'VCP',
                    inputs.pn_en_42.table_top.vcp.level,
                    inputs.pn_en_42.table_top.vcp.criterion,
                    inputs.pn_en_42.table_top.vcp.required_crit,
                  ],
                  [
                    'HCP',
                    inputs.pn_en_42.table_top.hcp.level,
                    inputs.pn_en_42.table_top.hcp.criterion,
                    inputs.pn_en_42.table_top.hcp.required_crit,
                  ],
                ],
              },
            },
            !inputs.pn_en_42.is_floor_standing
              ? {}
              : { text: 'Floor standing' },
            {
              style: 'table',
              table: {
                widths: [118.75, 118.75, 118.75, 118.75],
                body: [
                  [
                    'Typ',
                    'Poziom [kV]',
                    'Osiągnięte kryterium',
                    'Wymagane kryterium',
                  ],
                  [
                    'Contact',
                    inputs.pn_en_42.floor_standing.contact.level,
                    inputs.pn_en_42.floor_standing.contact.criterion,
                    inputs.pn_en_42.floor_standing.contact.required_crit,
                  ],
                  [
                    'Air',
                    inputs.pn_en_42.floor_standing.air.level,
                    inputs.pn_en_42.floor_standing.air.criterion,
                    inputs.pn_en_42.floor_standing.air.required_crit,
                  ],
                  [
                    'VCP',
                    inputs.pn_en_42.floor_standing.vcp.level,
                    inputs.pn_en_42.floor_standing.vcp.criterion,
                    inputs.pn_en_42.floor_standing.vcp.required_crit,
                  ],
                ],
              },
            },
            {
              text: [
                'Komentarz: \n',
                inputs.pn_en_42.basic_data.comment,
                '\n\nWynik ',
                inputs.pn_en_42.basic_data.result,
                '\n\nData badania: ',
                inputs.pn_en_42.basic_data.date,
                '\n\nBadania wykonał: ',
                inputs.pn_en_42.basic_data.contractor,
              ],
            },
          ];
    this.en43 =
      inputs.results.endurance.findIndex((item) => item.norm === 'en43') < 0
        ? []
        : [
            {
              text: 'Szczegółowe wyniki odporności zgodnie z EN 61000-4-3 - promieniowane pole EM o częstotliwości radiowej',
              pageBreak: 'before',
            },
            this.createBasicData(inputs.en43.basic_data),
            {
              style: 'table',
              table: {
                widths: [95, 95, 95, 95, 95],
                body: [
                  [
                    'Przedział częstotliwości [MHz]',
                    'Modulacja',
                    'Poziom [V/m]',
                    'Osiągniete kryterium',
                    'Wymagane kryterium',
                  ],
                  [
                    inputs.en43.frequency,
                    inputs.en43.modulation,
                    inputs.en43.level,
                    inputs.en43.criterion,
                    inputs.en43.req_criterion,
                  ],
                ],
              },
            },
            {
              text: [
                'Komentarz: \n',
                inputs.en43.basic_data.comment,
                '\n\nWynik ',
                inputs.en43.basic_data.result,
                '\n\nData badania: ',
                inputs.en43.basic_data.date,
                '\n\nBadania wykonał: ',
                inputs.en43.basic_data.contractor,
              ],
            },
          ];
    this.en44 =
      inputs.results.endurance.findIndex((item) => item.norm === 'en44') < 0
        ? []
        : [
            {
              text: 'Szczegółowe wyniki odporności zgodnie z EN 61000-4-4 - seria szybkich elektrycznych stanów przejściowych (burst/EFT)',
              pageBreak: 'before',
            },
            this.createBasicData(inputs.en44.basic_data),
            {
              text: [
                '\nTyp urządzenia:',
                `${inputs.en44.is_table_top ? '\nTable top' : ''}`,
                `${
                  inputs.en44.is_floor_standing ? '\nFloor standing\n\n' : ''
                }`,
              ],
            },
            {
              style: 'table',
              table: {
                widths: [79.16, 79.16, 79.16, 79.16, 79.16, 79.16],
                body: [
                  [
                    'Port',
                    'Poziom [kV]',
                    'Częstotliwość [kHz]',
                    'Repetition rate',
                    'Osiągnięte kryterium',
                    'Wymagane kryterium',
                  ],
                  [
                    inputs.en44.power[0].name,
                    inputs.en44.power[0].level,
                    inputs.en44.power[0].frequency,
                    inputs.en44.power[0].repetition,
                    inputs.en44.power[0].criterion,
                    inputs.en44.power[0].req_criterion,
                  ],
                  ...inputs.en44.signal.map((p) => [
                    p.name,
                    p.level,
                    p.frequency,
                    p.repetition,
                    p.criterion,
                    p.req_criterion,
                  ]),
                ],
              },
            },
            {
              text: [
                'Komentarz: \n',
                inputs.en43.basic_data.comment,
                '\n\nWynik ',
                inputs.en43.basic_data.result,
                '\n\nData badania: ',
                inputs.en43.basic_data.date,
                '\n\nBadania wykonał: ',
                inputs.en43.basic_data.contractor,
              ],
            },
          ];
    this.en45 =
      inputs.results.endurance.findIndex((item) => item.norm === 'en45') < 0
        ? []
        : [
            {
              text: 'Szczegółowe wyniki odporności zgodnie z EN 61000-4-5 - udary napięciowe (surge)',
              pageBreak: 'before',
            },
            this.createBasicData(inputs.en45.basic_data),
            `\nKlasa ochronności urządzenia: ${inputs.en45.security_class}\n\n`,
            {
              style: 'table',
              table: {
                widths: [79.16, 79.16, 79.16, 79.16, 79.16, 79.16],
                body: [
                  [
                    'Port',
                    'Sprzężenie',
                    'Efektywna impedancja urządzenia [\u03a9]',
                    'Poziom [kV]',
                    'Osiągnięte kryterium',
                    'Wymagane kryterium',
                  ],
                  [
                    { rowSpan: 2, text: 'Zasilanie' },
                    `${+inputs.en45.security_class === 1 ? 'L-PE' : 'L-N'}`,
                    inputs.en45.power[0].impedance,
                    inputs.en45.power[0].level,
                    inputs.en45.power[0].criterion,
                    inputs.en45.power[0].req_criterion,
                  ],
                  +inputs.en45.security_class !== 1
                    ? []
                    : [
                        'N-PE',
                        inputs.en45.power[1].interface,
                        inputs.en45.power[1].impedance,
                        inputs.en45.power[1].level,
                        inputs.en45.power[1].criterion,
                        inputs.en45.power[1].req_criterion,
                      ],
                  ...inputs.en45.signal.map((p) => [
                    p.port,
                    p.interface,
                    p.impedance,
                    p.level,
                    p.criterion,
                    p.req_criterion,
                  ]),
                ],
              },
            },
            {
              text: [
                `\n\nKąty sprzężenia: ${inputs.en45.interface_angle}\n`,
                `Liczba impulsów dodatnich: ${inputs.en45.positive_bursts}\n`,
                `Liczba impulsów ujemnych: ${inputs.en45.negative_bursts}\n`,
                `Odstęp między impulsami: ${inputs.en45.bursts_gap}\n\n`,
              ],
            },
            {
              text: [
                'Komentarz: \n',
                inputs.en43.basic_data.comment,
                '\n\nWynik ',
                inputs.en43.basic_data.result,
                '\n\nData badania: ',
                inputs.en43.basic_data.date,
                '\n\nBadania wykonał: ',
                inputs.en43.basic_data.contractor,
              ],
            },
          ];
    this.en46 =
      inputs.results.endurance.findIndex((item) => item.norm === 'en46') < 0
        ? []
        : [
            {
              text: 'Szczegółowe wyniki odporności zgodnie z EN 61000-4-6 - zaburzenia przewodzone od pól o częstotliwości radiowej',
              pageBreak: 'before',
            },
            this.createBasicData(inputs.en46.basic_data),
            {
              style: 'table',
              table: {
                body: [
                  [
                    'Port',
                    'Przedział częstotliwości [MHz]',
                    'Modulacja',
                    'Poziom [V/m]',
                    'Osiągnięte kryterium',
                    'Wymagane kryterium',
                  ],
                  [
                    'Zasilanie',
                    inputs.en46.power[0].frequency,
                    inputs.en46.power[0].modulation,
                    inputs.en46.power[0].level,
                    inputs.en46.power[0].criterion,
                    inputs.en46.power[0].req_criterion,
                  ],
                  ...inputs.en46.signal.map((p) => [
                    p.port,
                    p.frequency,
                    p.modulation,
                    p.level,
                    p.criterion,
                    p.req_criterion,
                  ]),
                ],
              },
            },
            {
              text: [
                'Komentarz: \n',
                inputs.en46.basic_data.comment,
                '\n\nWynik ',
                inputs.en46.basic_data.result,
                '\n\nData badania: ',
                inputs.en46.basic_data.date,
                '\n\nBadania wykonał: ',
                inputs.en46.basic_data.contractor,
              ],
            },
          ];
    this.en48 =
      inputs.results.endurance.findIndex((item) => item.norm === 'en48') < 0
        ? []
        : [
            {
              text: 'Szczegółowe wyniki odporności zgodnie z EN 61000-4-8 - pole magnetyczne o częstotliwości sieci energetycznej',
              pageBreak: 'before',
            },
            {
              text: [
                'Lista urządzeń pomiarowych: \n',
                inputs.en48.basic_data.devices[0],
              ],
            },
            {
              style: 'table',
              table: {
                body: [
                  [
                    'Częstotliwość [Hz]',
                    'Poziom [A/m]',
                    'Oś',
                    'Osiągnięte kryterium',
                    'Wymagane kryterium',
                  ],
                  [
                    { rowSpan: 3, text: inputs.en48.frequency },
                    { rowSpan: 3, text: inputs.en48.level },
                    inputs.en48.axis.filter((p) => p.axis === 'X')[0].axis,
                    inputs.en48.axis.filter((p) => p.axis === 'X')[0].criterion,
                    inputs.en48.axis.filter((p) => p.axis === 'X')[0]
                      .req_criterion,
                  ],
                  [
                    '',
                    '',
                    inputs.en48.axis.filter((p) => p.axis === 'Y')[0].axis,
                    inputs.en48.axis.filter((p) => p.axis === 'Y')[0].criterion,
                    inputs.en48.axis.filter((p) => p.axis === 'Y')[0]
                      .req_criterion,
                  ],
                  [
                    '',
                    '',
                    inputs.en48.axis.filter((p) => p.axis === 'Z')[0].axis,
                    inputs.en48.axis.filter((p) => p.axis === 'Z')[0].criterion,
                    inputs.en48.axis.filter((p) => p.axis === 'Z')[0]
                      .req_criterion,
                  ],
                ],
              },
            },
            {
              text: [
                'Komentarz: \n',
                inputs.en48.basic_data.comment,
                '\n\nWynik ',
                inputs.en48.basic_data.result,
                '\n\nData badania: ',
                inputs.en48.basic_data.date,
                '\n\nBadania wykonał: ',
                inputs.en48.basic_data.contractor,
              ],
            },
          ];

    this.basicInfo.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.objPower.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.objSignal.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.objMode.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.objOthers.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.results.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.pn_en_42.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.en43.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.en44.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.en45.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.en46.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
    this.en48.forEach((el) => {
      this.docDefinition['content'].push(el);
    });
  }

  createObjectSignalValue() {
    const inputs = this.inputs.inputs;
    let body = [['Ilość złącz/typów złącz', inputs.object_signal.conn_number]];
    let rows = [
      ...inputs.object_signal.connections.map((p, idx) => [
        [`Złącze sygnałowe nr ${idx + 1}`, p.name],
        ['Typ kabla (liczba żył, przekrój)', p.cable],
        ['Ekran', p.screen],
        ['Długość kabla', p.cable_length],
        ['Złącze', p.connection],
      ]),
    ];
    console.log(rows);
    rows.map((item) => {
      item.forEach((el) => {
        body.push(el);
      });
    });
    console.log(body);
    return body;
  }

  createBasicData(basicData) {
    return [
      { text: 'Warunki atmosferyczne:' },
      {
        style: 'table',
        table: {
          widths: [158.33, 158.33, 158.33],
          body: [
            [
              `Temperatura [\xB0C]`,
              'Ciśnienie atmosferyczne [kPa]',
              'Wilgotność [%]',
            ],
            [basicData.temperature, basicData.pressure, basicData.humidity],
          ],
        },
      },
      {
        text: ['Lista urządzeń pomiarowych: \n', basicData.devices[0]],
      },
    ];
  }

  test() {
    console.log(this.docDefinition);
  }

  public addToPDF(elements: {}[]) {
    // elements.forEach((el) => {
    //   this.docDefinition['content'].push(el);
    // });
    console.log(this.docDefinition);
  }

  fileToBase64(files: []) {
    files.forEach((el) => {
      const reader = new FileReader();
      reader.readAsDataURL(el);
      reader.onload = () => {
        console.log(reader.result);
      };
    });
  }

  public openPDF() {
    pdfMake.createPdf(this.docDefinition).open();
  }

  public downloadPDF() {
    console.log('down');
    pdfMake.createPdf(this.docDefinition).download();
  }

  public printPDF() {
    pdfMake.createPdf(this.docDefinition).print();
  }
}
