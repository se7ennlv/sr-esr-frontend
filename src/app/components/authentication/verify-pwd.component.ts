import { ToastService } from './../../shared/services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { UtilsService } from './../../shared/services/utils.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormConfig, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-verify-pwd',
  templateUrl: './verify-pwd.component.html',
  styles: [
  ]
})
export class VerifyPwdComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() empId: any;

  formGroup: FormGroup;
  submitted: boolean;

  constructor(
    private fb: RxFormBuilder,
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router,
    private toastService: ToastService
  ) {
    ReactiveFormConfig.set(this.utilsService.validationMessages);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      password: ['', RxwebValidators.required()]
    });
  }

  onHideModal() {
    this.formGroup.reset();
  }

  onNext() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return false;
    }

    const password = this.formGroup.controls['password'].value;

    this.authService.checkpoint(password).subscribe((res) => {
      if (res.status === 'success') {
        this.router.navigate(['myaccount/change-pwd']);
      } else {
        this.toastService.showToast('error', 'Unauthorized', res.message);
      }

    }, (error) => {
      const errorMessage = error.error.error.message;
      this.toastService.showToast('error', 'Unauthorized', errorMessage);
    });

    this.showModal = false;
  }

}
