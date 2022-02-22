import { environment } from './../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  get(path: string, headerOptions = {}): Observable<any> {
    const url: string = `${environment.API_URL}${path}`
    return this.http.get<any>(url, { headers: headerOptions }).pipe(catchError(this.handleError));
  }

  put(path: string, body: Object = {}, headerOptions = {}): Observable<any> {
    const url: string = `${environment.API_URL}${path}`;
    return this.http.put<any>(url, body, { headers: headerOptions }).pipe(catchError(this.handleError));
  }

  post(path: string, body: any, headerOptions = {}): Observable<any> {
    const url: string = `${environment.API_URL}${path}`;
    return this.http.post<any>(url, body, { headers: headerOptions }).pipe(catchError(this.handleError));
  }

  delete(path: string, headerOptions = {}): Observable<any> {
    const url: string = `${environment.API_URL}${path}`
    return this.http.delete<any>(url, {headers: headerOptions}).pipe(catchError(this.handleError));
  }
}
