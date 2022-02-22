import { Component, OnInit } from '@angular/core';
import { IMainDoc } from '../../models/docmain.model';
import { AdminService } from '../../services/admin.service';
import { UtilsService } from '../../../../shared/services/utils.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormGroup } from '@angular/forms';
import { ReactiveFormConfig, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-doc-main',
  templateUrl: './doc-main.component.html',
  styles: [
  ]
})
export class DocMainComponent implements OnInit {
  items: IMainDoc[];
  item: IMainDoc;
  showDialog: boolean;
  submitted: boolean;
  editMode: boolean;
  formGroup: FormGroup;

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
    this.initForm();
    this.editMode = false;
  }

  initForm() {
    this.formGroup = this.fb.group({
      title: ['', RxwebValidators.required()],
      isActive: ['', RxwebValidators.required()]
    });
  }

  fetchData() {
    this.adminService.getMainDocs().subscribe((res) => {
      this.items = res.data;
      this.loading = false;
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

  onDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteMainDoc(id).subscribe((res) => {
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

  onEdit(item: IMainDoc) {
    this.item = { ...item }
    this.formGroup.patchValue({
      title: item.title,
      isActive: item.isActive
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

      this.adminService.updateMainDoc(id, formData).subscribe((res) => {
        if (res.status === 'success') {
          this.toastService.showToast(res.status, 'Success', res.message);
          this.fetchData();
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      });
    } else {
      this.adminService.createMainDoc(formData).subscribe((res) => {
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
