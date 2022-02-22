import { IProfile } from './../../../../shared/interfaces/profile.model';
import { AccountService } from './../../../../core/services/account.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AppService } from '../../../../shared/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-leftbar',
    templateUrl: './leftbar.component.html',
    styles: [
    ]
})
export class LeftbarComponent implements OnInit {
    model: any[];
    user: IProfile;

    constructor(
        public app: AppService,
        private accountService: AccountService,
        private localSt: LocalStorageService
    ) { }

    ngOnInit() {
        this.fetchUserLogin();

        this.model = [
            {
                label: 'Main Menus', icon: 'pi pi-home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['./'] }
                ]
            },
            { separator: true },
            {
                label: 'MY BENEFITS', icon: '', routerLink: [''],
                items: [
                    { label: 'SRP', icon: 'pi pi-star-o', routerLink: ['srp'] },
                    { label: 'My Mart', icon: 'pi pi-shopping-cart', routerLink: ['mymart'] },
                    { label: 'Leave', icon: 'pi pi-sign-out', routerLink: ['leave'] },
                    { label: 'Roster & Attendance', icon: 'pi pi-calendar', routerLink: ['roster'] },
                    { label: 'Payroll', icon: 'pi pi-money-bill', routerLink: ['payroll'] },
                    { label: 'Clinic Record', icon: 'pi pi-user-plus', routerLink: ['clinic'] },
                    { label: 'Survey Records', icon: 'pi pi-check-circle', routerLink: ['mysurvey'] }
                ]
            },
            { separator: true },
            {
                label: 'HR INFORMATION', icon: '', routerLink: [''],
                items: [
                    { label: 'Documents', icon: 'pi pi-book', routerLink: ['docs'] }
                ]
            },
            { separator: true },
            this.user.role.id < 4 ? {
                label: 'Administrator', icon: '', routerLink: [''],
                items: [
                    { label: 'Documents Manage', icon: 'pi pi-inbox', routerLink: 'admin/doc' },
                    { label: 'Articles Manage', icon: 'pi pi-list', routerLink: ['admin/articles'] },
                    { label: 'Surveys Manage', icon: 'pi pi-check-circle', routerLink: ['admin/surveys'] },
                    { label: 'Surveys Reports', icon: 'pi pi-chart-bar', routerLink: 'admin/survey/rpt' }
                ]
            } : ''
        ];
    }

    onMenuClick(event) {
        this.app.onMenuClick(event);
    }

    fetchUserLogin() {
        this.user = this.accountService.getUserLogin();
        this.localSt.observe('user').subscribe((value) => {
            this.user = value;
        });
    }

}
