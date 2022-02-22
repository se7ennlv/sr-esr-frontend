import { SroRptComponent } from './components/reports/sro-rpt.component';
import { SrnRptComponent } from './components/reports/srn-rpt.component';
import { ThkRptComponent } from './components/reports/thk-rpt.component';
import { PlayerListComponent } from './components/players/player-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './pages/main.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: MainComponent, data: { title: 'Marketing System' },
    children: [
      { path: 'players', component: PlayerListComponent },
      { path: 'thk', component: ThkRptComponent },
      { path: 'srold', component: SroRptComponent },
      { path: 'srnew', component: SrnRptComponent },
      { path: '', component: DashboardComponent }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MktgRoutingModule { }
