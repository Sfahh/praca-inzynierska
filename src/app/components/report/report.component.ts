import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
  inject,
  input,
} from '@angular/core';
import { ReportService } from '../../shared/report.service';
import { DateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { People } from '../../shared/persons';
import { InputsService } from '../../shared/inputs.service';
import { BasicInfo } from '../../shared/dictionary';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  @ViewChild('form', { read: ElementRef })
  formField: ElementRef<HTMLElement>;

  personsList = People;
  data: BasicInfo;
  isPrev: boolean;
  isEdited: boolean = true;

  private _snackBar = inject(MatSnackBar);

  constructor(
    public reportService: ReportService,
    private dateAdapter: DateAdapter<Date>,
    public inputs: InputsService,
    public datepipe: DatePipe,
    public router: Router
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.reportService.test();
    this.data = this.inputs.inputs?.basic_info;
    this.isPrev = this.inputs.inputs?.is_prev;
    console.log(this.personsList[0].name);
    console.log(this.inputs.inputs.basic_info);
  }

  onSubmit(form) {
    console.log(form);
    this.inputs.updateInputs('basic_info', this.data);
  }

  next() {
    if (this.isValid()) {
      this.data.date = this.datepipe.transform(this.data.date, 'dd/MM/yyyy');
      this.isEdited =
        this.data === this.inputs.inputs?.basic_info ? false : true;
      this.inputs.updateInputs('basic_info', this.data);
      this.router.navigate(['/object']);
    } else {
      this._snackBar.open('Błąd: Niepoprawne wartości pól', 'Ok');
    }
  }

  isValid() {
    const keys = Object.keys(this.data);
    keys.splice(keys.indexOf('isEndurance'), 1);
    keys.splice(keys.indexOf('isEmission'), 1);
    for (let key of keys) {
      if (!this.data[key]) {
        return false;
      }
    }
    return true;
  }
}
