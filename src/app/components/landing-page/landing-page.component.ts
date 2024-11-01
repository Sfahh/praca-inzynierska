import { Component, input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputsService } from '../../shared/inputs.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  isContinue: boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private inputs: InputsService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('project')) {
      this.isContinue = true;
    }
  }

  createWarning(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }

  setInputs() {
    this.inputs.setInputs();
  }

  createNew() {
    localStorage.removeItem('project');
    this.router.navigate(['/create']);
    this.dialog.closeAll();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
