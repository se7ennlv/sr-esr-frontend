import { formatDate, DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IArticle } from './../../models/admin.model';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { UtilsService } from './../../../../shared/services/utils.service';
import { date, ReactiveFormConfig, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from './../../../../shared/services/toast.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [
  ]
})
export class ArticlesComponent implements OnInit {
  items: IArticle[];
  item: IArticle;
  showFormModal: boolean;
  submitted: boolean;
  editMode: boolean;
  formGroup: FormGroup;

  statusMsg: string;
  statusClass: string;

  endpoint: string = environment.ENDPOINT;
  loading: boolean = true;

  constructor(
    private adminService: AdminService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private fb: RxFormBuilder,
    private utilsService: UtilsService,
    private breadcrumbService: BreadcrumbService,
    private datePipe: DatePipe
  ) {
    this.breadcrumbService.setItems([
      { label: 'Articles Management' }
    ]);
    ReactiveFormConfig.set(this.utilsService.validationMessages);
  }

  ngOnInit(): void {
    this.editMode = false;
    this.fetchData();
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      topic: ['', RxwebValidators.required()],
      desc: ['', [RxwebValidators.required(), RxwebValidators.maxLength({ value: 700 })]],
      publishedAt: [null, RxwebValidators.required()],
      extPath: ['ehr/images/articles'],
      file: [null]
    });
  }

  fetchData() {
    this.adminService.getArticles().subscribe((res) => {
      this.items = res.data;
      this.loading = false;
    });
  }

  onCreate() {
    this.item = {};
    this.submitted = false;
    this.showFormModal = true;
    this.editMode = false;
  }

  onHideDialog() {
    this.formGroup.reset();
    this.submitted = false;
    this.formGroup.patchValue({ file: null });
  }

  onSelectFile(e) {
    let file = e.files[0];
    this.formGroup.patchValue({ file: file });
  }

  onEdit(item: IArticle) {
    this.item = { ...item }

    Object.entries(this.item).forEach(([key, value]: any) => {
      if (this.formGroup.controls.hasOwnProperty(key)) {

        if (key === 'publishedAt') {
          const parseDate = Date.parse(value);
          value = formatDate(parseDate, 'yyyy-MM-dd hh:mm', 'en');
        }

        this.formGroup.patchValue({
          [key]: value
        });
      }
    });

    this.showFormModal = true;
    this.editMode = true;
  }

  onDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteArticle(id).subscribe((res) => {
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

  dateComparison(item) {
    const format = 'yyyy-MM-dd';
    const currentDate = formatDate(new Date(), format, 'en');
    const itemDate = formatDate(item, format, 'en');
    
    if (currentDate > itemDate) {
      this.statusClass = 'success';
      this.statusMsg = 'Published';
    } else {
      this.statusMsg = 'Pending';
      this.statusClass = 'danger';
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return false;
    }

    const formData = new FormData();
    Object.entries(this.formGroup.value).forEach(([key, value]: any) => formData.append(key, value));

    if (this.item._id) {
      const id = this.item._id;
      this.adminService.updateArticle(id, formData).subscribe((res) => {
        if (res.status === 'success') {
          this.toastService.showToast(res.status, 'Success', res.message);
          this.fetchData();
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      });
    } else {
      this.adminService.createArticle(formData).subscribe((res) => {
        if (res.status === 'success') {
          this.fetchData();
          this.toastService.showToast(res.status, 'Success', res.message);
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      });
    }

    this.showFormModal = false;
    this.item = {};
  }

}
