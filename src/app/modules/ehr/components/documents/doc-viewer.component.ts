import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: []
})
export class DocViewerComponent implements OnInit {
  @Input() title: string;
  @Input() docSrc: string;
  @Input() showModal: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onShowDialog() {
    this.title = this.title;
    this.docSrc = this.docSrc;
  }

}
