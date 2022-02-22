import { AppService } from '../../../../shared/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styles: [
  ]
})
export class LeftbarComponent implements OnInit {
  model: any[];

  constructor(public app: AppService) { }

  ngOnInit() {
      this.model = [
          {
              label: 'Favorites', icon: 'pi pi-home',
              items: [
                  { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['./'] }
              ]
          },
          { separator: true },
          {
              label: 'Players Management', icon: '', routerLink: [''],
              items: [
                  { label: 'Players', icon: 'pi pi-users', routerLink: ['players'] },
              ]
          },
          { separator: true },
          {
              label: 'Tracking Reports', icon: '', routerLink: [''],
              items: [
                  { label: 'Thakhek', icon: 'pi pi-chevron-right', routerLink: ['thk'] },
                  { label: 'SR (Old players)', icon: 'pi pi-chevron-right', routerLink: ['srold'] },
                  { label: 'SR (New players)', icon: 'pi pi-chevron-right', routerLink: ['srnew'] },
              ]
          }
      ];
  }

  onMenuClick(event) {
      this.app.onMenuClick(event);
  }

}
