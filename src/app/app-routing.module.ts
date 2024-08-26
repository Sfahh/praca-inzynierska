import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReportComponent } from './components/report/report.component';
import { ObjectDescriptionComponent } from './components/object-description/object-description.component';
import { ResearchResultComponent } from './components/research-result/research-result.component';
import { NormComponent } from './components/norms/norm/norm.component';
import { PnEn42Component } from './components/norms/pn-en42/pn-en42.component';
import { En43Component } from './components/norms/en43/en43.component';
import { En44Component } from './components/norms/en44/en44.component';
import { En45Component } from './components/norms/en45/en45.component';
import { En46Component } from './components/norms/en46/en46.component';
import { En48Component } from './components/norms/en48/en48.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'create', component: ReportComponent },
  { path: 'object', component: ObjectDescriptionComponent },
  { path: 'result', component: ResearchResultComponent },
  {
    path: 'norm',
    component: NormComponent,
    children: [
      { path: 'pn_en_42', component: PnEn42Component },
      { path: 'en43', component: En43Component },
      { path: 'en44', component: En44Component },
      { path: 'en45', component: En45Component },
      { path: 'en46', component: En46Component },
      { path: 'en48', component: En48Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
