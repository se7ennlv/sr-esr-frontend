import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { UtilsService } from './../../../../shared/services/utils.service';
import { ReactiveFormConfig, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from './../../../../shared/services/toast.service';
import { AdminService } from './../../services/admin.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ISurvey } from '../../models/common.model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styles: [
  ]
})
export class SurveyComponent implements OnInit {
  tabIndex: number;

  items: ISurvey[];
  item: ISurvey;
  showDialog: boolean;
  submitted: boolean;
  editMode: boolean;
  formGroup: FormGroup;

  constructor(
    private adminService: AdminService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private fb: RxFormBuilder,
    private utilsService: UtilsService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Surveys Management' }
    ]);
    ReactiveFormConfig.set(this.utilsService.validationMessages);
  }

  ngOnInit(): void {
    this.fetchData();
    this.initForm();
    this.editMode = false;
  }

  handleChange(e) {
    this.tabIndex = e.index;
  }

  initForm() {
    this.formGroup = this.fb.group({
      topic: ['', RxwebValidators.required()],
      url: ['', RxwebValidators.required()],
      status: ['', RxwebValidators.required()]
    });
  }

  fetchData() {
    this.adminService.getSurveys().subscribe((res) => {
      this.items = res.data;
    });
  }

  onCreate() {
    this.item = {};
    this.submitted = false;
    this.showDialog = true;
    this.editMode = false;
  }

  onShowDialog() {
    if (!this.editMode) {
      this.formGroup.patchValue({ status: 1 });
    }
  }

  onHideDialog() {
    this.formGroup.reset();
    this.submitted = false;
  }

  onDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteSurvey(id).subscribe((res) => {
          if (res.status === 'success') {
            this.fetchData();
            this.toastService.showToast(res.status, 'Success', res.message);
          } else {
            this.toastService.showToast(res.status, 'Error', res.message);
          }
        });
      }
    });
  }

  onEdit(item: ISurvey) {
    this.item = { ...item }
    this.formGroup.patchValue({
      topic: item.topic,
      url: item.url,
      status: item.status
    });
    this.showDialog = true;
    this.editMode = true;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return false;
    }

    const formData = this.formGroup.value;

    if (this.item._id) {
      const id = this.item._id;
      this.adminService.updateSurvey(id, formData).subscribe((res) => {
        if (res.status === 'success') {
          this.toastService.showToast(res.status, 'Success', res.message);
          this.fetchData();
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      });
    } else {
      this.adminService.createSurvey(formData).subscribe((res) => {
        if (res.status === 'success') {
          this.fetchData();
          this.toastService.showToast(res.status, 'Success', res.message);
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      });
    }

    this.showDialog = false;
    this.item = {};
  }

}
