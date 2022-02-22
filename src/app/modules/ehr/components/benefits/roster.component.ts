import { IRoster } from './../../models/benefit.model';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { BenefitService } from './../../services/benefit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./style.scss']
})
export class RosterComponent implements OnInit {
  items: IRoster[];

  constructor(
    private benefitService: BenefitService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Roster & Attendance' }
    ]);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.benefitService.getAllRoster().subscribe((res) => {
      this.items = res.data;
    });
  }


}

