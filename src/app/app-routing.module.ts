import { LandingComponent } from './pages/landing.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ChangePwdComponent } from './components/authentication/change-pwd.component';

import { AuthGuard } from './core/guards/auth.guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './pages/notfound.component';
import { LoginComponent } from './pages/login.component';
import { MainComponent } from './pages/main.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: LandingComponent },
    {
        path: 'myaccount', canActivate: [AuthGuard], component: MainComponent,
        children: [
            { path: '', component: WelcomeComponent },
            { path: 'personal-info', component: ProfileComponent },
            { path: 'change-pwd', component: ChangePwdComponent },
            { path: 'about', component: AboutComponent },
            { path: '', component: WelcomeComponent }
        ]
    },
    { path: 'ehr', canLoad: [AuthGuard], loadChildren: () => import('./modules/ehr/ehr.module').then(m => m.EhrModule) },
    { path: 'mktg', canLoad: [AuthGuard], loadChildren: () => import('./modules/mktg/mktg.module').then(m => m.MktgModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: 'auth', component: LoginComponent },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
