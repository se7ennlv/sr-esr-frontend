import { DocDetailComponent } from './components/documents/doc-detail.component';
import { DocsComponent } from './components/documents/docs.component';
import { ClinicComponent } from './components/benefits/clinic.component';
import { SurveyRptComponent } from './components/admin/survey-rpt.component';
import { SurveyComponent } from './components/admin/survey.component';
import { ArticlesComponent } from './components/admin/articles.component';
import { DocMgmtComponent } from './components/admin/doc-mgmt.component';
import { MysurveyComponent } from './components/benefits/mysurvey.component';
import { PayrollComponent } from './components/benefits/payroll.component';
import { RosterComponent } from './components/benefits/roster.component';
import { LeaveComponent } from './components/benefits/leave.component';
import { MymartComponent } from './components/benefits/mymart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SrpComponent } from './components/benefits/srp.component';
import { MainComponent } from './pages/main.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'srp', component: SrpComponent },
      { path: 'mymart', component: MymartComponent },
      { path: 'leave', component: LeaveComponent },
      { path: 'roster', component: RosterComponent },
      { path: 'payroll', component: PayrollComponent },
      { path: 'clinic', component: ClinicComponent },
      { path: 'mysurvey', component: MysurveyComponent },

      { path: 'docs', component: DocsComponent },
      { path: 'doc/:id/:title', component: DocDetailComponent },

      { path: 'admin/doc', component: DocMgmtComponent },
      { path: 'admin/articles', component: ArticlesComponent },
      { path: 'admin/surveys', component: SurveyComponent },
      { path: 'admin/survey/rpt', component: SurveyRptComponent },

      { path: '', component: DashboardComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EhrRoutingModule { }
