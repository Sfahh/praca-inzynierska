import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReportComponent } from './components/report/report.component';
import { ObjectDescriptionComponent } from './components/object-description/object-description.component';
import { ResearchResultComponent } from './components/research-result/research-result.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'create', component: ReportComponent},
  {path: 'object', component: ObjectDescriptionComponent},
  {path: 'result', component: ResearchResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
