import { ContactFormComponent } from './contact-form.component';
import { VerifyPwdComponent } from './../authentication/verify-pwd.component';
import { formatDate } from '@angular/common';
import { AccountService } from './../../core/services/account.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IProfile } from 'src/app/shared/interfaces/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(VerifyPwdComponent) verifyChild: VerifyPwdComponent;
  @ViewChild(ContactFormComponent) contactChild: ContactFormComponent;

  user: IProfile;
  basicInfos: any[];
  contactInfos: any[];
  includeVerifyForm: boolean = false;
  includeContactForm: boolean = false;

  constructor(
    private localSt: LocalStorageService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getUserLogin();
    this.initDataTable();
  }

  initDataTable() {
    let hiringDate;
    let passwordUpdate;

    if (this.user?.hiringDate) {
      hiringDate = formatDate(this.user?.hiringDate, 'MMM dd, yyyy', 'en')
    }

    if (this.user?.passwordUpdatedAt) {
      passwordUpdate = formatDate(this.user?.passwordUpdatedAt, 'MMM dd, yyyy', 'en')
    }

    this.basicInfos = [
      { leading: 'ID', title: this.user?.empId, trailing: 'pi pi-chevron-right' },
      { leading: 'NAME', title: this.user?.fullName, trailing: 'pi pi-chevron-right' },
      { leading: 'GENDER', title: this.user?.gender, trailing: 'pi pi-chevron-right' },
      { leading: 'POSITION', title: this.user?.jobTitle, trailing: 'pi pi-chevron-right' },
      { leading: 'DEPARTMENT', title: this.user?.deptName, trailing: 'pi pi-chevron-right' },
      { leading: 'HIRING DATE', title: hiringDate, trailing: 'pi pi-chevron-right' },
      { leading: 'PASSWORD', title: `Last changed ${passwordUpdate}`, trailing: 'pi pi-chevron-right' }
    ];

    this.contactInfos = [
      { leading: 'EMAIL', title: this.user?.email, trailing: 'pi pi-chevron-right' },
      { leading: 'PHONE', title: this.user?.tel, trailing: 'pi pi-chevron-right' },
    ];
  }

  getUserLogin() {
    this.user = this.accountService.getUserLogin();
    this.localSt.observe('user')
      .subscribe((value) => {
        this.user = value;
        this.initDataTable();
      });
  }

  onRowSelect(e) {
    const rowIndex = e.index;

    if (rowIndex === 6) {
      this.verifyChild.empId = this.user.empId;
      this.verifyChild.showModal = true;
    }
  }

  onUpdateContact() {
    this.contactChild.user = this.user;
    this.contactChild.showModal = true;
  }

}
