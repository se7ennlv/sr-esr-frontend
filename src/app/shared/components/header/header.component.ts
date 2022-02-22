import { IProfile } from './../../interfaces/profile.model';
import { environment } from './../../../../environments/environment.prod';
import { IApp } from './../../../core/models/app.model';
import { ProfileService } from './../../../core/services/profile.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AccountService } from './../../../core/services/account.service';
import { AppService } from '../../services/app.service';
import { AuthService } from './../../../core/services/auth.service';
import { BreadcrumbService } from './../../services/app.breadcrumb.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: IProfile;
  subscription: Subscription;
  items: MenuItem[];
  apps: IApp[];
  endpoint: string;

  constructor(
    public breadcrumbService: BreadcrumbService,
    public app: AppService,
    private authService: AuthService,
    private accountService: AccountService,
    private localSt: LocalStorageService,
    private profileService: ProfileService
  ) {
    this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
      this.items = response;
    });
    this.endpoint = environment.ENDPOINT;
  }

  ngOnInit(): void {
    this.getUserLogin();
    this.fetchApps();
  }

  getUserLogin() {
    this.user = this.accountService.getUserLogin();
    this.localSt.observe('user').subscribe((value) => {
      this.user = value;
    });
  }

  fetchApps() {
    this.profileService.getApps().subscribe((res) => {
      if (res.status === 'success') {
        this.apps = res.data.app;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
  }


}
