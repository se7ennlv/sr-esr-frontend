import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { BenefitService } from '../../services/benefit.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyMart } from '../../models/benefit.model';


@Component({
  selector: 'app-mymart',
  templateUrl: './mymart.component.html',
  styleUrls: ['./style.scss']
})
export class MymartComponent implements OnInit {
  balance: number = 0;
  items: IMyMart[];

  constructor(
    private benefitkService: BenefitService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: 'My mart records' }
    ]);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.benefitkService.getMyMart().subscribe((res) => {
      if (res.status === 'success') {
        this.items = res.data;
        this.balance = res.balance;
      }
    });
  }


}
