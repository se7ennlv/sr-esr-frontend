import { environment } from 'src/environments/environment.prod';
import { DocViewerComponent } from './../documents/doc-viewer.component';
import { UtilsService } from './../../../../shared/services/utils.service';
import { ReactiveFormConfig, RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from './../../../../shared/services/toast.service';
import { AdminService } from './../../services/admin.service';
import { FormGroup } from '@angular/forms';
import { IItemDoc } from '../../models/docitem.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-doc-item',
  templateUrl: './doc-item.component.html',
  styleUrls: []
})
export class DocItemComponent implements OnInit {
  @ViewChild(DocViewerComponent) child: DocViewerComponent;

  items: IItemDoc[];
  item: IItemDoc;
  showDialog: boolean;
  submitted: boolean;
  editMode: boolean;
  formGroup: FormGroup;
  mainGroups: any[];
  subGroups: any[];
  selectedFile: any[] = [];

  loading: boolean = true;
  enpoint: string;

  constructor(
    private adminService: AdminService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private fb: RxFormBuilder,
    private utilsService: UtilsService
  ) {
    ReactiveFormConfig.set(this.utilsService.validationMessages);
    this.enpoint = environment.ENDPOINT;
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchMainGroup();
    this.fetchSubGroup('any');
    this.initForm();
    this.editMode = false;
  }

  initForm() {
    this.formGroup = this.fb.group({
      mainGroupId: ['', RxwebValidators.required()],
      subGroupId: ['', RxwebValidators.required()],
      title: ['', RxwebValidators.required()],
      subtitle: ['', RxwebValidators.required()],
      isActive: ['', RxwebValidators.required()],
      extPath: ['ehr/docs'],
      file: [null]
    });
  }

  fetchData() {
    this.adminService.getItemDocs().subscribe((res) => {
      this.items = res.data;
      this.loading = false;
    });
  }

  fetchMainGroup() {
    this.adminService.getMainDocs().subscribe((res) => {
      this.mainGroups = res.data;
    });
  }

  fetchSubGroup(groupId: any) {
    this.adminService.getSubDocs(groupId).subscribe((res) => {
      this.subGroups = res.data;

      if (this.subGroups.length <= 0) {
        this.toastService.showToast('warn', 'Warning', "This main group should have at least one subgroup");
      }

    });
  }

  onMainGroupChange(value) {
    this.formGroup.patchValue({ subGroupId: '' });
    this.fetchSubGroup(value);
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

  onSelectFile(event) {
    let file = event.files[0];
    this.selectedFile.push(file);
    this.formGroup.patchValue({ file: file });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.child.docSrc = reader.result as string;
    }
  }

  onPreview(item: IItemDoc) {
    if (item.fileSrc) {
      const docUrl = this.enpoint + item.fileSrc;
      this.child.docSrc = docUrl;
      this.child.title = item.title;
    }

    this.child.showModal = true;
  }

  onEdit(item: IItemDoc) {
    this.item = { ...item }

    Object.entries(this.item).forEach(([key, value]: any) => {
      if (this.formGroup.controls.hasOwnProperty(key)) {
        this.formGroup.patchValue({
          [key]: value
        });
      }
    });

    this.fetchSubGroup(item.main._id);

    this.showDialog = true;
    this.editMode = true;
  }

  onDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteItemDoc(id).subscribe((res) => {
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

    const formData = new FormData();
    Object.entries(this.formGroup.value).forEach(([key, value]: any) => formData.append(key, value));

    if (this.item._id) {
      const id = this.item._id;
      this.adminService.updateItemDoc(id, formData).subscribe((res) => {
        if (res.status === 'success') {
          this.toastService.showToast(res.status, 'Success', res.message);
          this.fetchData();
        } else {
          this.toastService.showToast(res.status, 'Error', res.message);
        }
      });
    } else {
      this.adminService.createItemDoc(formData).subscribe((res) => {
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
