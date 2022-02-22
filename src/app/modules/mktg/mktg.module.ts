
import { SharedModule } from './../../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MktgRoutingModule } from './mktg-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/layout/footer.component';
import { LeftbarComponent } from './components/layout/leftbar.component';
import { MainComponent } from './pages/main.component';
import { PlayerListComponent } from './components/players/player-list.component';
import { ThkFormComponent } from './components/survey-form/thk-form.component';
import { ThkRptComponent } from './components/reports/thk-rpt.component';
import { SroRptComponent } from './components/reports/sro-rpt.component';
import { SrnRptComponent } from './components/reports/srn-rpt.component';
import { SroFormComponent } from './components/survey-form/sro-form.component';
import { SrnFormComponent } from './components/survey-form/srn-form.component';


@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    LeftbarComponent,
    MainComponent,
    PlayerListComponent,
    ThkFormComponent,
    ThkRptComponent,
    SroRptComponent,
    SrnRptComponent,
    SroFormComponent,
    SrnFormComponent
  ],
  imports: [
    CommonModule,
    MktgRoutingModule,
    ToastModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MktgModule { }
