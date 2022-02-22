import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DocsComponent } from './components/documents/docs.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MysurveyComponent } from './components/benefits/mysurvey.component';
import { ToastModule } from 'primeng/toast';
import { PayrollComponent } from './components/benefits/payroll.component';
import { RosterComponent } from './components/benefits/roster.component';
import { LeaveComponent } from './components/benefits/leave.component';
import { MymartComponent } from './components/benefits/mymart.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SrpComponent } from './components/benefits/srp.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EhrRoutingModule } from './ehr-routing.module';
import { LeftbarComponent } from './components/layout/leftbar.component';
import { FooterComponent } from './components/layout/footer.component';
import { MainComponent } from './pages/main.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocMgmtComponent } from './components/admin/doc-mgmt.component';
import { DocItemComponent } from './components/admin/doc-item.component';
import { DocViewerComponent } from './components/documents/doc-viewer.component';
import { ArticlesComponent } from './components/admin/articles.component';
import { SurveyComponent } from './components/admin/survey.component';
import { SurveyRptComponent } from './components/admin/survey-rpt.component';
import { ClinicComponent } from './components/benefits/clinic.component';
import { DocMainComponent } from './components/admin/doc-main.component';
import { DocDetailComponent } from './components/documents/doc-detail.component';
import { DocSubComponent } from './components/admin/doc-sub.component';
import { SurveyAsmtComponent } from './components/admin/survey-asmt.component';

@NgModule({
  declarations: [
    MainComponent,
    LeftbarComponent,
    FooterComponent,
    DashboardComponent,
    SrpComponent,
    MymartComponent,
    LeaveComponent,
    RosterComponent,
    PayrollComponent,
    MysurveyComponent,
    DocMgmtComponent,
    DocItemComponent,
    DocViewerComponent,
    ArticlesComponent,
    SurveyComponent,
    SurveyRptComponent,
    ClinicComponent,
    DocsComponent,
    DocMainComponent,
    DocMainComponent,
    DocDetailComponent,
    DocSubComponent,
    SurveyAsmtComponent
  ],
  imports: [
    CommonModule,
    EhrRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    NgxExtendedPdfViewerModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EhrModule { }
