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
  selectedFile;
  settingPictures = {
    table_top: {
      contact: [],
      air: [],
      vcp: [],
      hcp: [],
    },
    floor_standing: {
      contact: [],
      air: [],
      vcp: [],
    },
  };
  isChanged: boolean = false;

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
    console.log(this.data);

    this.normIndex = this.inputs.inputs.results.endurance.findIndex(
      (item) => item.norm === this.componentName
    );
  }

  fileToBase64(files: [], type: string, settings: string) {
    // this.data[type][settings].picture = [];
    files.forEach((el) => {
      const reader = new FileReader();
      reader.readAsDataURL(el);
      reader.onload = () => {
        console.log(reader.result);
        this.settingPictures[type][settings].push(reader.result);
      };
    });
  }

  change(e, type, settings) {
    this.isChanged = true;
    const fileKeys = Object.keys(e.target.files);
    let files: any = [];
    console.log(e);
    for (let key of fileKeys) {
      files.push(e.target.files[key]);
    }
    console.log(files);
    this.fileToBase64(files, type, settings);
  }

  next(isSave?: boolean) {
    const tableTopKeys = Object.keys(this.data.table_top);
    const floorStandingKeys = Object.keys(this.data.floor_standing);
    for (let el of tableTopKeys) {
      if (
        this.isChanged &&
        this.data.table_top[el].picture !==
          this.settingPictures?.table_top[el] &&
        this.settingPictures?.table_top[el].length > 0
      )
        this.data.table_top[el].picture = this.settingPictures?.table_top[el];
    }
    for (let el of floorStandingKeys) {
      if (
        this.isChanged &&
        this.data.floor_standing[el].picture !==
          this.settingPictures?.floor_standing[el] &&
        this.settingPictures?.floor_standing[el].length > 0
      )
        this.data.floor_standing[el].picture =
          this.settingPictures?.floor_standing[el];
    }
    console.log(this.data);
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
    console.log(this.data);
  }
}
