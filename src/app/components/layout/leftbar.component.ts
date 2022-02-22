import { AppService } from '../../shared/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styles: [
  ]
})
export class LeftbarComponent implements OnInit {

  menus: any[];

  constructor(public app: AppService) { }

  ngOnInit() {
    this.menus = [
      {
        items: [
          { label: 'Home', icon: 'pi pi-fw pi-user', routerLink: ['./'] },
          { label: 'Personal info', icon: 'pi pi-fw pi-id-card', routerLink: ['personal-info'] }
        ]
      },
      { separator: true },
      {
        items: [
          { label: 'About', icon: 'pi pi-fw pi-info-circle', routerLink: ['about'] }
        ]
      }
    ];
  }

  onMenuClick(event) {
    this.app.onMenuClick(event);
  }

}
