import { UtilsService } from '../../../../shared/services/utils.service';
import { ReactiveFormConfig, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { AdminService } from '../../services/admin.service';
import { FormGroup } from '@angular/forms';
import { ISubDoc } from '../../models/docsub.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-sub',
  templateUrl: './doc-sub.component.html',
  styles: [
  ]
})
export class DocSubComponent implements OnInit {

  items: ISubDoc[];
  item: ISubDoc;
  showDialog: boolean;
  submitted: boolean;
  editMode: boolean;
  formGroup: FormGroup;
  groups: any[];

  loading: boolean = true;

  constructor(
    private adminService: AdminService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private fb: RxFormBuilder,
    private utilsService: UtilsService
  ) {
    ReactiveFormConfig.set(this.utilsService.validationMessages);
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchMainDoc();
    this.initForm();
    this.editMode = false;
  }

  initForm() {
    this.formGroup = this.fb.group({
      mainGroupId: ['', RxwebValidators.required()],
      title: ['', RxwebValidators.required()],
      isActive: ['', RxwebValidators.required()]
    });
  }

  fetchData() {
    this.adminService.getSubDocs().subscribe((res) => {
      this.items = res.data;
      this.loading = false;
    });
  }

  fetchMainDoc() {
    this.adminService.getMainDocs().subscribe((res) => {
      this.groups = res.data;
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
      this.formGroup.patchValue({ isActive: 1 });
    }
  }

  onHideDialog() {
    this.formGroup.reset();
    this.submitted = false;
  }

  onEdit(item: ISubDoc) {
    this.item = { ...item }

    Object.entries(this.item).forEach(([key, value]: any) => {
      if (this.formGroup.controls.hasOwnProperty(key)) {
        this.formGroup.patchValue({
          [key]: value
        });
      }
    });



    this.showDialog = true;
    this.editMode = true;
  }

  onDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteSubDoc(id).subscribe((res) => {
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

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return false;
    }

    const formData = this.formGroup.value;

    if (this.item._id) {
      const id = this.item._id;
      this.adminService.updateSubDoc(id, formData).subscribe((res) => {
        if (res.status === 'success') {
          this.toastService.showToast(res.status, 'Success', res.message);
          this.fetchData();
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      });
    } else {
      this.adminService.createSubDoc(formData).subscribe((res) => {
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
