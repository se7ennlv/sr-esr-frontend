
import { ContactFormComponent } from './components/profile/contact-form.component';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MainComponent } from './pages/main.component';
import { SharedModule } from './shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, DecimalPipe, DatePipe, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ConfigComponent } from './components/layout/config.component';
import { RightmenuComponent } from './components/layout/rightmenu.component';
import { SearchComponent } from './components/layout/search.component';
import { FooterComponent } from './components/layout/footer.component';
import { NotfoundComponent } from './pages/notfound.component';
import { LoginComponent } from './pages/login.component';
import { BreadcrumbService } from './shared/services/app.breadcrumb.service';
import { MenuService } from './shared/services/app.menu.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { LeftbarComponent } from './components/layout/leftbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ChangePwdComponent } from './components/authentication/change-pwd.component';
import { VerifyPwdComponent } from './components/authentication/verify-pwd.component';
import { PhotoFormComponent } from './components/profile/photo-form.component';
import { AboutComponent } from './components/about/about.component';
import { LandingComponent } from './pages/landing.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LeftbarComponent,
        RightmenuComponent,
        ConfigComponent,
        SearchComponent,
        FooterComponent,
        LoginComponent,
        NotfoundComponent,
        LoginComponent,
        NotfoundComponent,
        ProfileComponent,
        WelcomeComponent,
        ChangePwdComponent,
        VerifyPwdComponent,
        ContactFormComponent,
        PhotoFormComponent,
        AboutComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RxReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(),
        ToastModule,
        SharedModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MenuService, BreadcrumbService,
        DatePipe, DecimalPipe, MessageService, ConfirmationService,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
