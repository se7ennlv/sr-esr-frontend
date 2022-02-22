import { UtilsService } from './../../../../shared/services/utils.service';
import { ISurveyRecord, IYear } from './../../models/common.model';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-rpt',
  templateUrl: './survey-rpt.component.html',
  styles: [
  ]
})
export class SurveyRptComponent implements OnInit {
  items: ISurveyRecord[];
  fiscalYears: IYear[];
  selectedYear: number;
  statuses: any[];

  constructor(
    private adminService: AdminService,
    private breadcrumbService: BreadcrumbService,
    private utilsService: UtilsService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Surveys Reports' }
    ]);
  }

  ngOnInit(): void {
    this.fetchFiscalYear();
    
    this.statuses = [
      { label: 'Done', value: true },
      { label: 'Pending', value: false },
    ]
  }

  fetchData(year: number) {
    this.adminService.getSurveyReport(year).subscribe((res) => {
      this.items = res.data;
    });
  }

  fetchFiscalYear() {
    this.utilsService.getFiscalYear().subscribe((res) => {
      if (res.status === 'success') {
        this.fiscalYears = res.data;
      }

      const topYear = this.fiscalYears[0].yearCode;
      this.fetchData(topYear);
    });
  }

  onChangeYear(e) {
    this.fetchData(e.value);
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.items);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "survey");
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
