import { IProfile } from './../../shared/interfaces/profile.model';
import { environment } from 'src/environments/environment.prod';
import { PhotoFormComponent } from './../profile/photo-form.component';
import { LocalStorageService } from 'ngx-webstorage';
import { AccountService } from './../../core/services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  @ViewChild(PhotoFormComponent) child: PhotoFormComponent;

  user: IProfile;
  endpoint: string;

  constructor(
    private localSt: LocalStorageService,
    private accountService: AccountService
  ) {
    this.endpoint = environment.ENDPOINT;
  }

  ngOnInit(): void {
    this.getUserLogin();
  }

  getUserLogin() {
    this.user = this.accountService.getUserLogin();
    this.localSt.observe('user').subscribe((value) => {
      this.user = value;
    });
  }

  openModal() {
    this.child.showModal = true;
  }

}
