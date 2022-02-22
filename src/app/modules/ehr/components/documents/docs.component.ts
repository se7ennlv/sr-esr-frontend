import { Router } from '@angular/router';
import { IMainDoc } from '../../models/docmain.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { BreadcrumbService } from '../../../../shared/services/app.breadcrumb.service';
import { DocService } from '../../services/doc.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./style.scss']
})
export class DocsComponent implements OnInit {

  items: IMainDoc[];

  constructor(
    private docService: DocService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.breadcrumbService.setItems([
      { label: 'HR Documents' }
    ]);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.docService.getMainDocs().subscribe((res) => {
      this.items = res.data;
    });
  }

  docDetail(item: IMainDoc) {
    const docId = item._id;
    const docTitle = item.title;

    this.router.navigate(['ehr/doc', docId, docTitle]);
  }

}
