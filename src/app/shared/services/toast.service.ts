import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {
  }

  showToast(severity, summary, detail) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }
}
