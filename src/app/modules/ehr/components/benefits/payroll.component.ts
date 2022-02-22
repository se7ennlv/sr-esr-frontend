import { UtilsService } from './../../../../shared/services/utils.service';
import { IProfile } from './../../../../shared/interfaces/profile.model';
import { IMonth } from './../../models/benefit.model';
import { IYear } from '../../models/common.model';
import { ToastService } from './../../../../shared/services/toast.service';
import { PrimeNGConfig, MenuItem } from 'primeng/api';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { AccountService } from './../../../../core/services/account.service';
import { AuthService } from './../../../../core/services/auth.service';
import { BenefitService } from './../../services/benefit.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss']
})
export class PayrollComponent implements OnInit {
  user: IProfile;
  monthItems: IMonth[];
  monthItem: IMonth;
  fiscalYears: IYear[];
  selectedMonth: string;
  selectedYear: number;
  formGroup: FormGroup;
  isSendMail: boolean = false;
  payrollItems: any = {};
  showConfirm: boolean = false;
  showPayslip: boolean = false;

  validPassword: any;
  dropdownItems: MenuItem[];

  constructor(
    private benefitService: BenefitService,
    private authService: AuthService,
    private accountService: AccountService,
    private breadcrumbService: BreadcrumbService,
    private fb: RxFormBuilder,
    private toastService: ToastService,
    private primengConfig: PrimeNGConfig,
    private utilsService: UtilsService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Payroll' }
    ]);

    this.user = this.accountService.getUserLogin();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.fetchData();
    this.initForm();
    this.fetchFiscalYear();
    
    this.dropdownItems = [{
      label: 'Send to email', icon: 'pi pi-send', command: (e) => {
        this.isSendMail = true;
        this.showConfirm = true;
      }
    }];
  }

  initForm() {
    this.formGroup = this.fb.group({
      password: ['', RxwebValidators.required()],
    });
  };

  fetchData() {
    this.benefitService.getAllMonths().subscribe((res) => {
      this.monthItems = res.data;
    });
  }

  fetchFiscalYear() {
    this.utilsService.getFiscalYear().subscribe((res) => {
      if (res.status === 'success') {
        this.fiscalYears = res.data;
      }

      const topYear = this.fiscalYears[0].yearCode;
      this.selectedYear = topYear;
    });
  }

  resetFormModal() {
    this.formGroup.reset();
  }

  fetchPayslip() {
    this.showConfirm = false;

    const params = {
      month: this.selectedMonth,
      year: this.selectedYear,
      password: this.validPassword
    };

    this.benefitService.getPayslip(params).subscribe((res) => {
      if (res.status === 'success') {
        this.payrollItems = res.data;
        this.showPayslip = true;
      }
    }, (error) => {
      const errMsg = error.error.error.message;
      this.toastService.showToast('error', 'Info', 'Sorry!, No data available.');
    });
  }

  onCheckpoint() {
    const password = this.formGroup.controls['password'].value;

    this.authService.checkpoint(password).subscribe((res) => {
      if (res.status === 'success') {
        this.validPassword = password;

        if (this.isSendMail) {
          this.onCreatePayslip();
        } else {
          this.fetchPayslip();
        }
      }
    }, (error) => {
      const errMsg = error.error.error.message;
      this.showConfirm = false;
      this.toastService.showToast('error', 'Unauthorized', errMsg);
    });
  }

  onCreatePayslip() {
    const params = {
      month: this.selectedMonth,
      year: this.selectedYear,
      password: this.validPassword
    };

    this.benefitService.createPayslip(params).subscribe((res) => {
      if (res.status === 'success') {
        const attachedFile = res.data;
        this.onSendMail(attachedFile)
      }
    }, (error) => {
      const errMsg = error.error.error.message;
      this.toastService.showToast('error', 'Error', errMsg);
    });

    this.showConfirm = false;
  }

  onSendMail(attached: any) {
    const params = {
      month: this.selectedMonth,
      year: this.selectedYear,
      attached: attached
    };

    this.benefitService.sendPayslipToMail(params).subscribe((res) => {
      if (res.status === 'success') {
        this.showPayslip = false;
        this.toastService.showToast('success', 'Success', res.message);
      }
    }, (error) => {
      const errMsg = error.error.error.message;
      this.toastService.showToast('error', 'Error', errMsg);
    });
  }

  onDropdownSendMail(item: IMonth) {
    this.monthItem = { ...item }
    this.selectedMonth = this.monthItem.monthCode;
  }

  onShowPayslip(item: IMonth) {
    this.monthItem = { ...item }
    this.selectedMonth = this.monthItem.monthCode;
    this.isSendMail = false;
    this.showConfirm = true;
  }

}


