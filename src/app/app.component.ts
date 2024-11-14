import { Component, input } from '@angular/core';
import { ReportService } from './shared/report.service';
import { InputsService } from './shared/inputs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'interaktywny_protokol';
  saveUri;

  constructor(
    public reportService: ReportService,
    public inputs: InputsService
  ) {}

  save() {
    return this.inputs.saveInputs();
  }

  downloadPDF() {
    this.reportService.downloadPDF();
  }

  openPDF() {
    this.reportService.openPDF();
  }

  printPDF() {
    this.reportService.printPDF();
  }
}
