import { ISRP } from './../../models/benefit.model';
import { BreadcrumbService } from '../../../../shared/services/app.breadcrumb.service';
import { BenefitService } from '../../services/benefit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-srp',
  templateUrl: './srp.component.html',
  styleUrls: ['./style.scss']
})
export class SrpComponent implements OnInit {
  sumScore: number;
  items: ISRP[];

  constructor(
    private benefitService: BenefitService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: 'SRP Records' }
    ]);
  }

  ngOnInit(): void {
    this.fetchData();
  }


  fetchData() {
    this.benefitService.getSrp().subscribe((res) => {
      if (res.status === 'success') {
        this.items = res.data;
        this.sumScore = res.sum;
      }
    });
  }

}
