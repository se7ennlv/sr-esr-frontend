import { ILeave } from './../../models/benefit.model';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { BenefitService } from './../../services/benefit.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./style.scss']
})
export class LeaveComponent implements OnInit {
  items: ILeave[];
  
  constructor(
    private benefitService: BenefitService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Leaves' }
    ]);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.benefitService.getLeave().subscribe((res) => {
     this.items = res.data;
    });
  }


}
