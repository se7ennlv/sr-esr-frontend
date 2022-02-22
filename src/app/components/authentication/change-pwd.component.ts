import { IProfile } from 'src/app/shared/interfaces/profile.model';
import { AccountService } from './../../core/services/account.service';
import { Router } from '@angular/router';
import { ToastService } from './../../shared/services/toast.service';
import { ProfileService } from './../../core/services/profile.service';
import { AuthService } from './../../core/services/auth.service';
import { PasswordModel } from './../../core/models/pwd.model';
import { UtilsService } from './../../shared/services/utils.service';
import { ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styles: [
  ]
})
export class ChangePwdComponent implements OnInit {
  formGroup: FormGroup;
  user: IProfile;

  constructor(
    private fb: RxFormBuilder,
    private utilsService: UtilsService,
    private authService: AuthService,
    private profileService: ProfileService,
    private toastService: ToastService,
    private router: Router,
    private accountService: AccountService
  ) {
    ReactiveFormConfig.set(this.utilsService.validationMessages);
    this.user = this.accountService.getUserLogin();
  }

  ngOnInit(): void {
    this.initForm();
    this.prepareUpdate();
  }

  initForm() {
    let model = new PasswordModel();
    this.formGroup = this.fb.formGroup(model);
  }

  prepareUpdate() {
    this.formGroup.patchValue({
      username: this.user.empId
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) return;

    const formData = this.formGroup.value;

    this.authService.changePwd(formData).subscribe((res) => {
      if (res.status === 'success') {
        this.formGroup.reset();
        this.profileService.getProfile();
        this.router.navigate(['myaccount/personal-info']);
        //this.toastService.showToast('success', 'Success', 'Password has been changed');
      }
    }, (error) => {
      this.toastService.showToast('error', 'Error', 'Something went wrong');
    });

  }

}
