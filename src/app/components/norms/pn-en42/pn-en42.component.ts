import { Component, inject, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DeviceResult, NormPnEn42 } from '../../../shared/dictionary';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../../shared/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pn-en42',
  templateUrl: './pn-en42.component.html',
  styleUrl: './pn-en42.component.scss',
})
export class PnEn42Component implements OnInit {
  private _snackBar = inject(MatSnackBar);

  componentName: string = 'pn_en_42';

  normIndex: number;

  data: NormPnEn42;

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];

  constructor(
    public inputs: InputsService,
    public datepipe: DatePipe,
    public reportService: ReportService
  ) {
    this.data = new NormPnEn42();
  }

  ngOnInit(): void {
    this.data = this.inputs.inputs?.pn_en_42;
    this.normIndex = this.inputs.inputs.results.endurance.findIndex(
      (item) => item.norm === this.componentName
    );
  }

  next(isSave?: boolean) {
    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.inputs.updateInputs('pn_en_42', this.data);
    console.log(this.inputs.inputs);
    this.reportService.createSections();
    if (isSave) {
      this._snackBar.open('Pomyślnie zapisano', 'Ok');
    }
  }
}
