import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestComponent } from './components/test/test.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReportComponent } from './components/report/report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObjectDescriptionComponent } from './components/object-description/object-description.component';
import { DatePipe } from '@angular/common';
import { ResearchResultComponent } from './components/research-result/research-result.component';
import { PnEn42Component } from './components/norms/pn-en42/pn-en42.component';
import { NormComponent } from './components/norms/norm/norm.component';
import { En43Component } from './components/norms/en43/en43.component';
import { En44Component } from './components/norms/en44/en44.component';
import { En45Component } from './components/norms/en45/en45.component';
import { En46Component } from './components/norms/en46/en46.component';
import { En48Component } from './components/norms/en48/en48.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestComponent,
    LandingPageComponent,
    ReportComponent,
    ObjectDescriptionComponent,
    ResearchResultComponent,
    PnEn42Component,
    NormComponent,
    En43Component,
    En44Component,
    En45Component,
    En46Component,
    En48Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideAnimationsAsync(), DatePipe, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
