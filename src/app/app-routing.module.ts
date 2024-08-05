import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReportComponent } from './components/report/report.component';
import { ObjectDescriptionComponent } from './components/object-description/object-description.component';
import { ResearchResultComponent } from './components/research-result/research-result.component';
import { NormComponent } from './components/norms/norm/norm.component';
import { PnEn42Component } from './components/norms/pn-en42/pn-en42.component';
import { En43Component } from './components/norms/en43/en43.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'create', component: ReportComponent },
  { path: 'object', component: ObjectDescriptionComponent },
  { path: 'result', component: ResearchResultComponent },
  {
    path: 'norm',
    component: NormComponent,
    children: [
      { path: 'pn42', component: PnEn42Component },
      { path: 'en43', component: En43Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
