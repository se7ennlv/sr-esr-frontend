import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  appVersion;
  appUpdated;

  constructor() {
    this.appVersion = environment.MKTG_VERSION;
    this.appUpdated = environment.MKTG_UPDATED;
  }


  ngOnInit(): void {
  }

}
