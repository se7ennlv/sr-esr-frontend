import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-mgmt',
  templateUrl: './doc-mgmt.component.html',
  styleUrls: []
})
export class DocMgmtComponent implements OnInit {
  tabIndex: number;

  constructor(
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Documents Management' }
    ]);
  }

  ngOnInit(): void {
  }

  onChange(e) {
    this.tabIndex = e.index;
  }

}
