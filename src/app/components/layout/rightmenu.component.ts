import { AppService } from '../../shared/services/app.service';
import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-rightmenu',
    templateUrl: './rightmenu.component.html'
})
export class RightmenuComponent {
    amount: SelectItem[];
    selectedAmount: any;

    constructor(public app: AppService) {
        this.amount = [
            { label: '*****24', value: { id: 1, name: '*****24', code: 'A1' } },
            { label: '*****75', value: { id: 2, name: '*****75', code: 'A2' } }
        ];
    }
}
