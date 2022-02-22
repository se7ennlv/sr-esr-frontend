import { ToastService } from './../../../../shared/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { SurveyService } from './../../services/survey.service';
import { ISRO } from '../../interfaces/sro.interface';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sro-rpt',
  templateUrl: './sro-rpt.component.html',
  styleUrls: ['./style.scss']
})
export class SroRptComponent implements OnInit {
  includeForm: boolean;

  items: ISRO[];
  item: ISRO;
  rangeDates: Date[];
  fDate: Date | string = new Date();
  tDate: Date | string = new Date();

  constructor(
    private surveyService: SurveyService,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {
    this.breadcrumbService.setItems([
      { label: 'SR Tracking (Old Player)' }
    ]);
  }

  ngOnInit(): void {
    this.fetchData();

    this.surveyService.isReload.subscribe((res) => {
      if (res) {
        this.fetchData();
      }
    });
  }

  onSearch() {
    if (this.rangeDates) {
      this.fDate = this.rangeDates[0];
      this.tDate = this.rangeDates[1];

      this.fetchData();
    }
  }


  onUpdate(item: ISRO) {
    this.surveyService.editMode = true;
    Object.assign(this.surveyService.sroModel, item);
    this.includeForm = true;
    this.surveyService.showSroDialog.emit(true);
  }

  onDelete(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.surveyService.delete(id, 'sro').subscribe((res) => {
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

  fetchData() {
    const fromDate = formatDate(this.fDate, 'yyyy-MM-dd', 'en');
    const toDate = formatDate(this.tDate, 'yyyy-MM-dd', 'en');

    this.surveyService.get('sro', fromDate, toDate).subscribe((res) => {
      if (res.status === 'success') {
        this.items = res.data;
      }
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.items);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "sr-tracking-old");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
