import { ISubDoc } from './../../models/docsub.model';
import { ToastService } from './../../../../shared/services/toast.service';
import { BreadcrumbService } from './../../../../shared/services/app.breadcrumb.service';
import { DocService } from './../../services/doc.service';
import { IDocViewer } from './../../models/docviewer.model';
import { DocViewerComponent } from './doc-viewer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styles: [
  ]
})
export class DocDetailComponent implements OnInit {
  @ViewChild(DocViewerComponent) child: DocViewerComponent;

  docId: string;
  docTitle: string;
  enpoint: string;

  items: ISubDoc[];
  selectedItem: IDocViewer;

  constructor(
    private docService: DocService,
    private breadcrumbService: BreadcrumbService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {
    this.enpoint = environment.ENDPOINT;
  }

  ngOnInit(): void {
    this.docId = this.route.snapshot.paramMap.get('id');
    this.docTitle = this.route.snapshot.paramMap.get('title');
    this.breadcrumbService.setItems([
      { label: this.docTitle }
    ]);

    this.fetchData();
  }


  fetchData() {
    this.docService.getSubDocs(this.docId).subscribe((res) => {
      this.items = res.data;
    });
  }

  onRowSelect(e) {
    const fileSrc = e.data.fileSrc;
    const title = e.data.subtitle;

    if (fileSrc) {
      const url = this.enpoint + fileSrc;

      this.child.title = title
      this.child.docSrc = url
      this.child.showModal = true;
    } else {
      this.toastService.showToast('error', 'Error', 'Invalid document url');
    }
  }

}
