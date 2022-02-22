import { ConfirmationService } from 'primeng/api';
import { ToastService } from './../../../../shared/services/toast.service';
import { ISurvey } from './../../models/common.model';
import { AdminService } from './../../services/admin.service';
import { EmpService } from './../../services/emp.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-survey-asmt',
  templateUrl: './survey-asmt.component.html',
  styleUrls: ['./survey-asmt.scss']
})
export class SurveyAsmtComponent implements OnInit {
  endpoint: string = environment.ENDPOINT;

  sourceEmps = [];
  targetEmps = [];
  survItems: ISurvey[];

  selectedSurvey: string;

  constructor(
    private empService: EmpService,
    private adminService: AdminService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {

  }

  ngOnInit(): void {
    this.fetchAllSurveys();
    this.fetchAllEmployees();
    this.targetEmps = [];
  }

  fetchAllSurveys() {
    this.adminService.getSurveys().subscribe((res) => {
      this.survItems = res.data;
    });
  }

  fetchAllEmployees() {
    this.empService.getAllEmployees().subscribe((res) => {
      this.sourceEmps = res.data;
    });
  }

  onChangeSurvey(e) {
    let value = e.value;
    this.selectedSurvey = value;
  }

  onAssign() {
    const survId = this.selectedSurvey;

    if (!survId) {
      this.toastService.showToast('error', 'Warning', 'Please select survey item');
    } else {
      if (this.targetEmps.length <= 0) {
        this.toastService.showToast('error', 'Warning', 'No employee selected');
      } else {
        const dataMapping = this.targetEmps.map(data => (Object.assign(Object.assign({}, data), { survId: survId })));

        this.confirmationService.confirm({
          message: 'Are you sure?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.adminService.assignSurvey(dataMapping).subscribe((res) => {
              if (res.status === 'success') {
                this.toastService.showToast(res.status, 'Success', 'Assigned');
              } else {
                this.toastService.showToast(res.status, 'Error', res.message);
              }
            });
          }
        });
      }
    }
  }

  onUnassign() {
    const survId = this.selectedSurvey;

    if (!survId) {
      this.toastService.showToast('error', 'Warning', 'Please select survey item');
    } else {
      if (this.targetEmps.length <= 0) {
        this.toastService.showToast('error', 'Warning', 'No employee selected');
      } else {
        const dataMapping = this.targetEmps.map(data => (Object.assign(Object.assign({}, data), { survId: survId })));

        this.confirmationService.confirm({
          message: 'Are you sure?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.adminService.unAssignSurvey(dataMapping).subscribe((res) => {
              if (res.status === 'success') {
                this.toastService.showToast(res.status, 'Success', 'Unassigned');
              } else {
                this.toastService.showToast(res.status, 'Error', res.message);
              }
            });
          }
        });
      }
    }
  }

}
