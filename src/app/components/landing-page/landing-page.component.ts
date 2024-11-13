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

  ngOnInit(): void {}

  setInputs() {}

  createNew() {
    localStorage.removeItem('project');
    this.router.navigate(['/create']);
  }

  loadInputs(e) {
    this.isContinue = this.inputs.loadInputs(e.target.files[0]);
  }
}
