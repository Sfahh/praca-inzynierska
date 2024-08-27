import { Injectable, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { InputsService } from './inputs.service';
import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class ReportService {
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

  // base64Logo = `data:image/png;base64,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`;
  base64Logo;

  constructor(public inputs: InputsService, public http: HttpClient) {
    console.log('test');
    this.base64Logo = this.fileToBase64();
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
              image: this.base64Logo,
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
          margin: [0, 300, 0, 0],
          alignment: 'center',
        },
      },
    };
    console.log(this.docDefinition);

    // this.fileToBase64();
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
            ...inputs.results.endurance.map((p, idx) => [
              p.norm,
              p.specs,
              'Numer strony: ' + (3 + idx + 1),
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

  fileToBase64(files?: []) {
    this.http
      .get('./assets/pw_logo.png', {
        responseType: 'blob',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .subscribe((res) => {
        console.log(res);
        let base64: string;
        const reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = () => {
          console.log(reader.result);
          base64 = reader.result.toString();
        };
      });
    // files.forEach((el) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(el);
    //   reader.onload = () => {
    //     console.log(reader.result);
    //   };
    // });
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
