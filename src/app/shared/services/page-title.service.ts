import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private pageTitle = new Subject<any>();

  constructor() { }

  setPageTitle(newTitle: string) {
    this.pageTitle.next(newTitle);
  }

  getPageTitle(): Observable<any> {
    return this.pageTitle.asObservable();
  }
}
