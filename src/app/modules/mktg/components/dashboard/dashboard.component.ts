import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Marketing Systems' }
    ]);
  }

  ngOnInit(): void {
  }

}
