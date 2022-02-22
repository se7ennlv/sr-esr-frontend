import { ToastService } from './../../shared/services/toast.service';
import { ProfileService } from './../../core/services/profile.service';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styles: [
  ]
})
export class PhotoFormComponent implements OnInit {
  @Input() showModal: boolean;

  formGroup: FormGroup;
  uploadedFiles: any[] = [];

  constructor(
    private fb: RxFormBuilder,
    private profileService: ProfileService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      extPath: ['esr/images/emps'],
      file: [null]
    });
  }

  onHideModal() {
    this.profileService.getProfile();
  }

  onSelectFile(e) {
    let file = e.files[0];
    this.formGroup.patchValue({ file: file });
  }

  onSubmit() {
    const formData = new FormData();
    Object.entries(this.formGroup.value).forEach(([key, value]: any) => formData.append(key, value));

    this.profileService.updatePhotoProfile(formData).subscribe((res) => {
      if (res.status != 'success') {
        this.toastService.showToast('error', 'Error', res.message);
      }
    });

    this.formGroup.reset();
    this.showModal = false;
  }

}
