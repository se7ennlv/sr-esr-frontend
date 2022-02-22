import { ToastService } from './../shared/services/toast.service';
import { UtilsService } from './../shared/services/utils.service';
import { AccountModel } from './../core/models/user.model';
import { ProfileService } from './../core/services/profile.service';
import { JwtService } from './../core/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appVersion;
  appUpdated;
  formGroup: FormGroup;
  submitted: boolean;

  constructor(
    private fb: RxFormBuilder,
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService,
    private profileServie: ProfileService,
    private utilsService: UtilsService,
    private toastService: ToastService
  ) {
    this.appVersion = environment.EHR_VERSION;
    this.appUpdated = environment.ESR_UPDATED;
    ReactiveFormConfig.set(this.utilsService.validationMessages);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let model = new AccountModel();
    this.formGroup = this.fb.formGroup(model);
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return false;
    }

    const formData = this.formGroup.value;
    this.authService.login(formData).subscribe((token) => {
      if (token) {
        this.jwtService.setToken(token);
        this.profileServie.getProfile();
        this.router.navigateByUrl('/myaccount');
      }
    }, (error) => {
      const errorMessage = error.error.error.message;

      if (errorMessage == 'ID') {
        this.toastService.showToast('error', 'Unauthorized', 'Employee ID is invalid or not registered.');
      } else {
        this.toastService.showToast('error', 'Unauthorized', 'Incorrect password');
      }
    });
  }


}
