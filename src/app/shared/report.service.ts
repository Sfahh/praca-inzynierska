import { Injectable } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root',
})
export class ReportService {
  public docDefinition = {};

  constructor() {
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
              text: 'ZDJĘCIE'
              //TO DO trzeba wyciągnąć base64 ze zdjęcia i robić 'data:image/png;base64,{{TUTAJ BASE64}}'
            },
            {
              text: 'POLITECHNIKA WARSZAWSKA INSTYTUT ELEKTROTECHNIKI TEORETYCZNEJ I SYSTEMÓW INFORMACYJNO POMIAROWYCH ul. Koszykowa 75, 00-662 Warszawa'
            }
          ]
        }
      ],
    };
  }

  test(){
    console.log(this.docDefinition)
  }

  public addToPDF(element){
    this.docDefinition['content'].push(element)
  }

  public openPDF(){
    pdfMake.createPdf(this.docDefinition).open()
  }

  public downloadPDF(){
    console.log('down')
    pdfMake.createPdf(this.docDefinition).download()
  }

  public printPDF(){
    pdfMake.createPdf(this.docDefinition).print()
  }


}
