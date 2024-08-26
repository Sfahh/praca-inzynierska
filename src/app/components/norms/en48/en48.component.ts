import { Component, OnInit } from '@angular/core';
import { InputsService } from '../../../shared/inputs.service';
import { DatePipe } from '@angular/common';
import { En48Results, NormEn48 } from '../../../shared/dictionary';

@Component({
  selector: 'app-en48',
  templateUrl: './en48.component.html',
  styleUrl: './en48.component.scss',
})
export class En48Component implements OnInit {
  componentName: string = 'en48';

  data: NormEn48;
  axisResults: En48Results[] = [];

  devices = ['Amperomierz', 'Woltomierz', 'Cewka Rogowskiego', 'Sonda prądowa'];

  selectedFile;

  normIndex: number;

  constructor(public inputs: InputsService, public datepipe: DatePipe) {}

  ngOnInit(): void {
    this.data = this.inputs.inputs?.en48;
    if (this.data.axis.length < 1) {
      this.countAxis();
    }
    this.normIndex = this.inputs.inputs.results.endurance.findIndex(
      (item) => item.norm === this.componentName
    );
  }

  countAxis() {
    for (let i = 0; i <= 2; i++) {
      let axis = new En48Results();
      this.axisResults.push(axis);
    }
    this.axisResults[0].axis = 'X';
    this.axisResults[1].axis = 'Y';
    this.axisResults[2].axis = 'Z';
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

  next() {
    this.data.basic_data.date = this.datepipe.transform(
      this.data.basic_data.date,
      'dd/MM/yyyy'
    );
    this.data.axis = this.axisResults;
    this.data.picture = this.fileToBase64(this.selectedFile.files);
    this.inputs.updateInputs('en48', this.data);
    console.log(this.inputs.inputs);
  }
}
