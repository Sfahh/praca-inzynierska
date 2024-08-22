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
              text: 'ZDJĘCIE',
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

    this.createSections()
  }
  ngOnInit(): void {
    const inputs = this.inputs.inputs;
  }

  createSections(){
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
            ...Object.keys(inputs.object_mode.modes_desc).map((p, idx) => ([`Tryb ${idx + 1}`,inputs.object_mode.modes_desc[p]]))
          ]
        }
      }
    ];
    this.objOthers = [{
      text: [
        'Kryterium oceny \n',
        `Kryterium ${inputs.object_others.criterion} \n`,
        `Data wykonania badań ${inputs.object_others.date} \n`,
        `Przedstawiciele zleceniodawcy obecni w trakcie badań ${inputs.object_others.representative}`
      ]
    }];
    this.results = inputs.results;
    this.pn_en_42 = inputs.pn_en_42;
    this.en43 = inputs.en43;
    this.en44 = inputs.en44;
    this.en45 = inputs.en45;
    this.en46 = inputs.en46;
    this.en48 = inputs.en48;

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

  test() {
    console.log(this.docDefinition);
  }

  public addToPDF(elements: {}[]) {
    // elements.forEach((el) => {
    //   this.docDefinition['content'].push(el);
    // });
    console.log(this.docDefinition);
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
