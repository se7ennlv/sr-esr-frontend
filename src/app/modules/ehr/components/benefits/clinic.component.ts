import { UtilsService } from './../../../../shared/services/utils.service';
import { IClinic } from './../../models/benefit.model';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { BenefitService } from './../../services/benefit.service';
import { IYear } from './../../models/common.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./style.scss']
})
export class ClinicComponent implements OnInit {
  fiscalYears: IYear[];
  items: IClinic[];

  constructor(
    private benefitService: BenefitService,
    private breadcrumbService: BreadcrumbService,
    private utilsService: UtilsService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Clinic Records' }
    ]);
  }

  ngOnInit(): void {
    this.fetchFiscalYear();
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

  fetchData(year: number) {
    this.benefitService.getAllClinicRecord(year).subscribe((res) => {
      if (res.status === 'success') {
        this.items = res.data;
      }
    });
  }

}
