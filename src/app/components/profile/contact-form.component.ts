import { IProfile } from './../../shared/interfaces/profile.model';
import { ToastService } from './../../shared/services/toast.service';
import { ProfileService } from './../../core/services/profile.service';
import { AccountService } from './../../core/services/account.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styles: [
  ]
})
export class ContactFormComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() user: IProfile;

  submitted: boolean;
  formGroup: FormGroup;

  constructor(
    private fb: RxFormBuilder,
    private profileService: ProfileService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      email: [''],
      tel: ['']
    });
  }

  prepareUpdate() {
    this.formGroup.patchValue({
      email: this.user.email,
      tel: this.user.tel,
    });
  }

  onShowModal() {
    this.prepareUpdate();
  }

  onHideModal() {
    this.profileService.getProfile();
  }

  onSubmit() {
    if (this.formGroup.invalid) return;

    const formData = this.formGroup.value;

    this.profileService.updateContact(formData).subscribe((res) => {
      if (res.status === 'success') {
        this.toastService.showToast('success', 'Success', res.message);
      } else {
        this.toastService.showToast('error', 'Error', res.message);
      }
    });

    this.showModal = false;
  }

}
