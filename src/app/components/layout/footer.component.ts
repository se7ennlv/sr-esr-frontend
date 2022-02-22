import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  appVersion;
  appUpdated;

  constructor() {
    this.appVersion = environment.ESR_VERSION;
    this.appUpdated = environment.ESR_UPDATED;
  }

}
