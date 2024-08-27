import { Component, OnInit } from '@angular/core';
import { InputsService } from '../../shared/inputs.service';
import {
  Emission,
  Endurance,
  Norms,
  norms,
  Results,
} from '../../shared/dictionary';

@Component({
  selector: 'app-research-result',
  templateUrl: './research-result.component.html',
  styleUrl: './research-result.component.scss',
})
export class ResearchResultComponent implements OnInit {
  isEmission: boolean;
  isEndurance: boolean;
  normEmissionNumber: number;
  normEnduranceNumber: number;
  dataResult: Results;
  norms: norms[] = Norms;
  selectedNorms = [];

  constructor(public inputs: InputsService) {
    this.dataResult = new Results();
  }

  ngOnInit(): void {
    this.isEmission = this.inputs.inputs?.basic_info.isEmission;
    this.isEndurance = this.inputs.inputs?.basic_info.isEndurance;
    console.log(this.inputs.inputs);
    if (
      this.inputs.inputs.results?.emission.length > 0 ||
      this.inputs.inputs.results?.endurance.length > 0
    ) {
      this.dataResult.emission = this.inputs.inputs.results.emission;
      this.dataResult.endurance = this.inputs.inputs.results.endurance;
      this.normEmissionNumber = this.dataResult.emission.length;
      this.normEnduranceNumber = this.dataResult.endurance.length;
    } else {
      if (this.isEmission) {
        let emission = new Emission();
        this.dataResult.emission.push(emission);
      }
      if (this.isEndurance) {
        let endurance = new Endurance();
        this.dataResult.endurance.push(endurance);
      }
      this.normEmissionNumber = 1;
      this.normEnduranceNumber = 1;
    }
  }

  countNorms(value) {
    let numbers = Array(+value)
      .fill(0)
      .map((x, i) => i);
    return numbers;
  }

  addNorm(value) {
    let emission;
    let endurance;
    if (value === 'emission') {
      this.normEmissionNumber++;
      emission = new Emission();
      console.log(this.dataResult);

      console.log(emission);
      this.dataResult.emission.push(emission);
    } else {
      this.normEnduranceNumber++;
      endurance = new Endurance();
      this.dataResult.endurance.push(endurance);
    }
    console.log(this.normEmissionNumber);
    console.log(this.normEnduranceNumber);
    console.log(this.dataResult);
  }

  deleteNorm(value, index) {
    if (value === 'emission') {
      this.normEmissionNumber--;
      this.dataResult.emission.splice(index, 1);
    } else {
      this.normEnduranceNumber--;
      this.dataResult.endurance.splice(index, 1);
    }
    console.log(this.dataResult);
  }

  filterNorms(value) {
    // this.selectedNorms.push(value);
  }

  checkNormAvailability(value) {
    console.log(value);

    let isAvailable = true;
    console.log(this.selectedNorms);
    console.log(this.selectedNorms.findIndex((item) => item === value));

    if (this.selectedNorms.findIndex((item) => item === value) !== -1) {
      isAvailable = false;
      console.log('test');
    }
    console.log(isAvailable);

    return isAvailable;
  }

  removeDuplicates() {
    const result = Array.from(
      this.dataResult.endurance
        .reduce((m, t) => m.set(t.norm, t), new Map())
        .values()
    );
    return result;
  }

  next() {
    this.dataResult.endurance = this.removeDuplicates();
    this.inputs.updateInputs('results', this.dataResult);
    console.log(this.inputs.inputs);
  }
}
