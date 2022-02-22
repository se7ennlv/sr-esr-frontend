import { AppService } from './../shared/services/app.service';
import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {
  constructor(
    public app: AppService,
    private primengConfig: PrimeNGConfig
  ) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.app.topbarNotificationMenuActive = false;
    this.app.topbarUserMenuActive = false;
  }

  onLayoutClick() {
    this.app.onLayoutClick();
  }

}
